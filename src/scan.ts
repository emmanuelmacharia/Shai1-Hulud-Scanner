import {
  PackageJson,
  PackageLockJson,
  LockDependency,
  ScanResult,
  ScanReport,
} from "./models";

import { COMPROMISED_PACKAGES } from "./utils/compromisedPackages";
import {
  SUSPICIOUS_NAME_PATTERNS,
  MALICIOUS_SCRIPT_PATTERNS,
} from "./utils/patterns";

function normalizeVersion(version: string): string {
  return version.replace(/^[\^~>=<]+/, "").split(" ")[0];
}

function isVersionAffected(
  name: string,
  version: string | undefined
): { affected: boolean; versions: string[] } {
  const info = COMPROMISED_PACKAGES[name];
  if (!info) return { affected: false, versions: [] };

  if (info.allMalicious) {
    return { affected: true, versions: ["all versions"] };
  }

  if (!version) {
    return { affected: false, versions: info.versions };
  }

  const normalized = normalizeVersion(version);
  const affected = info.versions.includes(normalized);
  return { affected, versions: info.versions };
}

function checkPackage(name: string, version?: string): ScanResult {
  const info = COMPROMISED_PACKAGES[name];

  if (info) {
    const { affected, versions } = isVersionAffected(name, version);

    if (affected) {
      return {
        package: name,
        version,
        status: "compromised",
        reason: info.allMalicious
          ? "All versions of this package are malicious"
          : `Version ${version} is compromised by Shai Hulud attack`,
        affectedVersions: versions,
      };
    }

    if (version) {
      return {
        package: name,
        version,
        status: "suspicious",
        reason: "Package has known compromised versions (not this one)",
        affectedVersions: versions,
      };
    }

    return {
      package: name,
      version,
      status: "suspicious",
      reason: "Package has known compromised versions, version unknown",
      affectedVersions: versions,
    };
  }

  if (SUSPICIOUS_NAME_PATTERNS.some((p) => p.test(name))) {
    return {
      package: name,
      version,
      status: "suspicious",
      reason: "Package name matches Shai Hulud attack patterns",
    };
  }

  return { package: name, version, status: "clean" };
}

function checkScripts(scripts: Record<string, string>): ScanResult[] {
  return Object.entries(scripts).flatMap(([name, content]) =>
    MALICIOUS_SCRIPT_PATTERNS.filter((p) => p.test(content)).map((p) => ({
      package: `[script:${name}]`,
      status: "compromised",
      reason: `Malicious script pattern: ${p.source}`,
    }))
  );
}

function extractDepsFromPackageJson(pkg: PackageJson): [string, string][] {
  return Object.entries({
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.optionalDependencies,
    ...pkg.peerDependencies,
  });
}

function extractDepsFromLockFile(
  packages: Record<string, { version?: string }>
): [string, string | undefined][] {
  return Object.entries(packages)
    .filter(([p]) => p !== "" && p.includes("node_modules/"))
    .map(([p, entry]) => [p.replace(/^.*node_modules\//, ""), entry.version]);
}

function flattenLockDeps(
  deps: Record<string, LockDependency>
): [string, string | undefined][] {
  return Object.entries(deps).flatMap(([name, entry]) => [
    [name, entry.version] as [string, string | undefined],
    ...(entry.dependencies ? flattenLockDeps(entry.dependencies) : []),
  ]);
}

function parsePnpmLock(content: string): [string, string | undefined][] {
  const deps: [string, string | undefined][] = [];
  const seen = new Set<string>();

  const patterns = [
    /^\s*\/?(@?[^@\s][^@\s]*)@([^:\s]+):/gm,
    /^\s{2}'?(@?[^@'\s]+)@([^':]+)'?:/gm,
  ];

  for (const regex of patterns) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const [, name, version] = match;
      const key = `${name}@${version}`;
      if (name && !name.startsWith("file:") && !seen.has(key)) {
        seen.add(key);
        deps.push([name, version]);
      }
    }
  }

  return deps;
}

export function isPnpmLock(filePath: string): boolean {
  return filePath.endsWith("pnpm-lock.yaml");
}

function isPackageLock(data: unknown): data is PackageLockJson {
  return (
    typeof data === "object" &&
    data != null &&
    ("lockfileVersion" in data || "packages" in data)
  );
}

export function scanPackages(
  data: PackageJson | PackageLockJson
): ScanResult[] {
  const deps: [string, string | undefined][] = isPackageLock(data)
    ? [
        ...(data.packages ? extractDepsFromLockFile(data.packages) : []),
        ...(data.dependencies ? flattenLockDeps(data.dependencies) : []),
      ]
    : extractDepsFromPackageJson(data as PackageJson);

  const seen = new Set<string>();

  const uniqueDeps = deps.filter(([name, version]) => {
    const key = `${name}@${version}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const packageResults = uniqueDeps.map(([name, version]) =>
    checkPackage(name, version)
  );

  const scriptResult =
    "scripts" in data && data.scripts ? checkScripts(data.scripts) : [];

  return [...packageResults, ...scriptResult];
}

function scanpPnpmLock(content: string): ScanResult[] {
  const deps = parsePnpmLock(content);
  return deps.map(([name, version]) => checkPackage(name, version));
}

export function createReport(
  source: string,
  results: ScanResult[]
): ScanReport {
  return {
    scannedAt: new Date().toISOString(),
    source,
    totalPackages: results.filter((r) => !r.package.startsWith("[script"))
      .length,
    compromisedCount: results.filter((r) => r.status === "compromised").length,
    suspiciousCount: results.filter((r) => r.status === "suspicious").length,
    results,
  };
}

export function scanPnpmLock(content: string): ScanResult[] {
  const deps = parsePnpmLock(content);
  return deps.map(([name, version]) => checkPackage(name, version));
}
