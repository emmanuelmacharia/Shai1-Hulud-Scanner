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

async function fetchFromGitHub(
  url: string
): Promise<{ content: string; filename: string; isYaml: boolean }> {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\/tree\/([^/]+))?/);
  if (!match) throw new Error(`Invalid GitHub URL: ${url}`);

  const [, owner, repo, branch = "main"] = match;
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
