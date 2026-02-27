import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { getPreviewEntry, listPreviewNames } from "../previewRegistry"
import { fadeInStagger, cardEnter, rippleEffect } from "../utils/animations"

interface ComponentItem {
  id: string
  name: string
  category: string
  description: string
}

function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const params = new URLSearchParams(location.search)
  const search = params.get("search") || ""
  const category = params.get("category") || ""

  const allNames = listPreviewNames()
  const components: ComponentItem[] = allNames.map((id) => {
    const entry = getPreviewEntry(id)
    return {
      id,
      name: id,
      category: entry?.kind === "demo" ? "示例" : "基础组件",
      description: entry?.kind === "demo" ? "交互演示组件" : "基础 UI 组件",
    }
  })

  const categories = Array.from(new Set(components.map((c) => c.category)))

  useEffect(() => {
    if (search) setSearchQuery(search)
    if (category) setSelectedCategory(category)
  }, [search, category])

  useEffect(() => {
    if (pageRef.current) {
      fadeInStagger(".page-header > *", 80)
    }
    if (cardsRef.current) {
      cardEnter(".component-card")
    }
  }, [])

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || component.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    const params = new URLSearchParams(location.search)
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    navigate({ search: params.toString() }, { replace: true })
  }

  const handleCategorySelect = (cat: string | null) => {
    setSelectedCategory(cat)
    const params = new URLSearchParams(location.search)
    if (cat) {
      params.set("category", cat)
    } else {
      params.delete("category")
    }
    navigate({ search: params.toString() }, { replace: true })
  }

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, componentId: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    rippleEffect(e.currentTarget, x, y)
    setTimeout(() => {
      navigate(`/preview/${componentId}`)
    }, 150)
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-paper">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="page-header mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-zhusha to-zhusha/60 rounded-full" />
            <span className="text-xs text-ink-medium tracking-[0.2em] uppercase font-display">组件库</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-ink-deep mb-3 tracking-wide">
            水墨禅意组件
          </h1>
          <p className="text-ink-medium text-lg max-w-2xl leading-relaxed">
            计白当黑，淡雅素净。以水墨美学构建现代组件系统。
          </p>
        </header>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Input
            placeholder="搜索组件..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full sm:w-72"
          />
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "primary" : "ghost"}
              size="sm"
              onClick={() => handleCategorySelect(null)}>
              全部
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "primary" : "ghost"}
                size="sm"
                onClick={() => handleCategorySelect(cat)}>
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="ink-divider mb-8" />

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              onClick={(e) => handleCardClick(e, component.id)}
              className="component-card ink-card p-6 cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-display font-semibold text-ink-deep group-hover:text-zhusha transition-colors duration-200">
                  {component.name}
                </h3>
                <span className="ink-tag">{component.category}</span>
              </div>
              <p className="text-sm text-ink-medium leading-relaxed mb-4">
                {component.description}
              </p>
              <div className="flex items-center gap-2 text-link text-sm group-hover:text-link-hover transition-colors duration-200">
                <span>查看组件</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-ink-light text-6xl mb-4 font-display">空</div>
            <p className="text-ink-medium">未找到匹配的组件</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4"
              onClick={() => {
                handleSearch("")
                handleCategorySelect(null)
              }}>
              清除筛选
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
