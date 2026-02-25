import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { createTimeline, stagger, remove, animate } from "animejs"
import {
  LayoutGrid,
  Box,
  Palette,
  Type,
  MousePointer,
  Layers,
  Search,
  Tag,
  X,
  ChevronRight,
} from "lucide-react"
import { listPreviewNames, getPreviewEntry, type PreviewEntry } from "../previewRegistry"

// ==================== 类型定义 ====================

type ComponentCategory = "all" | "basic" | "form" | "feedback" | "data" | "navigation" | "demo"

interface ComponentMeta {
  name: string
  category: ComponentCategory
  tags: string[]
  description: string
}

// ==================== 组件元数据 ====================

const componentMetadata: Record<string, ComponentMeta> = {
  Button: {
    name: "Button",
    category: "basic",
    tags: ["基础", "交互", "表单"],
    description: "按钮组件，支持多种变体和尺寸",
  },
  LucideDemo: {
    name: "LucideDemo",
    category: "demo",
    tags: ["图标", "展示", "示例"],
    description: "Lucide 图标库展示",
  },
}

const categoryLabels: Record<ComponentCategory, { label: string; icon: React.ElementType; color: string }> = {
  all: { label: "全部", icon: LayoutGrid, color: "#1a1a1a" },
  basic: { label: "基础组件", icon: Box, color: "#1772b4" },
  form: { label: "表单", icon: MousePointer, color: "#789262" },
  feedback: { label: "反馈", icon: Palette, color: "#ca6924" },
  data: { label: "数据展示", icon: Layers, color: "#c04851" },
  navigation: { label: "导航", icon: ChevronRight, color: "#b0905d" },
  demo: { label: "示例", icon: Type, color: "#cca4e3" },
}

const allTags = ["基础", "交互", "表单", "图标", "展示", "示例", "反馈", "数据"]

// ==================== 动画配置 ====================

const animeConfig = {
  easing: {
    inkFade: "cubicBezier(0.4, 0, 0.2, 1)",
    inkFloat: "cubicBezier(0.34, 1.56, 0.64, 1)",
  },
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
}

// ==================== 组件 ====================

function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredComponents, setFilteredComponents] = useState<string[]>([])

  // 获取所有组件
  const allComponents = useMemo(() => listPreviewNames(), [])

  // 过滤组件
  useEffect(() => {
    let filtered = allComponents

    // 按分类过滤
    if (activeCategory !== "all") {
      filtered = filtered.filter((name) => {
        const meta = componentMetadata[name]
        return meta?.category === activeCategory || (!meta && activeCategory === "demo")
      })
    }

    // 按标签过滤
    if (selectedTags.length > 0) {
      filtered = filtered.filter((name) => {
        const meta = componentMetadata[name]
        return meta?.tags.some((tag) => selectedTags.includes(tag))
      })
    }

    // 按搜索词过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((name) => {
        const meta = componentMetadata[name]
        return (
          name.toLowerCase().includes(query) ||
          meta?.description.toLowerCase().includes(query) ||
          meta?.tags.some((tag) => tag.toLowerCase().includes(query))
        )
      })
    }

    setFilteredComponents(filtered)
  }, [activeCategory, selectedTags, searchQuery, allComponents])

  // 入场动画
  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: animeConfig.easing.inkFade },
    })

    tl.add(".hero-section", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: animeConfig.duration.slow,
    })
    .add(".filter-section", {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: animeConfig.duration.normal,
    }, "-=300")
    .add(".component-card", {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.96, 1],
      duration: animeConfig.duration.normal,
      delay: stagger(50),
    }, "-=200")

    return () => {
      remove(".hero-section")
      remove(".filter-section")
      remove(".component-card")
    }
  }, [])

  // 组件列表变化时的动画
  useEffect(() => {
    animate(".component-card", {
      opacity: [0, 1],
      translateY: [10, 0],
      scale: [0.98, 1],
      duration: animeConfig.duration.normal,
      delay: stagger(30),
      ease: animeConfig.easing.inkFade,
    })
  }, [filteredComponents])

  // 切换标签
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  // 清除所有过滤
  const clearFilters = () => {
    setActiveCategory("all")
    setSelectedTags([])
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero 区域 */}
      <header className="hero-section py-12 px-6 text-center opacity-0">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-ink-deep mb-3 tracking-wide">
            水墨组件库
          </h1>
          <p className="text-lg text-ink-medium font-body">
            计白当黑 · 淡雅素净 · 现代交互
          </p>
        </div>
      </header>

      <main className="flex-1 px-6 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 过滤区域 */}
          <section className="filter-section ink-card p-6 opacity-0">
            {/* 搜索框 */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-light" />
              <input
                type="text"
                placeholder="搜索组件..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-paper border border-ink/10 rounded-ink text-ink-thick placeholder:text-ink-light focus:outline-none focus:border-zhusha/50 focus:ring-2 focus:ring-zhusha/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink-thick"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 分类标签 */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-sm text-ink-medium">
                <LayoutGrid className="w-4 h-4" />
                <span>分类</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(categoryLabels) as ComponentCategory[]).map((key) => {
                  const { label, icon: Icon, color } = categoryLabels[key]
                  const isActive = activeCategory === key
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-white shadow-ink"
                          : "bg-ink-pale text-ink-thick hover:bg-ink-200 border border-ink/5"
                      }`}
                      style={{
                        backgroundColor: isActive ? color : undefined,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 标签过滤 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3 text-sm text-ink-medium">
                <Tag className="w-4 h-4" />
                <span>标签</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                        isSelected
                          ? "bg-zhusha text-white shadow-ink"
                          : "bg-ink-pale/50 text-ink-medium hover:bg-ink-pale border border-ink/5"
                      }`}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 已选过滤条件 */}
            {(activeCategory !== "all" || selectedTags.length > 0 || searchQuery) && (
              <div className="flex items-center gap-3 pt-4 border-t border-ink/5">
                <span className="text-sm text-ink-light">
                  已选: {filteredComponents.length} 个组件
                </span>
                <button
                  onClick={clearFilters}
                  className="text-sm text-zhusha hover:text-haitang flex items-center gap-1 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  清除过滤
                </button>
              </div>
            )}
          </section>

          {/* 组件列表 */}
          <section>
            {filteredComponents.length === 0 ? (
              <div className="ink-card p-12 text-center">
                <div className="text-ink-light mb-2">
                  <Search className="w-12 h-12 mx-auto opacity-30" />
                </div>
                <p className="text-ink-medium">未找到匹配的组件</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-zhusha hover:text-haitang text-sm transition-colors"
                >
                  清除过滤条件
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredComponents.map((name) => {
                  const meta = componentMetadata[name]
                  const entry = getPreviewEntry(name)
                  const categoryInfo = meta
                    ? categoryLabels[meta.category]
                    : categoryLabels.demo
                  const CategoryIcon = categoryInfo.icon

                  return (
                    <Link
                      key={name}
                      to={`/preview/${name}`}
                      className="component-card ink-card p-5 group hover:shadow-ink-hover hover:-translate-y-0.5 transition-all duration-200 opacity-0"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-10 h-10 rounded-ink flex items-center justify-center"
                          style={{ backgroundColor: `${categoryInfo.color}15` }}
                        >
                          <CategoryIcon
                            className="w-5 h-5"
                            style={{ color: categoryInfo.color }}
                          />
                        </div>
                        <span className="text-xs text-ink-light px-2 py-1 bg-ink-pale/50 rounded-full">
                          {categoryInfo.label}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-ink-deep mb-1 group-hover:text-zhusha transition-colors">
                        {name}
                      </h3>

                      <p className="text-sm text-ink-medium mb-3 line-clamp-2">
                        {meta?.description || "暂无描述"}
                      </p>

                      {meta?.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {meta.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-ink-light px-2 py-0.5 bg-ink-pale/30 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </section>

          {/* 使用方式说明 */}
          <section className="ink-card p-8">
            <h2 className="text-xl font-display font-semibold text-ink-deep mb-4">
              使用方式
            </h2>
            <p className="text-ink-thick mb-6 leading-relaxed">
              在 Obsidian 笔记中使用以下语法引用组件预览：
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-medium text-ink-medium mb-2 uppercase tracking-wider">
                  方式一：行内语法
                </h3>
                <div className="bg-ink-pale rounded-lg p-4 border border-ink/5">
                  <code className="text-ink-thick text-sm">
                    ::component[Button]{"{variant=\"primary\"}"}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-ink-medium mb-2 uppercase tracking-wider">
                  方式二：代码块
                </h3>
                <div className="bg-ink-pale rounded-lg p-4 border border-ink/5">
                  <pre className="text-ink-thick text-sm m-0 bg-transparent p-0">
{`\`\`\`component
Button
variant=primary
\`\`\``}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* 设计理念 */}
          <section className="ink-card p-8">
            <h2 className="text-xl font-display font-semibold text-ink-deep mb-4">
              设计理念
            </h2>
            <div className="space-y-4 text-ink-thick leading-relaxed">
              <p>
                <span className="text-ink-deep font-medium">水墨五色</span> — 焦墨、浓墨、重墨、淡墨、清墨，构建层次分明的视觉体系。
              </p>
              <p>
                <span className="text-ink-deep font-medium">计白当黑</span> — 以留白为设计语言，追求淡雅素净的空灵感。
              </p>
              <p>
                <span className="text-ink-deep font-medium">朱砂点缀</span> — 以朱砂红为强调色，如印章落款，画龙点睛。
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-6 px-6 border-t border-ink/5">
        <div className="max-w-5xl mx-auto text-center text-ink-light text-sm">
          水墨组件库 · 融合传统美学与现代交互
        </div>
      </footer>
    </div>
  )
}

export default HomePage
