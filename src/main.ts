#!/usr/bin/env pnpm tsx

import { ScanReport } from "./models";
import { loadPackageData } from "./reports";
import { createReport } from "./scan";
import { COMPROMISED_PACKAGES } from "./utils/compromisedPackages";
import { formatReport } from "./utils/formatReport";

const scan = async (input: string): Promise<ScanReport> => {
  const { results, source } = await loadPackageData(input);
  return createReport(source, results);
};

const main = async () => {
  const [input, ...flags] = process.argv.slice(2);

  if (!input) {
    console.log(`
Shai Hulud Supply Chain Attack Scanner
══════════════════════════════════════

Database: ${Object.keys(COMPROMISED_PACKAGES).length} known compromised packages

Checks packages against known compromised versions from:
  • Shai Hulud v1 (Sep 2025) - CrowdStrike, @ctrl packages
  • Shai Hulud v2 (Nov 2025) - Zapier, PostHog, ENS, Clerk, Vercel,
    Supabase, Sentry, Grafana, Sanity, Linear, Snyk, Nx, and more

Usage:
  pnpm tsx shai-hulud-scanner.ts <path-or-github-url>

Examples:
  pnpm tsx shai-hulud-scanner.ts ./package.json
  pnpm tsx shai-hulud-scanner.ts ./pnpm-lock.yaml
  pnpm tsx shai-hulud-scanner.ts ./package-lock.json
  pnpm tsx shai-hulud-scanner.ts https://github.com/user/repo

Options:
  --json    Output as JSON
`);
    process.exit(1);
  }

  try {
    const report = await scan(input);
    console.log(
      flags.includes("--json")
        ? JSON.stringify(report, null, 2)
        : formatReport(report)
    );
    process.exit(report.compromisedCount > 0 ? 1 : 0);
  } catch (e) {
    console.error(`❌ Error: ${(e as Error).message}`);
    process.exit(2);
  }
};

main();
