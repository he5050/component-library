import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const srcRoot = path.resolve(projectRoot, "apps/playground/src");
const manifestPath = path.resolve(projectRoot, "apps/playground/preview-manifest.json");

const SOURCE_GROUPS = [
  { kind: "component", dir: "components" },
  { kind: "demo", dir: "demos" },
];

const VALID_EXTENSIONS = new Set([".tsx", ".jsx", ".ts", ".js"]);

/**
 * 递归读取目录下所有可预览源码文件。
 * @param {string} dirAbs 绝对目录路径
 * @returns {Promise<string[]>}
 */
async function walkSourceFiles(dirAbs) {
  const entries = await fs.readdir(dirAbs, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absPath = path.join(dirAbs, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkSourceFiles(absPath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name);
    if (!VALID_EXTENSIONS.has(ext)) {
      continue;
    }

    if (/^index\.(tsx|jsx|ts|js)$/.test(entry.name)) {
      continue;
    }

    files.push(absPath);
  }

  return files;
}

/**
 * 从源码文本提取可用于预览的导出名称。
 * 优先默认导出（沿用运行时 baseName 规则），否则取首个大写命名导出。
 * @param {string} content 源码文本
 * @param {string} baseName 文件名（无后缀）
 * @returns {string | null}
 */
function pickPreviewName(content, baseName) {
  const hasDefaultExport =
    /export\s+default\s+(function|class)\b/.test(content) ||
    /export\s+default\s+[A-Z][A-Za-z0-9_]*/.test(content) ||
    /export\s*\{\s*[A-Z][A-Za-z0-9_]*\s+as\s+default\s*\}/.test(content);

  if (hasDefaultExport) {
    return baseName;
  }

  const namedDeclaration = content.match(
    /export\s+(?:const|function|class)\s+([A-Z][A-Za-z0-9_]*)/,
  );
  if (namedDeclaration?.[1]) {
    return namedDeclaration[1];
  }

  const namedList = content.match(/export\s*\{([^}]+)\}/);
  if (namedList?.[1]) {
    const parts = namedList[1]
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    for (const part of parts) {
      const [left, right] = part.split(/\s+as\s+/);
      const candidate = (right || left || "").trim();
      if (/^[A-Z][A-Za-z0-9_]*$/.test(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

/**
 * 把绝对路径转为与运行时 registry 一致的 sourcePath。
 * @param {string} absPath 绝对路径
 * @returns {string}
 */
function toSourcePath(absPath) {
  const rel = path.relative(srcRoot, absPath).replaceAll(path.sep, "/");
  return `./${rel}`;
}

async function main() {
  /** @type {Map<string, { name: string; kind: "component" | "demo"; sourcePath: string; routePath: string }>} */
  const entryMap = new Map();
  /** @type {string[]} */
  const conflicts = [];

  for (const group of SOURCE_GROUPS) {
    const dirAbs = path.resolve(srcRoot, group.dir);
    const files = (await walkSourceFiles(dirAbs)).sort((a, b) => a.localeCompare(b));

    for (const fileAbs of files) {
      const content = await fs.readFile(fileAbs, "utf8");
      const baseName = path.basename(fileAbs).replace(/\.(tsx|jsx|ts|js)$/, "");
      const name = pickPreviewName(content, baseName);

      if (!name) {
        continue;
      }

      const sourcePath = toSourcePath(fileAbs);
      const entry = {
        name,
        kind: group.kind,
        sourcePath,
        routePath: `/preview/${encodeURIComponent(name)}`,
      };

      const existed = entryMap.get(name);
      if (existed && existed.sourcePath !== sourcePath) {
        conflicts.push(`${name}: ${existed.sourcePath} <-> ${sourcePath}`);
        continue;
      }

      if (!existed) {
        entryMap.set(name, entry);
      }
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    entries: [...entryMap.values()].sort((a, b) => a.name.localeCompare(b.name)),
    conflicts,
  };

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`[preview-manifest] generated: ${manifestPath}`);
  console.log(`[preview-manifest] entries: ${manifest.entries.length}, conflicts: ${manifest.conflicts.length}`);
}

main().catch((error) => {
  console.error("[preview-manifest] failed:", error);
  process.exitCode = 1;
});
