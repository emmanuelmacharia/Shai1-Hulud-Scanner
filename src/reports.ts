import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";
import { ScanResult } from "./models";
import { isPnpmLock, scanPackages, scanPnpmLock } from "./scan";

function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return res.headers.location
            ? fetchText(res.headers.location).then(resolve).catch(reject)
            : reject(new Error("Redirect without location"));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function fetchJson(
  url: string,
  headers: Record<string, string> = {}
): Promise<any> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "https:" ? https : http;
    const opts: any = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: "GET",
      headers,
      port: parsed.port || (parsed.protocol === "https:" ? 443 : 80),
    };
    const req = client.request(opts, (res: http.IncomingMessage) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        if (res.headers.location) {
          return fetchJson(res.headers.location, headers)
            .then(resolve)
            .catch(reject);
        }
        return reject(new Error("Redirect without location"));
      }
      if (res.statusCode && res.statusCode >= 400) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

async function getDefaultBranch(
  owner: string,
  repo: string
): Promise<string | undefined> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  try {
    const json = await fetchJson(apiUrl, {
      "User-Agent": "npmSupplyChain",
      Accept: "application/vnd.github+json",
    });
    if (json && json.default_branch) return String(json.default_branch);
  } catch {
    // ignore API errors and fallback later
  }
  return undefined;
}

async function fetchFromGitHub(
  url: string
): Promise<{ content: string; filename: string; isYaml: boolean }> {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\/tree\/([^/]+))?/);
  if (!match) throw new Error(`Invalid GitHub URL: ${url}`);

  // need to know whether to look for the main branch or master branch or any other default branch
  const [, owner, repo, , maybeBranch] = match;

  let branch: string | undefined = maybeBranch;

  if (!branch) {
    branch = await getDefaultBranch(owner, repo);
    if (!branch) {
      // fallback attempts to common defaults
      branch = "main";
    }
  }

  const files = ["pnpm-lock.yaml", "package-lock.json", "package.json"];

  for (const file of files) {
    try {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`;
      const content = await fetchText(rawUrl);
      return { content, filename: file, isYaml: file.endsWith(".yaml") };
    } catch {
      continue;
    }
  }
  throw new Error(`No lockfile or package.json found in ${url}`);
}

export async function loadPackageData(
  input: string
): Promise<{ results: ScanResult[]; source: string }> {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    const { content, filename, isYaml } = await fetchFromGitHub(input);
    const results = isYaml
      ? scanPnpmLock(content)
      : scanPackages(JSON.parse(content));
    return { results, source: `${input} (${filename})` };
  }

  const filePath = path.resolve(input);
  const content = fs.readFileSync(filePath, "utf-8");

  if (isPnpmLock(filePath)) {
    return { results: scanPnpmLock(content), source: filePath };
  }

  return { results: scanPackages(JSON.parse(content)), source: filePath };
}
