import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getPreviewEntry, listPreviewConflicts, listPreviewNames } from "../previewRegistry";

class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("Preview render failed:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="max-w-lg rounded-lg border border-red-200 bg-red-50 p-5">
          <h2 className="mb-2 text-base font-semibold text-red-600">组件渲染失败</h2>
          <p className="text-sm leading-6 text-red-500">
            {this.state.error.message || "组件运行时抛出异常，请检查 props 或组件逻辑。"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

function PreviewPage() {
  const { component } = useParams<{ component: string }>();
  const [searchParams] = useSearchParams();

  const componentName = component || "";
  const entry = getPreviewEntry(componentName);
  const availableComponents = listPreviewNames();
  const previewConflicts = listPreviewConflicts();
  const Component = entry?.component;

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-2xl rounded-lg border border-gray-200 bg-white p-10 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
            <svg className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-semibold text-gray-800">
            组件未找到
          </h1>
          <p className="mb-6 text-sm leading-6 text-gray-600">
            组件 "{componentName}" 不存在。已启用自动映射，请确认文件在
            <code className="mx-1">src/components</code>
            或
            <code className="mx-1">src/demos</code>
            下并导出 React 组件。
          </p>
          {availableComponents.length > 0 && (
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left">
              <p className="mb-2 text-sm font-medium text-gray-700">已发现可预览项：</p>
              <p className="break-words text-sm text-gray-600">
                {availableComponents.join(", ")}
              </p>
            </div>
          )}
          {previewConflicts.length > 0 && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left">
              <p className="mb-2 text-sm font-medium text-amber-700">命名冲突告警：</p>
              <p className="break-words text-sm text-amber-700">
                {previewConflicts.join(" | ")}
              </p>
            </div>
          )}
          <Link 
            to="/" 
            className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const props: Record<string, unknown> = {};
  searchParams.forEach((value, key) => {
    if (value === "true") {
      props[key] = true;
    } else if (value === "false") {
      props[key] = false;
    } else if (!Number.isNaN(Number(value))) {
      props[key] = Number(value);
    } else {
      props[key] = value;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <Link to="/" className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-600">
            返回首页
          </Link>
          <span className="truncate text-xs text-gray-500 sm:text-sm">
            {componentName} · {entry.kind} · {entry.sourcePath}
          </span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-5xl rounded-lg border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:p-10">
          <PreviewErrorBoundary key={componentName}>
            <Component {...props} />
          </PreviewErrorBoundary>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-5xl">
          {previewConflicts.length > 0 && (
            <div className="mb-1 text-xs text-amber-700 sm:text-sm">
              发现命名冲突：{previewConflicts.join(" | ")}
            </div>
          )}
          <div className="text-xs text-gray-600 sm:text-sm">
            <span className="font-medium">Props:</span>{" "}
            {Object.keys(props).length > 0 
              ? Object.entries(props).map(([k, v]) => `${k}="${v}"`).join(", ")
              : "默认值"}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PreviewPage;
