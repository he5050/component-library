import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const srcRoot = path.resolve(projectRoot, "src");
const componentsDir = path.resolve(srcRoot, "components");
const manifestPath = path.resolve(projectRoot, "preview-manifest.json");

const VALID_EXTENSIONS = new Set([".tsx", ".jsx", ".ts", ".js"]);
const PURE_DEMOS = ["LucideDemo"];

/**
 * 读取可预览组件文件。
 * 规则与 previewRegistry 保持一致：组件路由只使用组件名。
 * @returns {Promise<Array<{ name: string; sourcePath: string }>>}
 */
async function readComponentEntries() {
  const entries = await fs.readdir(componentsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => {
      const ext = path.extname(entry.name);
      return VALID_EXTENSIONS.has(ext) && !/^index\.(tsx|jsx|ts|js)$/.test(entry.name);
    })
    .map((entry) => {
      const name = entry.name.replace(/\.(tsx|jsx|ts|js)$/, "");
      return {
        name,
        sourcePath: `./components/${entry.name}`,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function main() {
  const componentEntries = await readComponentEntries();

  const entries = [
    ...componentEntries.map((entry) => ({
      name: entry.name,
      kind: "component",
      sourcePath: entry.sourcePath,
      routePath: `/preview/${encodeURIComponent(entry.name)}`,
    })),
    ...PURE_DEMOS.map((name) => ({
      name,
      kind: "demo",
      sourcePath: `./demos/${name}.tsx`,
      routePath: `/preview/${encodeURIComponent(name)}`,
    })),
  ];

  const manifest = {
    generatedAt: new Date().toISOString(),
    entries,
    conflicts: [],
  };

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`[preview-manifest] generated: ${manifestPath}`);
  console.log(`[preview-manifest] entries: ${manifest.entries.length}, conflicts: ${manifest.conflicts.length}`);
}

main().catch((error) => {
  console.error("[preview-manifest] failed:", error);
  process.exitCode = 1;
});
