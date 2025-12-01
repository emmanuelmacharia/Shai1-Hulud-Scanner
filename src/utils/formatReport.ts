import { ScanReport } from "../models";
import { COMPROMISED_PACKAGES } from "./compromisedPackages";

export function formatReport(report: ScanReport): string {
  const lines: string[] = [
    "",
    "══════════════════════════════════════════════════════════════════",
    "           SHAI HULUD SUPPLY CHAIN ATTACK SCANNER",
    `           Database: ${
      Object.keys(COMPROMISED_PACKAGES).length
    } known compromised packages`,
    "══════════════════════════════════════════════════════════════════",
    "",
    `📁 Source: ${report.source}`,
    `📦 Packages scanned: ${report.totalPackages}`,
    `🕐 Scanned: ${report.scannedAt}`,
    "",
  ];

  const compromised = report.results.filter((r) => r.status === "compromised");
  const suspicious = report.results.filter((r) => r.status === "suspicious");

  if (compromised.length > 0) {
    lines.push(
      "🚨 ════════════════════════════════════════════════════════════════"
    );
    lines.push(
      `🚨 CRITICAL: ${compromised.length} COMPROMISED PACKAGE(S) FOUND!`
    );
    lines.push(
      "🚨 ════════════════════════════════════════════════════════════════"
    );
    lines.push("");

    for (const r of compromised) {
      lines.push(`  🔴 ${r.package}${r.version ? `@${r.version}` : ""}`);
      lines.push(`     └─ ${r.reason}`);
      if (r.affectedVersions?.length) {
        lines.push(
          `     └─ Affected versions: ${r.affectedVersions.join(", ")}`
        );
      }
    }
    lines.push("");
  }

  if (suspicious.length > 0) {
    lines.push(`⚠️  WARNING: ${suspicious.length} suspicious package(s)`);
    lines.push("");
    for (const r of suspicious) {
      lines.push(`  🟡 ${r.package}${r.version ? `@${r.version}` : ""}`);
      lines.push(`     └─ ${r.reason}`);
      if (r.affectedVersions?.length) {
        lines.push(
          `     └─ Known bad versions: ${r.affectedVersions.join(", ")}`
        );
      }
    }
    lines.push("");
  }

  if (compromised.length === 0 && suspicious.length === 0) {
    lines.push("✅ No compromised or suspicious packages detected.");
    lines.push("");
  }

  if (compromised.length > 0) {
    lines.push("🛡️  IMMEDIATE ACTIONS REQUIRED:");
    lines.push(
      "────────────────────────────────────────────────────────────────"
    );
    lines.push("  1. Remove or downgrade compromised packages immediately");
    lines.push("  2. Rotate ALL credentials:");
    lines.push(
      "     • npm tokens: npm token revoke <token> && npm token create"
    );
    lines.push("     • GitHub tokens (PATs and OAuth apps)");
    lines.push("     • AWS/GCP/Azure credentials and service accounts");
    lines.push("     • Any secrets in CI/CD environment variables");
    lines.push("  3. Check for unauthorized access:");
    lines.push("     • ~/.ssh/authorized_keys for unknown SSH keys");
    lines.push("     • .github/workflows/ for shai-hulud-workflow.yml");
    lines.push('     • Self-hosted runners named "SHA1HULUD"');
    lines.push("  4. Audit your CI/CD pipelines for suspicious activity");
    lines.push("  5. Scan for leaked secrets with TruffleHog or GitLeaks");
    lines.push(
      '  6. Check GitHub repos for "Shai-Hulud: The Second Coming" description'
    );
    lines.push("");
  }

  lines.push(
    "────────────────────────────────────────────────────────────────"
  );
  lines.push("References:");
  lines.push("  • https://socket.dev/blog/shai-hulud-strikes-again-v2");
  lines.push(
    "  • https://securitylabs.datadoghq.com/articles/shai-hulud-2.0-npm-worm/"
  );
  lines.push(
    "  • https://github.com/DataDog/indicators-of-compromise/tree/main/shai-hulud-2.0"
  );

  return lines.join("\n");
}
