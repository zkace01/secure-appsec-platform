import type { Asset, AssetInput, Vulnerability, VulnerabilityInput } from './domain.js';

export interface PlatformRepository {
  listAssets(): Promise<Asset[]>;
  findAsset(id: string): Promise<Asset | null>;
  createAsset(input: AssetInput): Promise<Asset>;
  updateAsset(id: string, input: AssetInput): Promise<Asset | null>;
  deleteAsset(id: string): Promise<boolean>;
  assetHasVulnerabilities(id: string): Promise<boolean>;
  listVulnerabilities(): Promise<Vulnerability[]>;
  findVulnerability(id: string): Promise<Vulnerability | null>;
  createVulnerability(input: VulnerabilityInput): Promise<Vulnerability>;
  updateVulnerability(id: string, input: VulnerabilityInput): Promise<Vulnerability | null>;
  deleteVulnerability(id: string): Promise<boolean>;
}
