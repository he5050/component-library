import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  getPreviewEntry,
  listPreviewConflicts,
  listPreviewNames,
} from "../previewRegistry"

type FilterKind = "all" | "component" | "demo"
type ViewMode = "pagination" | "virtual"

interface PreviewListItem {
  name: string
  kind: "component" | "demo"
  sourcePath: string
  tags: string[]
}

const PAGE_SIZE_OPTIONS = [18, 36, 72] as const

function normalizeTag(text: string): string {
  return text.trim().toLowerCase().replace(/[^a-z0-9-]/g, "")
}

function inferTags(
  name: string,
  kind: "component" | "demo",
  sourcePath: string,
): string[] {
  const tagSet = new Set<string>()
  const pathLower = sourcePath.toLowerCase()
  const nameLower = name.toLowerCase()

  tagSet.add(kind)

  const segments = sourcePath
    .replace(/^\.\//, "")
    .replace(/\.(tsx|jsx|ts|js)$/, "")
    .split("/")
    .map((segment) => normalizeTag(segment))
    .filter(
      (segment) =>
        segment &&
        ![
          "src",
          "apps",
          "playground",
          "components",
          "demos",
          "index",
        ].includes(segment),
    )

  for (const segment of segments) {
    tagSet.add(segment)
  }

  if (nameLower.includes("button")) tagSet.add("button")
  if (nameLower.includes("input") || nameLower.includes("select")) tagSet.add("form")
  if (nameLower.includes("table") || nameLower.includes("list")) tagSet.add("data")
  if (nameLower.includes("modal") || nameLower.includes("dialog")) tagSet.add("overlay")
  if (nameLower.includes("chart") || nameLower.includes("graph")) tagSet.add("chart")
  if (nameLower.includes("icon") || pathLower.includes("lucide")) tagSet.add("icon")
  if (kind === "demo") tagSet.add("example")

  return [...tagSet].slice(0, 8)
}

function HomePage() {
  const [keyword, setKeyword] = useState("")
  const [kindFilter, setKindFilter] = useState<FilterKind>("all")
  const [tagFilter, setTagFilter] = useState("all")
  const [viewMode, setViewMode] = useState<ViewMode>("pagination")
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0])
  const [page, setPage] = useState(1)
  const [scrollTop, setScrollTop] = useState(0)

  const virtualContainerRef = useRef<HTMLDivElement | null>(null)

  const names = listPreviewNames()
  const conflicts = listPreviewConflicts()

  const entries = useMemo<PreviewListItem[]>(() => {
    const uniquePathSet = new Set<string>()

    return names
      .map((name) => {
        const entry = getPreviewEntry(name)
        if (!entry) {
          return null
        }
        const uniqueKey = `${entry.kind}:${entry.sourcePath}`
        if (uniquePathSet.has(uniqueKey)) {
          return null
        }
        uniquePathSet.add(uniqueKey)
        return {
          name,
          kind: entry.kind,
          sourcePath: entry.sourcePath,
          tags: inferTags(name, entry.kind, entry.sourcePath),
        }
      })
      .filter((item): item is PreviewListItem => Boolean(item))
  }, [names])

  const tagStats = useMemo(() => {
    const counter = new Map<string, number>()

    for (const item of entries) {
      for (const tag of item.tags) {
        counter.set(tag, (counter.get(tag) || 0) + 1)
      }
    }

    return [...counter.entries()]
      .sort((a, b) => {
        if (b[1] !== a[1]) {
          return b[1] - a[1]
        }
        return a[0].localeCompare(b[0])
      })
      .slice(0, 20)
  }, [entries])

  const filteredEntries = useMemo(() => {
    const q = keyword.trim().toLowerCase()

    return entries.filter((item) => {
      const byKind = kindFilter === "all" || item.kind === kindFilter
      if (!byKind) {
        return false
      }

      const byTag = tagFilter === "all" || item.tags.includes(tagFilter)
      if (!byTag) {
        return false
      }

      if (!q) {
        return true
      }

      return (
        item.name.toLowerCase().includes(q) ||
        item.sourcePath.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.includes(q))
      )
    })
  }, [entries, keyword, kindFilter, tagFilter])

  const componentCount = entries.filter((item) => item.kind === "component").length
  const demoCount = entries.filter((item) => item.kind === "demo").length

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const pagedEntries = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filteredEntries.slice(start, start + pageSize)
  }, [filteredEntries, pageSize, safePage])
  const pagedComponentEntries = useMemo(
    () => pagedEntries.filter((item) => item.kind === "component"),
    [pagedEntries],
  )
  const pagedDemoEntries = useMemo(
    () => pagedEntries.filter((item) => item.kind === "demo"),
    [pagedEntries],
  )

  const virtualRowHeight = 82
  const virtualOverscan = 8
  const virtualContainerHeight = 560
  const virtualStartIndex = Math.max(
    0,
    Math.floor(scrollTop / virtualRowHeight) - virtualOverscan,
  )
  const virtualVisibleCount =
    Math.ceil(virtualContainerHeight / virtualRowHeight) + virtualOverscan * 2
  const virtualEndIndex = Math.min(
    filteredEntries.length,
    virtualStartIndex + virtualVisibleCount,
  )
  const virtualVisibleEntries = filteredEntries.slice(
    virtualStartIndex,
    virtualEndIndex,
  )
  const virtualComponentEntries = useMemo(
    () => virtualVisibleEntries.filter((item) => item.kind === "component"),
    [virtualVisibleEntries],
  )
  const virtualDemoEntries = useMemo(
    () => virtualVisibleEntries.filter((item) => item.kind === "demo"),
    [virtualVisibleEntries],
  )
  const virtualTopSpacer = virtualStartIndex * virtualRowHeight
  const virtualBottomSpacer =
    Math.max(0, filteredEntries.length - virtualEndIndex) * virtualRowHeight

  useEffect(() => {
    setPage(1)
  }, [keyword, kindFilter, tagFilter, pageSize])

  useEffect(() => {
    if (viewMode !== "virtual") {
      return
    }
    setScrollTop(0)
    if (virtualContainerRef.current) {
      virtualContainerRef.current.scrollTop = 0
    }
  }, [viewMode, keyword, kindFilter, tagFilter])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-primary-900 mb-2">
            Component Library
          </h1>
          <p className="text-lg text-primary-700">
            自动发现并预览组件与 Demo，支持分页、虚拟列表与标签分类
          </p>
        </div>
      </header>

      <main className="flex-1 px-6 pb-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-primary-100">
            <h2 className="text-xl font-display font-semibold text-primary-900 mb-4">
              使用方式
            </h2>
            <div className="space-y-3 text-sm text-primary-700">
              <p>在 Obsidian 中可使用行内语法引用组件：</p>
              <div className="bg-primary-50 rounded-xl p-3 border border-primary-100">
                <code className="text-primary-800 font-mono">
                  ::component[Button]{"{variant=\"primary\"}"}
                </code>
              </div>
              <p>预览页路由格式：</p>
              <div className="bg-primary-50 rounded-xl p-3 border border-primary-100">
                <code className="text-primary-800 font-mono">
                  /preview/&lt;组件名&gt;?prop=value
                </code>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm border border-primary-100">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-display font-semibold text-primary-900">
                  预览目录
                </h2>
                <p className="text-sm text-primary-600">
                  共 {entries.length} 项 · Component {componentCount} · Demo {demoCount}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setKindFilter("all")}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    kindFilter === "all"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary-700 border-primary-200 hover:bg-primary-50"
                  }`}
                >
                  全部
                </button>
                <button
                  type="button"
                  onClick={() => setKindFilter("component")}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    kindFilter === "component"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary-700 border-primary-200 hover:bg-primary-50"
                  }`}
                >
                  Component
                </button>
                <button
                  type="button"
                  onClick={() => setKindFilter("demo")}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    kindFilter === "demo"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary-700 border-primary-200 hover:bg-primary-50"
                  }`}
                >
                  Demo
                </button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3 mb-4">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="搜索名称、路径或标签，例如 lucide / form"
                className="md:col-span-2 rounded-xl border border-primary-200 px-4 py-2 text-sm text-primary-800 outline-none focus:border-primary"
              />

              <div className="flex rounded-xl border border-primary-200 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("pagination")}
                  className={`flex-1 rounded-lg py-1.5 ${
                    viewMode === "pagination"
                      ? "bg-primary text-white"
                      : "text-primary-700 hover:bg-primary-50"
                  }`}
                >
                  分页模式
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("virtual")}
                  className={`flex-1 rounded-lg py-1.5 ${
                    viewMode === "virtual"
                      ? "bg-primary text-white"
                      : "text-primary-700 hover:bg-primary-50"
                  }`}
                >
                  虚拟列表
                </button>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setTagFilter("all")}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  tagFilter === "all"
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary-700 border-primary-200 hover:bg-primary-50"
                }`}
              >
                全部标签
              </button>
              {tagStats.map(([tag, count]) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTagFilter(tag)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    tagFilter === tag
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary-700 border-primary-200 hover:bg-primary-50"
                  }`}
                >
                  {tag} ({count})
                </button>
              ))}
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-primary-600">
              <span>
                当前结果 {filteredEntries.length} 项
                {tagFilter !== "all" ? ` · 标签: ${tagFilter}` : ""}
              </span>

              {viewMode === "pagination" && (
                <div className="flex items-center gap-2">
                  <span>每页</span>
                  <select
                    value={pageSize}
                    onChange={(event) => setPageSize(Number(event.target.value))}
                    className="rounded-lg border border-primary-200 bg-white px-2 py-1 text-sm text-primary-700"
                  >
                    {PAGE_SIZE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {filteredEntries.length === 0 ? (
              <div className="rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">
                未找到匹配项，请调整关键词或筛选条件。
              </div>
            ) : viewMode === "pagination" ? (
              <>
                <div className="space-y-5">
                  {(kindFilter === "all" || kindFilter === "component") &&
                    pagedComponentEntries.length > 0 && (
                      <section>
                        <h3 className="mb-2 text-sm font-semibold text-primary-800">
                          组件（components）
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {pagedComponentEntries.map((item) => (
                            <Link
                              key={item.name}
                              to={`/preview/${encodeURIComponent(item.name)}`}
                              className="rounded-xl border border-primary-100 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
                            >
                              <div className="mb-2 flex items-center justify-between gap-3">
                                <h4 className="truncate font-medium text-primary-900">{item.name}</h4>
                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                                  component
                                </span>
                              </div>
                              <p className="mb-2 truncate text-xs text-primary-600">{item.sourcePath}</p>
                              <div className="flex flex-wrap gap-1">
                                {item.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={`${item.name}-${tag}`}
                                    className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] text-primary-600"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}

                  {(kindFilter === "all" || kindFilter === "demo") &&
                    pagedDemoEntries.length > 0 && (
                      <section>
                        <h3 className="mb-2 text-sm font-semibold text-primary-800">
                          Demo（demos）
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {pagedDemoEntries.map((item) => (
                            <Link
                              key={item.name}
                              to={`/preview/${encodeURIComponent(item.name)}`}
                              className="rounded-xl border border-primary-100 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
                            >
                              <div className="mb-2 flex items-center justify-between gap-3">
                                <h4 className="truncate font-medium text-primary-900">{item.name}</h4>
                                <span className="rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-[11px] text-purple-700">
                                  demo
                                </span>
                              </div>
                              <p className="mb-2 truncate text-xs text-primary-600">{item.sourcePath}</p>
                              <div className="flex flex-wrap gap-1">
                                {item.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={`${item.name}-${tag}`}
                                    className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] text-primary-600"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="text-primary-600">
                    第 {safePage} / {totalPages} 页
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={safePage <= 1}
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      className="rounded-lg border border-primary-200 px-3 py-1.5 text-primary-700 disabled:opacity-40"
                    >
                      上一页
                    </button>
                    <button
                      type="button"
                      disabled={safePage >= totalPages}
                      onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                      className="rounded-lg border border-primary-200 px-3 py-1.5 text-primary-700 disabled:opacity-40"
                    >
                      下一页
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div
                ref={virtualContainerRef}
                onScroll={(event) => {
                  setScrollTop(event.currentTarget.scrollTop)
                }}
                className="h-[560px] overflow-y-auto rounded-xl border border-primary-100 bg-primary-50"
              >
                <div style={{ height: virtualTopSpacer }} />
                <div className="space-y-4 p-2">
                  {(kindFilter === "all" || kindFilter === "component") &&
                    virtualComponentEntries.length > 0 && (
                      <section>
                        <h3 className="mb-2 text-xs font-semibold text-primary-700">
                          组件（components）
                        </h3>
                        <div className="space-y-2">
                          {virtualComponentEntries.map((item) => (
                            <Link
                              key={item.name}
                              to={`/preview/${encodeURIComponent(item.name)}`}
                              className="flex items-center justify-between gap-3 rounded-lg border border-primary-100 bg-white px-3 py-3 hover:bg-primary-50"
                              style={{ minHeight: `${virtualRowHeight - 8}px` }}
                            >
                              <div className="min-w-0">
                                <div className="font-medium text-primary-900 truncate">{item.name}</div>
                                <div className="truncate text-xs text-primary-600">{item.sourcePath}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                                  component
                                </span>
                                <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] text-primary-600">
                                  {item.tags[0] || "untagged"}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}

                  {(kindFilter === "all" || kindFilter === "demo") &&
                    virtualDemoEntries.length > 0 && (
                      <section>
                        <h3 className="mb-2 text-xs font-semibold text-primary-700">
                          Demo（demos）
                        </h3>
                        <div className="space-y-2">
                          {virtualDemoEntries.map((item) => (
                            <Link
                              key={item.name}
                              to={`/preview/${encodeURIComponent(item.name)}`}
                              className="flex items-center justify-between gap-3 rounded-lg border border-primary-100 bg-white px-3 py-3 hover:bg-primary-50"
                              style={{ minHeight: `${virtualRowHeight - 8}px` }}
                            >
                              <div className="min-w-0">
                                <div className="font-medium text-primary-900 truncate">{item.name}</div>
                                <div className="truncate text-xs text-primary-600">{item.sourcePath}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] px-2 py-0.5 rounded-full border bg-purple-50 text-purple-700 border-purple-200">
                                  demo
                                </span>
                                <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] text-primary-600">
                                  {item.tags[0] || "untagged"}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}
                </div>
                <div style={{ height: virtualBottomSpacer }} />
              </div>
            )}
          </section>

          {conflicts.length > 0 && (
            <section className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <h2 className="text-lg font-semibold text-amber-800 mb-2">命名冲突提醒</h2>
              <div className="text-sm text-amber-700 space-y-1">
                {conflicts.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="py-6 px-6 border-t border-primary-100">
        <div className="max-w-5xl mx-auto text-center text-primary-600 text-sm">
          Component Library Preview System
        </div>
      </footer>
    </div>
  )
}

export default HomePage
