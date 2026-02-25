import type { ComponentType } from "react";

type PreviewComponent = ComponentType<Record<string, unknown>>;
type ModuleExports = Record<string, unknown> & {
  default?: unknown;
};

export interface PreviewEntry {
  component: PreviewComponent;
  kind: "component" | "demo";
  sourcePath: string;
}

const moduleGlobs = import.meta.glob<ModuleExports>(
  [
    "./components/**/*.{tsx,jsx,ts,js}",
    "./demos/**/*.{tsx,jsx,ts,js}",
  ],
  { eager: true },
);

const isComponentLike = (value: unknown): value is PreviewComponent => {
  return typeof value === "function" || (typeof value === "object" && value !== null);
};

const toBaseName = (path: string): string => {
  const raw = path.split("/").pop() || "";
  return raw.replace(/\.(tsx|jsx|ts|js)$/, "");
};

const toKind = (path: string): "component" | "demo" => {
  return path.includes("/demos/") ? "demo" : "component";
};

const registry = new Map<string, PreviewEntry>();
const conflicts: string[] = [];

const registerEntry = (name: string, entry: PreviewEntry) => {
  const exists = registry.get(name);
  if (!exists) {
    registry.set(name, entry);
    return;
  }
  if (exists.sourcePath !== entry.sourcePath) {
    conflicts.push(`${name}: ${exists.sourcePath} <-> ${entry.sourcePath}`);
  }
};

for (const [path, moduleExports] of Object.entries(moduleGlobs)) {
  if (/\/index\.(tsx|jsx|ts|js)$/.test(path)) {
    continue;
  }

  const kind = toKind(path);
  // 每个文件只注册一个预览入口，避免同一组件多名称重复展示
  if (isComponentLike(moduleExports.default)) {
    registerEntry(toBaseName(path), {
      component: moduleExports.default,
      kind,
      sourcePath: path,
    });
    continue;
  }

  const namedExportEntry = Object.entries(moduleExports).find(
    ([exportName, exportValue]) =>
      exportName !== "default" &&
      /^[A-Z]/.test(exportName) &&
      isComponentLike(exportValue),
  );

  if (!namedExportEntry) {
    continue;
  }

  const [exportName, exportValue] = namedExportEntry;
  registerEntry(exportName, {
    component: exportValue as PreviewComponent,
    kind,
    sourcePath: path,
  });
}

if (conflicts.length > 0) {
  // 冲突时保留首个映射，同时输出告警帮助定位命名重复
  console.warn("[previewRegistry] duplicate preview names detected:", conflicts);
}

export const getPreviewEntry = (name: string): PreviewEntry | undefined => {
  return registry.get(name);
};

export const listPreviewNames = (): string[] => {
  return [...registry.keys()].sort((a, b) => a.localeCompare(b));
};

export const listPreviewConflicts = (): string[] => {
  return [...conflicts];
};
