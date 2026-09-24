import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';
import { PrismaClient } from './generated/prisma/client.js';
import type { Asset, AssetInput, Vulnerability, VulnerabilityInput } from './domain.js';
import type { PlatformRepository } from './repository.js';

config({ path: new URL('../../../.env', import.meta.url).pathname });

const connectionString = process.env['DATABASE_URL'];
if (connectionString === undefined) throw new Error('DATABASE_URL must be set');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

export class PrismaRepository implements PlatformRepository {
  public listAssets(): Promise<Asset[]> { return prisma.asset.findMany({ orderBy: { createdAt: 'desc' } }); }
  public findAsset(id: string): Promise<Asset | null> { return prisma.asset.findUnique({ where: { id } }); }
  public createAsset(input: AssetInput): Promise<Asset> {
    return prisma.asset.create({ data: { ...input, description: input.description ?? null } });
  }
  public updateAsset(id: string, input: AssetInput): Promise<Asset | null> {
    return prisma.asset.update({ where: { id }, data: { ...input, description: input.description ?? null } }).catch(() => null);
  }
  public async deleteAsset(id: string): Promise<boolean> {
    try { await prisma.asset.delete({ where: { id } }); return true; } catch { return false; }
  }
  public async assetHasVulnerabilities(id: string): Promise<boolean> {
    return (await prisma.vulnerability.count({ where: { assetId: id } })) > 0;
  }
  public listVulnerabilities(): Promise<Vulnerability[]> {
    return prisma.vulnerability.findMany({ orderBy: { createdAt: 'desc' } });
  }
  public findVulnerability(id: string): Promise<Vulnerability | null> {
    return prisma.vulnerability.findUnique({ where: { id } });
  }
  public createVulnerability(input: VulnerabilityInput): Promise<Vulnerability> {
    return prisma.vulnerability.create({ data: { ...input, status: input.status ?? 'OPEN' } });
  }
  public updateVulnerability(id: string, input: VulnerabilityInput): Promise<Vulnerability | null> {
    return prisma.vulnerability.update({ where: { id }, data: { ...input, status: input.status ?? 'OPEN' } }).catch(() => null);
  }
  public async deleteVulnerability(id: string): Promise<boolean> {
    try { await prisma.vulnerability.delete({ where: { id } }); return true; } catch { return false; }
  }
}
