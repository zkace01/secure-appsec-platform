import type { AssetInput, VulnerabilityInput } from './domain.js';
import { ConflictError, NotFoundError } from './errors.js';
import type { PlatformRepository } from './repository.js';

export class PlatformService {
  public constructor(private readonly repository: PlatformRepository) {}

  public listAssets() {
    return this.repository.listAssets();
  }

  public async getAsset(id: string) {
    const asset = await this.repository.findAsset(id);
    if (asset === null) throw new NotFoundError('Asset not found');
    return asset;
  }

  public createAsset(input: AssetInput) {
    return this.repository.createAsset(input);
  }

  public async updateAsset(id: string, input: AssetInput) {
    const asset = await this.repository.updateAsset(id, input);
    if (asset === null) throw new NotFoundError('Asset not found');
    return asset;
  }

  public async deleteAsset(id: string) {
    await this.getAsset(id);
    if (await this.repository.assetHasVulnerabilities(id)) {
      throw new ConflictError('An asset with vulnerabilities cannot be deleted');
    }
    await this.repository.deleteAsset(id);
  }

  public listVulnerabilities() {
    return this.repository.listVulnerabilities();
  }

  public async getVulnerability(id: string) {
    const vulnerability = await this.repository.findVulnerability(id);
    if (vulnerability === null) throw new NotFoundError('Vulnerability not found');
    return vulnerability;
  }

  public async createVulnerability(input: VulnerabilityInput) {
    await this.getAsset(input.assetId);
    return this.repository.createVulnerability(input);
  }

  public async updateVulnerability(id: string, input: VulnerabilityInput) {
    await this.getAsset(input.assetId);
    const vulnerability = await this.repository.updateVulnerability(id, input);
    if (vulnerability === null) throw new NotFoundError('Vulnerability not found');
    return vulnerability;
  }

  public async deleteVulnerability(id: string) {
    const deleted = await this.repository.deleteVulnerability(id);
    if (!deleted) throw new NotFoundError('Vulnerability not found');
  }
}
