import { useParams, useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getPreviewEntry, listPreviewNames } from "../previewRegistry"
import { ArrowLeft, ChevronRight } from "lucide-react"
import Button from "../components/Button"

function PreviewPage() {
  const { component } = useParams<{ component: string }>()
  const [searchParams] = useSearchParams()

  const entry = getPreviewEntry(component || "")
  const allNames = listPreviewNames()

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center ink-card p-12 max-w-md">
          <div className="w-16 h-16 bg-paper-warm border border-ink/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-ink-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-ink-deep mb-2">
            组件未找到
          </h1>
          <p className="text-ink-medium mb-6">
            组件 "{component}" 不存在
          </p>
          {allNames.length > 0 && (
            <div className="mb-6 text-left">
              <p className="text-xs text-ink-light mb-2 uppercase tracking-wider">可用组件：</p>
              <div className="flex flex-wrap gap-2">
                {allNames.map((name) => (
                  <Link
                    key={name}
                    to={`/preview/${name}`}
                    className="px-2.5 py-1 text-xs bg-paper-warm rounded-full border border-ink/10 hover:border-link hover:text-link transition-all text-ink-thick">
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <Link to="/">
              <Button variant="primary" size="md">
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const props: Record<string, unknown> = {}
  searchParams.forEach((value, key) => {
    if (value === "true") props[key] = true
    else if (value === "false") props[key] = false
    else if (!isNaN(Number(value))) props[key] = Number(value)
    else props[key] = value
  })

  const Component = entry.component

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-paper to-paper-warm/40">
      <header className="py-4 px-6 bg-paper/85 backdrop-blur-sm border-b border-ink/8 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="link-ink inline-flex items-center gap-1.5 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <span className="text-ink-light text-sm px-2.5 py-1 rounded-full border border-ink/10 bg-paper-warm">
            {component} · {entry.kind === "demo" ? "示例" : "组件"}
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl ink-card p-6 md:p-10">
          <div className="mb-6 flex items-center justify-between border-b border-ink/8 pb-4">
            <h1 className="text-xl md:text-2xl font-display text-ink-deep">{component}</h1>
            <span className="text-xs text-ink-medium uppercase tracking-wider">Preview</span>
          </div>
          <Component {...props} />
        </div>
      </main>

      <footer className="py-4 px-6 bg-paper/85 backdrop-blur-sm border-t border-ink/8">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-ink-medium flex flex-wrap items-center gap-2">
            <span className="font-medium text-ink-thick">Props：</span>
            {Object.keys(props).length > 0 ? (
              Object.entries(props).map(([k, v]) => (
                <code key={k} className="text-xs px-2 py-0.5 rounded-full border border-ink/10 bg-paper-warm">
                  {k}="{String(v)}"
                </code>
              ))
            ) : (
              <span className="text-ink-light">默认值</span>
            )}
            <Link to="/" className="link-ink ml-auto inline-flex items-center gap-1">
              返回组件列表
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PreviewPage
