# Shai Hulud Supply Chain Attack Scanner

## 1. Executive Summary: The Shai Hulud Attack
**Shai Hulud** is a sophisticated, worm-like supply chain attack targeting the JavaScript/NPM ecosystem. It initially surfaced in September 2025 and launched a massive second wave (v2) in November 2025.

### Anatomy of the Attack
1.  Compromise: Attackers hijack high-profile NPM accounts (e.g., Zapier, PostHog, ENS Domains) or create typosquatted packages.

2.  Infection: They publish a new version of a legitimate package containing a malicious preinstall script.

3. Execution: Upon running npm install, the script downloads a payload (often disguised as setup_bun.js or bun_environment.js).

4. Exfiltration: The payload scrapes environment variables, specifically hunting for AWS credentials, GitHub tokens, and NPM tokens.

5. Propagation: It uses stolen credentials to publish malicious versions of your internal packages or modify your GitHub repositories, spreading the infection.

6. Persistence: It creates unauthorized GitHub Actions workflows (e.g., shai-hulud-workflow.yml) and registers self-hosted runners named SHA1HULUD to mine cryptocurrency or perform further attacks.

## 2. Incident response: If you are affected

If this tool identifies a Compromised or Suspicious package, treat your environment as fully compromised.

### 🚨 Immediate Remediation Checklist

1. Sever Access: Disconnect the infected machine from the network immediately.

2. Rotate ALL Credentials:
	- NPM Tokens: npm token revoke <id> immediately.

	- GitHub Tokens: Revoke all Personal Access Tokens (PATs) and OAuth app tokens.

	- Cloud Credentials: Rotate AWS Access Keys, Google Cloud Service Accounts, and Azure credentials.

	- Secrets: Rotate any API keys stored in your .env files or CI/CD secrets.


3. Clean Dependencies: Pin the package to a known safe version in package.json and regenerate your lockfile.

4. Audit GitHub:
	- Check .github/workflows/ for unknown files.

	- Check Settings > Actions > Runners for self-hosted runners named SHA1HULUD.


5. Audit System: Check ~/.ssh/authorized_keys for unauthorized entries.


## 3. Installation
This script is written in TypeScript and uses pnpm for execution. It is is designed to run with zero dependencies using a standard Node.js installation

### Prerequisites
- pnpm installed (`npm i -g pnpm`)
- Node.js (v20+)


### Project file tree

```
src/
  main.ts                    - CLI / entrypoint: parses args and prints the report
  reports.ts                 - Loads package data (local files or GitHub raw URLs)
  scan.ts                    - Core scanner: parses package/lockfiles and checks packages/scripts
  models/
    index.ts                 - Re-exports model types
    Package.ts               - TypeScript interfaces for package.json and lockfiles
    Scan.ts                  - Types for scan results and reports
  utils/
    compromisedPackages.ts   - Database of known compromised packages and versions
    formatReport.ts          - Pretty-print / console formatting for scan reports
    patterns.ts              - Regex patterns for suspicious package names and scripts

```


### Step 1. Install Dependencies
To run the TypeScript file directly without compiling, you need tsx. Run the install command to have it as a dev dependency locally

```bash
pnpm i
```

## 4. Usage
Run the script in `main.ts` using  `pnpm tsx `

### Basic Syntax

```bash
pnpm tsx src/main.ts <input_source> [options]
```

### Supported inputs

| Input Type | Description | Command Example |
|---|---|---|
| `package.json` | Scans only direct dependencies listed in your manifest. | `pnpm tsx src/main.ts ./package.json` |
| `pnpm-lock.yaml` (Recommended) | Scans the entire dependency tree (including nested deps) for pnpm projects. | `pnpm tsx src/main.ts ./pnpm-lock.yaml` |
| `package-lock.json` | Scans the entire dependency tree for npm projects. | `pnpm tsx src/main.ts ./package-lock.json` |
| GitHub URL | Fetches files remotely from a public repository. Checks lockfiles first. | `pnpm tsx src/main.ts https://github.com/user/repo` |

## 5. Output
The script providess two output modes: **Human Readable (CLI)** and **JSON**

### Option A: Standard CLI Output
Used for manual checks. It visually highlights compromised packages.

**Example: Compromised Project**
```text
══════════════════════════════════════════════════════════════════
           SHAI HULUD SUPPLY CHAIN ATTACK SCANNER
           Database: 156 known compromised packages
══════════════════════════════════════════════════════════════════

📁 Source: ./pnpm-lock.yaml
📦 Packages scanned: 843
🕐 Scanned: 2025-12-01T14:30:00.000Z

🚨 ════════════════════════════════════════════════════════════════
🚨 CRITICAL: 2 COMPROMISED PACKAGE(S) FOUND!
🚨 ════════════════════════════════════════════════════════════════

  🔴 @zapier/secret-scrubber@1.6.2
     └─ Version 1.6.2 is compromised
     └─ Affected versions: 1.6.0, 1.6.1, 1.6.2

  🔴 @art-ws/common@1.0.0
     └─ All versions of this package are malicious
     └─ Affected versions: all versions

🛡️  IMMEDIATE ACTIONS REQUIRED:
  1. Remove or downgrade compromised packages immediately
  2. Rotate ALL credentials...
```

### Option B: JSON output
Used for CI/CD pipelines or programmatic analysis. Pass the `--json` flag

**Command**
```bash
pnpm tsx src/main.ts ./package.json --json
```

**Output**
```json

{
  "scannedAt": "2025-12-01T14:30:00.000Z",
  "source": "./package.json",
  "totalPackages": 45,
  "compromisedCount": 1,
  "suspiciousCount": 0,
  "results": [
    {
      "package": "@anthropic-ai/sdk",
      "version": "0.39.0",
      "status": "compromised",
      "reason": "Version 0.39.0 is compromised",
      "affectedVersions": ["0.39.0"]
    }
  ]
}

```


## 6. Exit code
| code | meaning | description |
| -- | -- | -- |
| 0 | Success | No compromised package
| 1 | Compromised | One or more compromised packages exist
| 2 | Error | Runtime error (file not found; network error etc)


## 7. CI/CD Integration Example (GH Actions)
You can integrate this scanner into your GitHub Actions workflow using `pnpm`.

`.github.workflows.security-scan.yaml`

```yaml
name: Supply Chain Security Scan
on: [push, pull_request]

jobs:
  shai-hulud-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Install dependencies
        run: pnpm add -D tsx

      # Ensure the scanner script is available in your repo
      - name: Run Shai Hulud Scanner
        run: pnpm tsx ./src/main.ts ./pnpm-lock.yaml
        continue-on-error: false
```