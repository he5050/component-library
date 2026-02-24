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

const toAliasName = (path: string): string => {
  return path
    .replace(/^\.\//, "")
    .replace(/\.(tsx|jsx|ts|js)$/, "")
    .replace(/\//g, "-");
};

const toKind = (path: string): "component" | "demo" => {
  return path.includes("/demos/") ? "demo" : "component";
};

const registry = new Map<string, PreviewEntry>();

for (const [path, moduleExports] of Object.entries(moduleGlobs)) {
  if (/\/index\.(tsx|jsx|ts|js)$/.test(path)) {
    continue;
  }

  const kind = toKind(path);
  const baseName = toBaseName(path);
  const aliasName = toAliasName(path);

  if (isComponentLike(moduleExports.default)) {
    if (!registry.has(baseName)) {
      registry.set(baseName, {
        component: moduleExports.default,
        kind,
        sourcePath: path,
      });
    }
    if (!registry.has(aliasName)) {
      registry.set(aliasName, {
        component: moduleExports.default,
        kind,
        sourcePath: path,
      });
    }
  }

  for (const [exportName, exportValue] of Object.entries(moduleExports)) {
    if (exportName === "default") {
      continue;
    }
    if (!/^[A-Z]/.test(exportName)) {
      continue;
    }
    if (!isComponentLike(exportValue)) {
      continue;
    }
    if (!registry.has(exportName)) {
      registry.set(exportName, {
        component: exportValue,
        kind,
        sourcePath: path,
      });
    }
  }
}

export const getPreviewEntry = (name: string): PreviewEntry | undefined => {
  return registry.get(name);
};

export const listPreviewNames = (): string[] => {
  return [...registry.keys()].sort((a, b) => a.localeCompare(b));
};
