import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import type { Asset, AssetInput, Vulnerability, VulnerabilityInput } from '../src/domain.js';
import type { PlatformRepository } from '../src/repository.js';

class MemoryRepository implements PlatformRepository {
  private assets: Asset[] = [];
  private vulnerabilities: Vulnerability[] = [];
  private nextId = 1;
  private now() { return new Date('2026-01-01T00:00:00.000Z'); }
  private id() { const suffix = String(this.nextId++).padStart(12, '0'); return `00000000-0000-4000-8000-${suffix}`; }
  async listAssets() { return this.assets; }
  async findAsset(id: string) { return this.assets.find((asset) => asset.id === id) ?? null; }
  async createAsset(input: AssetInput) { const asset = { id: this.id(), ...input, description: input.description ?? null, createdAt: this.now(), updatedAt: this.now() }; this.assets.push(asset); return asset; }
  async updateAsset(id: string, input: AssetInput) { const asset = await this.findAsset(id); if (asset === null) return null; Object.assign(asset, input, { description: input.description ?? null, updatedAt: this.now() }); return asset; }
  async deleteAsset(id: string) { const length = this.assets.length; this.assets = this.assets.filter((asset) => asset.id !== id); return this.assets.length !== length; }
  async assetHasVulnerabilities(id: string) { return this.vulnerabilities.some((vulnerability) => vulnerability.assetId === id); }
  async listVulnerabilities() { return this.vulnerabilities; }
  async findVulnerability(id: string) { return this.vulnerabilities.find((vulnerability) => vulnerability.id === id) ?? null; }
  async createVulnerability(input: VulnerabilityInput) { const vulnerability = { id: this.id(), ...input, status: input.status ?? 'OPEN', createdAt: this.now(), updatedAt: this.now() }; this.vulnerabilities.push(vulnerability); return vulnerability; }
  async updateVulnerability(id: string, input: VulnerabilityInput) { const vulnerability = await this.findVulnerability(id); if (vulnerability === null) return null; Object.assign(vulnerability, input, { status: input.status ?? 'OPEN', updatedAt: this.now() }); return vulnerability; }
  async deleteVulnerability(id: string) { const length = this.vulnerabilities.length; this.vulnerabilities = this.vulnerabilities.filter((vulnerability) => vulnerability.id !== id); return this.vulnerabilities.length !== length; }
}

describe('platform API', () => {
  it('reports health without accessing persistence', async () => {
    await request(createApp(new MemoryRepository())).get('/health').expect(200, { status: 'ok' });
  });

  it('allows the local Vite origins through CORS', async () => {
    await request(createApp(new MemoryRepository()))
      .get('/assets')
      .set('Origin', 'http://127.0.0.1:5173')
      .expect('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
      .expect(200);
  });

  it('creates and lists an asset', async () => {
    const app = createApp(new MemoryRepository());
    const created = await request(app).post('/assets').send({ name: 'Public API', type: 'service', hostname: 'api.example.test' }).expect(201);
    expect(created.body).toMatchObject({ name: 'Public API', description: null });
    const listed = await request(app).get('/assets').expect(200);
    expect(listed.body).toEqual([expect.objectContaining({ id: created.body.id })]);
  });

  it('rejects unknown fields and invalid identifiers', async () => {
    const app = createApp(new MemoryRepository());
    await request(app).post('/assets').send({ name: 'A', type: 'service', hostname: 'a.test', isAdmin: true }).expect(400, { error: 'Invalid request input' });
    await request(app).get('/assets/not-a-uuid').expect(400, { error: 'Invalid request input' });
  });

  it('creates a vulnerability only for an existing asset and prevents unsafe asset deletion', async () => {
    const app = createApp(new MemoryRepository());
    const asset = await request(app).post('/assets').send({ name: 'API', type: 'service', hostname: 'api.test' }).expect(201);
    await request(app).post('/vulnerabilities').send({ title: 'Missing headers', description: 'Headers are incomplete.', severity: 'HIGH', assetId: asset.body.id }).expect(201);
    await request(app).delete(`/assets/${asset.body.id}`).expect(409);
    await request(app).post('/vulnerabilities').send({ title: 'Unknown asset', description: 'No target.', severity: 'LOW', assetId: '00000000-0000-4000-8000-000000000099' }).expect(404);
  });
});
