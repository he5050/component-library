import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const manifestPath = path.resolve(projectRoot, "apps/playground/preview-manifest.json");
const cliBaseUrlArg = process.argv.find((arg) => arg.startsWith("--base-url="));
const baseUrl = cliBaseUrlArg?.split("=")[1] || process.env.PREVIEW_BASE_URL || "http://127.0.0.1:4173";

/**
 * 等待预览服务可访问，避免 CI 中服务未完全启动导致误报。
 * @param {string} url 预览地址
 * @param {number} timeoutMs 超时时间
 */
async function waitForServer(url, timeoutMs = 30_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // 轮询等待
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`预览服务未就绪: ${url}`);
}

/**
 * 读取预览清单。
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
  await waitForServer(baseUrl);
  const manifest = await readManifest();

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });

  /** @type {string[]} */
  const errors = [];

  page.on("pageerror", (error) => {
    errors.push(`pageerror: ${error.message}`);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console.error: ${message.text()}`);
    }
  });

  for (const item of manifest.entries) {
    const url = `${baseUrl}${item.routePath}`;
    errors.length = 0;

    try {
      await page.goto(url, { waitUntil: "networkidle" });

      const notFound = await page.getByText("组件未找到").isVisible();
      const renderFailed = await page.getByText("组件渲染失败").isVisible();

      if (notFound) {
        throw new Error(`页面返回“组件未找到”`);
      }
      if (renderFailed) {
        throw new Error(`页面返回“组件渲染失败”`);
      }
      if (errors.length > 0) {
        throw new Error(errors.join(" | "));
      }

      console.log(`[smoke] ok: ${item.name}`);
    } catch (error) {
      console.error(`[smoke] failed: ${item.name} -> ${url}`);
      console.error(error);
      await browser.close();
      process.exitCode = 1;
      return;
    }
  }

  await browser.close();
  console.log(`[smoke] completed: ${manifest.entries.length} items`);
}

main().catch((error) => {
  console.error("[smoke] failed:", error);
  process.exitCode = 1;
});
