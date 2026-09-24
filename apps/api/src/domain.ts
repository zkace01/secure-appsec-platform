export const severities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const;
export type Severity = (typeof severities)[number];

export const vulnerabilityStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED'] as const;
export type VulnerabilityStatus = (typeof vulnerabilityStatuses)[number];

export interface Asset {
  id: string;
  name: string;
  type: string;
  hostname: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: VulnerabilityStatus;
  assetId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AssetInput = Pick<Asset, 'name' | 'type' | 'hostname'> & {
  description?: string | undefined;
};

export type VulnerabilityInput = Pick<
  Vulnerability,
  'title' | 'description' | 'severity' | 'assetId'
> & {
  status?: VulnerabilityStatus | undefined;
};
