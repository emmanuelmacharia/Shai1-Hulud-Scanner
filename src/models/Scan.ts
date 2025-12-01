export type Status = "compromised" | "suspicious" | "clean";

export interface ScanResult {
  package: string;
  version?: string;
  status: Status;
  reason?: string;
  affectedVersions?: string[];
}

export interface ScanReport {
  scannedAt: string;
  source: string;
  totalPackages: number;
  compromisedCount: number;
  suspiciousCount: number;
  results: ScanResult[];
}
