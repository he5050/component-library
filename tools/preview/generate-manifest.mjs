import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const srcRoot = path.resolve(projectRoot, "src");
const componentsDir = path.resolve(srcRoot, "components");
const demosDir = path.resolve(srcRoot, "demos");
const manifestPath = path.resolve(projectRoot, "preview-manifest.json");

const VALID_EXTENSIONS = new Set([".tsx", ".jsx", ".ts", ".js"]);
const EXCLUDED_FILES = new Set(["index.tsx", "index.jsx", "index.ts", "index.js"]);

/**
 * 递归读取目录下的所有组件文件
 * @param {string} dir - 目录路径
 * @param {string} basePath - 相对于 src 的路径前缀
 * @returns {Promise<Array<{ name: string; sourcePath: string; kind: string }>>}
 */
async function readDirEntries(dir, basePath) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    const results = [];
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        // 递归读取子目录
        const subDir = path.join(dir, entry.name);
        const subBasePath = path.join(basePath, entry.name);
        const subEntries = await readDirEntries(subDir, subBasePath);
        results.push(...subEntries);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (VALID_EXTENSIONS.has(ext) && !EXCLUDED_FILES.has(entry.name)) {
          const name = entry.name.replace(/\.(tsx|jsx|ts|js)$/, "");
          const isDemo = basePath.startsWith("demos");
          results.push({
            name,
            sourcePath: `./${basePath}/${entry.name}`,
            kind: isDemo ? "demo" : "component",
          });
        }
      }
    }
    
    return results;
  } catch (error) {
    // 目录不存在时返回空数组
    return [];
  }
}

async function main() {
  const componentEntries = await readDirEntries(componentsDir, "components");
  const demoEntries = await readDirEntries(demosDir, "demos");

  const entries = [
    ...componentEntries.map((entry) => ({
      name: entry.name,
      kind: entry.kind,
      sourcePath: entry.sourcePath,
      routePath: `/preview/${encodeURIComponent(entry.name)}`,
    })),
    ...demoEntries.map((entry) => ({
      name: entry.name,
      kind: entry.kind,
      sourcePath: entry.sourcePath,
      routePath: `/preview/${encodeURIComponent(entry.name)}`,
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
