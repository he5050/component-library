import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getPreviewEntry, listPreviewNames } from "../previewRegistry";

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
        <div className="max-w-lg bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-red-700 mb-2">组件渲染失败</h2>
          <p className="text-red-600 text-sm leading-relaxed">
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
  const Component = entry?.component;

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-2xl p-12 shadow-sm border border-primary-100 max-w-2xl">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-primary-900 mb-2">
            组件未找到
          </h1>
          <p className="text-primary-600 mb-6">
            组件 "{componentName}" 不存在。已启用自动映射，请确认文件在
            <code className="mx-1">src/components</code>
            或
            <code className="mx-1">src/demos</code>
            下并导出 React 组件。
          </p>
          {availableComponents.length > 0 && (
            <div className="text-left bg-primary-50 border border-primary-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-primary-700 mb-2 font-medium">已发现可预览项：</p>
              <p className="text-sm text-primary-600 break-words">
                {availableComponents.join(", ")}
              </p>
            </div>
          )}
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
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
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 bg-white border-b border-primary-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-primary-600 hover:text-primary transition-colors text-sm font-medium">
            返回首页
          </Link>
          <span className="text-primary-500 text-sm">
            {componentName} · {entry.kind} · {entry.sourcePath}
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-primary-100">
          <PreviewErrorBoundary key={componentName}>
            <Component {...props} />
          </PreviewErrorBoundary>
        </div>
      </main>

      <footer className="py-4 px-6 bg-white border-t border-primary-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-primary-600">
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
