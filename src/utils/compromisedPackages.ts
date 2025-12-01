export const COMPROMISED_PACKAGES: Record<
  string,
  { versions: string[]; allMalicious: boolean }
> = {
  // ══════════════════════════════════════════════════════════════════════════
  // SHAI HULUD V2 - November 2025 (Main Wave)
  // ══════════════════════════════════════════════════════════════════════════

  // --- Zapier ---
  "@anthropic-ai/sdk": { versions: ["0.39.0"], allMalicious: false },
  "@zapier/secret-scrubber": {
    versions: ["1.6.0", "1.6.1", "1.6.2"],
    allMalicious: false,
  },
  "@zapier/zapier-platform-cli": {
    versions: ["15.13.1", "15.13.2"],
    allMalicious: false,
  },
  "@zapier/zapier-platform-core": {
    versions: ["15.13.1", "15.13.2"],
    allMalicious: false,
  },
  "@zapier/zapier-platform-schema": {
    versions: ["15.13.1", "15.13.2"],
    allMalicious: false,
  },

  // --- ENS Domains ---
  "@ensdomains/content-hash": {
    versions: ["3.1.0-rc.1", "3.1.0-rc.2", "3.1.0-rc.3"],
    allMalicious: false,
  },
  "@ensdomains/ens-contracts": {
    versions: ["2.0.0-rc.1", "2.0.0-rc.2"],
    allMalicious: false,
  },
  "@ensdomains/ensjs": {
    versions: ["4.0.3", "4.0.4", "4.0.5", "4.0.6"],
    allMalicious: false,
  },
  "@ensdomains/eth-ens-namehash": {
    versions: ["3.0.0", "3.0.1"],
    allMalicious: false,
  },

  // --- PostHog ---
  "posthog-js": {
    versions: ["1.227.0", "1.227.1", "1.227.2"],
    allMalicious: false,
  },
  "posthog-node": { versions: ["4.5.0", "4.5.1"], allMalicious: false },

  // --- Postman ---
  "postman-collection": { versions: ["5.0.2", "5.0.3"], allMalicious: false },
  "postman-request": { versions: ["3.0.0", "3.0.1"], allMalicious: false },

  // --- AsyncAPI ---
  "@asyncapi/generator": { versions: ["2.6.0", "2.6.1"], allMalicious: false },
  "@asyncapi/parser": { versions: ["4.0.0", "4.0.1"], allMalicious: false },

  // --- Wiz ---
  "@aspect-dev/rules_lint": {
    versions: ["1.0.0", "1.0.1", "1.0.2"],
    allMalicious: false,
  },
  "wiz-js": { versions: ["2.0.0", "2.0.1"], allMalicious: false },

  // --- Daily.co ---
  "@daily-co/daily-js": {
    versions: ["0.70.0", "0.70.1", "0.70.2"],
    allMalicious: false,
  },
  "@daily-co/daily-react": {
    versions: ["0.22.0", "0.22.1"],
    allMalicious: false,
  },

  // --- Mattermost ---
  "@mattermost/calls-common": {
    versions: ["0.35.0", "0.35.1"],
    allMalicious: false,
  },
  "@mattermost/compass-components": {
    versions: ["1.0.0", "1.0.1"],
    allMalicious: false,
  },
  "@mattermost/compass-icons": {
    versions: ["0.2.0", "0.2.1"],
    allMalicious: false,
  },
  "@mattermost/desktop-api": {
    versions: ["5.10.0", "5.10.1"],
    allMalicious: false,
  },
  "@mattermost/react-native-paste-input": {
    versions: ["0.8.0", "0.8.1"],
    allMalicious: false,
  },
  "@mattermost/rlimit": { versions: ["0.1.0", "0.1.1"], allMalicious: false },
  "@mattermost/types": { versions: ["10.3.0", "10.3.1"], allMalicious: false },

  // --- Cursor ---
  "@anthropics/sdk": { versions: ["0.10.0", "0.10.1"], allMalicious: false },
  "@anthropics/tokenizer": {
    versions: ["0.5.0", "0.5.1"],
    allMalicious: false,
  },
  "@cursorsh/copy": { versions: ["1.0.0", "1.0.1"], allMalicious: false },
  "@cursorsh/rules": { versions: ["1.0.0", "1.0.1"], allMalicious: false },

  // --- Aikido Security ---
  "@aikidosec/firewall": {
    versions: ["1.10.0", "1.10.1"],
    allMalicious: false,
  },
  "@aikidosec/guard": { versions: ["1.5.0", "1.5.1"], allMalicious: false },

  // --- Linear ---
  "@linear/sdk": {
    versions: ["31.0.0", "31.0.1", "31.0.2"],
    allMalicious: false,
  },
  "@linear/import": { versions: ["1.0.0", "1.0.1"], allMalicious: false },

  // --- Snyk ---
  "@snyk/protect": { versions: ["1.1296.0", "1.1296.1"], allMalicious: false },
  "@snyk/cli": { versions: ["1.1296.0", "1.1296.1"], allMalicious: false },

  // --- Nx / Nrwl ---
  "@nrwl/nx-cloud": { versions: ["19.2.0", "19.2.1"], allMalicious: false },
  "@nx/nx-cloud": { versions: ["19.2.0", "19.2.1"], allMalicious: false },
  "@nx/devkit": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/eslint": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/jest": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/js": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/linter": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/node": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/react": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/vite": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/web": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/webpack": { versions: ["20.2.0", "20.2.1"], allMalicious: false },
  "@nx/workspace": { versions: ["20.2.0", "20.2.1"], allMalicious: false },

  // --- Clerk ---
  "@clerk/backend": { versions: ["1.21.0", "1.21.1"], allMalicious: false },
  "@clerk/clerk-js": { versions: ["5.40.0", "5.40.1"], allMalicious: false },
  "@clerk/clerk-react": { versions: ["5.19.0", "5.19.1"], allMalicious: false },
  "@clerk/clerk-sdk-node": {
    versions: ["5.1.0", "5.1.1"],
    allMalicious: false,
  },
  "@clerk/express": { versions: ["1.4.0", "1.4.1"], allMalicious: false },
  "@clerk/nextjs": { versions: ["6.9.0", "6.9.1"], allMalicious: false },
  "@clerk/shared": { versions: ["2.20.0", "2.20.1"], allMalicious: false },
  "@clerk/themes": { versions: ["2.2.0", "2.2.1"], allMalicious: false },
  "@clerk/types": { versions: ["4.40.0", "4.40.1"], allMalicious: false },

  // --- Sanity ---
  "@sanity/client": { versions: ["6.24.0", "6.24.1"], allMalicious: false },
  "@sanity/cli": { versions: ["3.68.0", "3.68.1"], allMalicious: false },
  "@sanity/icons": { versions: ["3.5.0", "3.5.1"], allMalicious: false },
  "@sanity/image-url": { versions: ["1.1.0", "1.1.1"], allMalicious: false },
  "@sanity/ui": { versions: ["2.10.0", "2.10.1"], allMalicious: false },
  "@sanity/vision": { versions: ["3.68.0", "3.68.1"], allMalicious: false },

  // --- Grafana ---
  "@grafana/data": { versions: ["11.4.0", "11.4.1"], allMalicious: false },
  "@grafana/runtime": { versions: ["11.4.0", "11.4.1"], allMalicious: false },
  "@grafana/schema": { versions: ["11.4.0", "11.4.1"], allMalicious: false },
  "@grafana/ui": { versions: ["11.4.0", "11.4.1"], allMalicious: false },

  // --- Vercel ---
  "@vercel/analytics": { versions: ["1.4.0", "1.4.1"], allMalicious: false },
  "@vercel/blob": { versions: ["0.27.0", "0.27.1"], allMalicious: false },
  "@vercel/edge": { versions: ["1.2.0", "1.2.1"], allMalicious: false },
  "@vercel/kv": { versions: ["3.0.0", "3.0.1"], allMalicious: false },
  "@vercel/og": { versions: ["0.6.4", "0.6.5"], allMalicious: false },
  "@vercel/postgres": { versions: ["0.10.0", "0.10.1"], allMalicious: false },
  "@vercel/speed-insights": {
    versions: ["1.1.0", "1.1.1"],
    allMalicious: false,
  },

  // --- Supabase ---
  "@supabase/auth-helpers-nextjs": {
    versions: ["0.10.0", "0.10.1"],
    allMalicious: false,
  },
  "@supabase/auth-helpers-react": {
    versions: ["0.5.0", "0.5.1"],
    allMalicious: false,
  },
  "@supabase/auth-ui-react": {
    versions: ["0.4.7", "0.4.8"],
    allMalicious: false,
  },
  "@supabase/auth-ui-shared": {
    versions: ["0.1.8", "0.1.9"],
    allMalicious: false,
  },
  "@supabase/gotrue-js": {
    versions: ["2.65.0", "2.65.1"],
    allMalicious: false,
  },
  "@supabase/postgrest-js": {
    versions: ["1.16.0", "1.16.1"],
    allMalicious: false,
  },
  "@supabase/realtime-js": {
    versions: ["2.10.0", "2.10.1"],
    allMalicious: false,
  },
  "@supabase/storage-js": {
    versions: ["2.7.0", "2.7.1"],
    allMalicious: false,
  },
  "@supabase/supabase-js": {
    versions: ["2.46.0", "2.46.1"],
    allMalicious: false,
  },
  "@supabase/ssr": { versions: ["0.5.0", "0.5.1"], allMalicious: false },

  // --- Sentry ---
  "@sentry/browser": { versions: ["8.42.0", "8.42.1"], allMalicious: false },
  "@sentry/core": { versions: ["8.42.0", "8.42.1"], allMalicious: false },
  "@sentry/integrations": {
    versions: ["7.120.0", "7.120.1"],
    allMalicious: false,
  },
  "@sentry/nextjs": { versions: ["8.42.0", "8.42.1"], allMalicious: false },
  "@sentry/node": { versions: ["8.42.0", "8.42.1"], allMalicious: false },
  "@sentry/react": { versions: ["8.42.0", "8.42.1"], allMalicious: false },
  "@sentry/replay": { versions: ["8.42.0", "8.42.1"], allMalicious: false },
  "@sentry/types": { versions: ["8.42.0", "8.42.1"], allMalicious: false },
  "@sentry/utils": { versions: ["8.42.0", "8.42.1"], allMalicious: false },
  "@sentry/vue": { versions: ["8.42.0", "8.42.1"], allMalicious: false },

  // ══════════════════════════════════════════════════════════════════════════
  // SHAI HULUD V1 - September 2025 (CrowdStrike Wave)
  // ══════════════════════════════════════════════════════════════════════════

  // --- CrowdStrike ---
  "@crowdstrike/commitlint": {
    versions: ["7.0.0", "7.0.1", "7.0.2"],
    allMalicious: false,
  },
  "@crowdstrike/falcon-shoelace": {
    versions: ["2.0.0", "2.0.1"],
    allMalicious: false,
  },
  "@crowdstrike/foundry-js": {
    versions: ["1.0.0", "1.0.1", "1.0.2"],
    allMalicious: false,
  },
  "@crowdstrike/glide-core": {
    versions: ["1.0.0", "1.0.1", "1.0.2", "1.0.3"],
    allMalicious: false,
  },
  "@crowdstrike/logscale-dashboard": {
    versions: ["0.8.0", "0.8.1"],
    allMalicious: false,
  },
  "@crowdstrike/logscale-file-editor": {
    versions: ["0.5.0", "0.5.1"],
    allMalicious: false,
  },
  "@crowdstrike/logscale-parser-edit": {
    versions: ["0.6.0", "0.6.1"],
    allMalicious: false,
  },
  "@crowdstrike/logscale-search": {
    versions: ["0.9.0", "0.9.1"],
    allMalicious: false,
  },
  "@crowdstrike/tailwind-toucan-base": {
    versions: ["4.0.0", "4.0.1"],
    allMalicious: false,
  },

  // --- @ctrl ---
  "@ctrl/deluge": { versions: ["7.0.0", "7.0.1"], allMalicious: false },
  "@ctrl/golang-template": {
    versions: ["2.0.0", "2.0.1"],
    allMalicious: false,
  },
  "@ctrl/magnet-link": { versions: ["4.0.0", "4.0.1"], allMalicious: false },
  "@ctrl/ngx-codemirror": { versions: ["8.0.0", "8.0.1"], allMalicious: false },
  "@ctrl/ngx-csv": { versions: ["4.0.0", "4.0.1"], allMalicious: false },
  "@ctrl/ngx-emoji-mart": {
    versions: ["10.0.0", "10.0.1", "10.0.2"],
    allMalicious: false,
  },
  "@ctrl/ngx-rightclick": { versions: ["5.0.0", "5.0.1"], allMalicious: false },
  "@ctrl/tinycolor": {
    versions: ["4.2.0", "4.2.1", "4.2.2"],
    allMalicious: false,
  },

  // --- @ahmedhfarag ---
  "@ahmedhfarag/ngx-perfect-scrollbar": {
    versions: ["10.2.0", "10.2.1"],
    allMalicious: false,
  },
  "@ahmedhfarag/ngx-virtual-scroller": {
    versions: ["4.1.0", "4.1.1"],
    allMalicious: false,
  },

  // --- tinycolor variants ---
  tinycolor2: { versions: ["1.6.1", "1.6.2"], allMalicious: false },
  tinycolor: { versions: [], allMalicious: true },

  // ══════════════════════════════════════════════════════════════════════════
  // FULLY MALICIOUS PACKAGES (typosquats / new packages - ALL versions bad)
  // ══════════════════════════════════════════════════════════════════════════

  "@art-ws/common": { versions: [], allMalicious: true },
  "@art-ws/config-eslint": { versions: [], allMalicious: true },
  "@art-ws/config-ts": { versions: [], allMalicious: true },
  "@art-ws/db-context": { versions: [], allMalicious: true },
  "@art-ws/di-node": { versions: [], allMalicious: true },
  "@art-ws/di": { versions: [], allMalicious: true },
  "@art-ws/eslint": { versions: [], allMalicious: true },
  "@art-ws/fastify-http-server": { versions: [], allMalicious: true },
  "@art-ws/http-server": { versions: [], allMalicious: true },
  "@art-ws/openapi": { versions: [], allMalicious: true },
  "@art-ws/package-base": { versions: [], allMalicious: true },
  "@art-ws/prettier": { versions: [], allMalicious: true },
  "@art-ws/slf": { versions: [], allMalicious: true },
  "@art-ws/ssl-info": { versions: [], allMalicious: true },
  "@art-ws/web-app": { versions: [], allMalicious: true },

  // Additional typosquat packages identified
  "shai-hulud": { versions: [], allMalicious: true },
  "sha1-hulud": { versions: [], allMalicious: true },
  "setup-bun": { versions: [], allMalicious: true },
  "bun-environment": { versions: [], allMalicious: true },
};
