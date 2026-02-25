import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const manifestPath = path.resolve(projectRoot, "preview-manifest.json");
const screenshotDir = path.resolve(projectRoot, "screenshots");
const baseUrl = process.env.PREVIEW_BASE_URL || "http://127.0.0.1:4173";

/**
 * 读取预览清单并做基础校验。
 * @returns {Promise<{ entries: Array<{name: string; routePath: string}> }>}
 */
async function readManifest() {
  const raw = await fs.readFile(manifestPath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed.entries)) {
    throw new Error("preview-manifest.json 格式错误：缺少 entries 数组");
  }
  return parsed;
}

async function main() {
  const manifest = await readManifest();
  await fs.mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });

  let failed = 0;

  for (const item of manifest.entries) {
    const url = `${baseUrl}${item.routePath}`;
    const targetPath = path.resolve(screenshotDir, `${item.name}.png`);

    try {
      await page.goto(url, { waitUntil: "networkidle" });
      const notFound = await page.getByText("组件未找到").isVisible();
      const renderFailed = await page.getByText("组件渲染失败").isVisible();

      if (notFound || renderFailed) {
        failed += 1;
        console.error(`[screenshot] skip (render issue): ${item.name} -> ${url}`);
        continue;
      }

      await page.screenshot({
        path: targetPath,
        fullPage: true,
      });
      console.log(`[screenshot] ok: ${item.name}`);
    } catch (error) {
      failed += 1;
      console.error(`[screenshot] failed: ${item.name} -> ${url}`);
      console.error(error);
    }
  }

  await browser.close();

  if (failed > 0) {
    throw new Error(`截图完成但存在失败项: ${failed}`);
  }

  console.log(`[screenshot] completed: ${manifest.entries.length} items`);
}

main().catch((error) => {
  console.error("[screenshot] failed:", error);
  process.exitCode = 1;
});
