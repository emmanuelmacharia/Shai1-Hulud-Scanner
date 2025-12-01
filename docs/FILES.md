# Project file tree

```
package.json                 - Project manifest (dependencies, scripts, package info)
pnpm-lock.yaml               - pnpm lockfile (exact dependency versions)
docs/USAGE.md                - Usage and incident response documentation

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

Very brief descriptions:

- `package.json`: contains project metadata and (currently) devDependencies like `@types/node` and `tsx`.
- `pnpm-lock.yaml`: ensures reproducible installs with `pnpm`.
- `src/main.ts`: entrypoint that calls `loadPackageData`, `createReport`, and prints formatted output or JSON.
- `src/reports.ts`: handles reading a local file or fetching raw files from GitHub and returns parsed content for scanning.
- `src/scan.ts`: implements the scanning logic (parsing pnpm/package-lock/package.json, checking versions and scripts).
- `src/models/*`: TypeScript types used across the project (package JSON shapes, scan result/report shapes).
- `src/utils/compromisedPackages.ts`: the hard-coded list of compromised package names and affected versions used to flag results.
- `src/utils/formatReport.ts`: builds the human-readable console output shown by the CLI.
- `src/utils/patterns.ts`: suspicious-name and malicious-script regexes used to flag packages or scripts.

If you prefer, I can merge this into `docs/USAGE.md` instead of creating a new file.
