import React, { useEffect, useRef, useCallback, useState, useMemo } from "react"
import { createTimeline, stagger, remove, animate } from "animejs"
import {
  Camera,
  Heart,
  Sun,
  Moon,
  Search,
  Settings,
  User,
  Home,
  Mail,
  Bell,
  Star,
  Trash2,
  Edit,
  Plus,
  Minus,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Download,
  Upload,
  Copy,
  Share2,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Minus as MinusIcon,
  Plus as PlusIcon,
} from "lucide-react"

interface LucideDemoProps {
  size?: number
  strokeWidth?: number
}

const iconGroups = [
  {
    title: "常用图标",
    icons: [
      { name: "Home", icon: Home },
      { name: "User", icon: User },
      { name: "Settings", icon: Settings },
      { name: "Search", icon: Search },
      { name: "Mail", icon: Mail },
      { name: "Bell", icon: Bell },
    ],
  },
  {
    title: "操作图标",
    icons: [
      { name: "Plus", icon: Plus },
      { name: "Minus", icon: Minus },
      { name: "Edit", icon: Edit },
      { name: "Trash2", icon: Trash2 },
      { name: "Copy", icon: Copy },
      { name: "Share2", icon: Share2 },
    ],
  },
  {
    title: "状态图标",
    icons: [
      { name: "Check", icon: Check },
      { name: "X", icon: X },
      { name: "Star", icon: Star },
      { name: "Heart", icon: Heart },
      { name: "Sun", icon: Sun },
      { name: "Moon", icon: Moon },
    ],
  },
  {
    title: "导航图标",
    icons: [
      { name: "ArrowLeft", icon: ArrowLeft },
      { name: "ArrowRight", icon: ArrowRight },
      { name: "ChevronLeft", icon: ChevronLeft },
      { name: "ChevronRight", icon: ChevronRight },
      { name: "Download", icon: Download },
      { name: "Upload", icon: Upload },
    ],
  },
  {
    title: "媒体图标",
    icons: [
      { name: "Camera", icon: Camera },
      { name: "ExternalLink", icon: ExternalLink },
      { name: "Github", icon: Github },
      { name: "Twitter", icon: Twitter },
      { name: "Linkedin", icon: Linkedin },
      { name: "Youtube", icon: Youtube },
    ],
  },
]

// 水墨禅意动画配置
const animeConfig = {
  easing: {
    inkSpread: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
    inkFade: "cubicBezier(0.4, 0, 0.2, 1)",
    inkFloat: "cubicBezier(0.34, 1.56, 0.64, 1)",
    inkSoft: "cubicBezier(0.4, 0, 0.6, 1)",
  },
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
}

function LucideDemo({
  size: initialSize = 20,
  strokeWidth: initialStrokeWidth = 1.5,
}: LucideDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const configRef = useRef<HTMLDivElement>(null)
  const groupsRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [size, setSize] = useState(initialSize)
  const [strokeWidth, setStrokeWidth] = useState(initialStrokeWidth)
  const hasSearchQuery = searchQuery.trim().length > 0

  // 根据搜索词过滤图标
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return iconGroups
    
    const query = searchQuery.toLowerCase()
    return iconGroups.map(group => ({
      ...group,
      icons: group.icons.filter(icon => 
        icon.name.toLowerCase().includes(query)
      )
    })).filter(group => group.icons.length > 0)
  }, [searchQuery])

  // 入场动画
  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: animeConfig.easing.inkFade },
    })

    tl.add(containerRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.98, 1],
      duration: animeConfig.duration.slow,
    })
    .add(titleRef.current, {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: animeConfig.duration.normal,
    }, "-=300")
    .add(configRef.current, {
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: animeConfig.duration.normal,
    }, "-=200")
    .add(".icon-group", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: animeConfig.duration.normal,
      delay: stagger(80),
    }, "-=200")
    .add(".icon-item", {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: animeConfig.duration.normal,
      delay: stagger(20, { grid: [6, 5], from: "center" }),
    }, "-=400")
    .add(".footer-info", {
      opacity: [0, 1],
      duration: animeConfig.duration.normal,
    }, "-=300")

    return () => {
      remove(containerRef.current)
      remove(titleRef.current)
      remove(configRef.current)
      remove(".icon-group")
      remove(".icon-item")
      remove(".footer-info")
    }
  }, [])

  // 搜索变化时的动画
  useEffect(() => {
    animate(".icon-item", {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: animeConfig.duration.normal,
      delay: stagger(10),
      ease: animeConfig.easing.inkFade,
    })
  }, [filteredGroups])

  // 参数变化时的动画
  useEffect(() => {
    animate(".icon-wrapper svg", {
      scale: [0.8, 1],
      duration: animeConfig.duration.normal,
      ease: animeConfig.easing.inkFloat,
    })
  }, [size, strokeWidth])

  const handleIconEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const iconWrapper = target.querySelector(".icon-wrapper")
    const iconBg = target.querySelector(".icon-bg")
    const iconLine = target.querySelector(".icon-line")
    const iconLabel = target.querySelector(".icon-label")

    remove([iconWrapper, iconBg, iconLine, iconLabel])

    const tl = createTimeline({ defaults: { duration: animeConfig.duration.fast } })
    tl.add(iconWrapper, {
      scale: 1.2,
      rotate: "5deg",
      ease: animeConfig.easing.inkFloat,
    })
    tl.add(iconBg, {
      opacity: [0, 0.6],
      scale: [0.5, 1.5],
      ease: animeConfig.easing.inkSpread,
      duration: animeConfig.duration.normal,
    }, 0)
    tl.add(iconLine, {
      width: [0, 24],
      opacity: [0, 0.6],
      ease: animeConfig.easing.inkSoft,
      duration: animeConfig.duration.normal,
    }, 0)
    tl.add(iconLabel, {
      color: "#333333",
      ease: animeConfig.easing.inkSoft,
    }, 0)
  }, [])

  const handleIconLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const iconWrapper = target.querySelector(".icon-wrapper")
    const iconBg = target.querySelector(".icon-bg")
    const iconLine = target.querySelector(".icon-line")
    const iconLabel = target.querySelector(".icon-label")

    remove([iconWrapper, iconBg, iconLine, iconLabel])

    const tl = createTimeline({ defaults: { duration: animeConfig.duration.fast } })
    tl.add(iconWrapper, {
      scale: 1,
      rotate: "0deg",
      ease: animeConfig.easing.inkSoft,
    })
    tl.add(iconBg, {
      opacity: 0,
      scale: 1,
      ease: animeConfig.easing.inkFade,
    }, 0)
    tl.add(iconLine, {
      width: 0,
      opacity: 0,
      ease: animeConfig.easing.inkSoft,
    }, 0)
    tl.add(iconLabel, {
      color: "#999999",
      ease: animeConfig.easing.inkSoft,
    }, 0)
  }, [])

  const handleIconClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement("span")
    ripple.className = "absolute rounded-full bg-zhusha/20 pointer-events-none"
    ripple.style.left = `${x - 25}px`
    ripple.style.top = `${y - 25}px`
    ripple.style.width = "50px"
    ripple.style.height = "50px"
    target.appendChild(ripple)

    const tl = createTimeline()
    tl.add(ripple, {
      scale: [0, 2],
      opacity: [0.5, 0],
      ease: animeConfig.easing.inkSpread,
      duration: animeConfig.duration.slow,
      onComplete: () => ripple.remove(),
    })

    const iconWrapper = target.querySelector(".icon-wrapper")
    tl.add(iconWrapper, {
      scale: [1.2, 1.1],
      ease: animeConfig.easing.inkFloat,
      duration: animeConfig.duration.fast,
    }, 0)
  }, [])

  const totalFilteredIcons = filteredGroups.reduce((acc, g) => acc + g.icons.length, 0)

  return (
    <div
      ref={containerRef}
      className="p-6 bg-paper border-2 border-ink/15 rounded-ink-lg shadow-ink max-w-3xl mx-auto opacity-0"
    >
      {/* 标题区域 */}
      <div
        ref={titleRef}
        className="mb-6 text-center pb-6 border-b-2 border-ink/10 opacity-0"
      >
        <h2 className="text-2xl font-display font-bold text-ink-deep mb-2">
          Lucide Icons
        </h2>
        <p className="text-ink-medium text-sm">
          开源、轻量、可定制的 SVG 图标库
        </p>
        <a
          href="https://lucide.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-sm text-zhusha hover:text-haitang transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          访问官网 lucide.dev
        </a>
      </div>

      {/* 搜索框 */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-light" />
          <input
            type="text"
            placeholder="搜索图标..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-paper border border-ink/10 rounded-ink text-ink-thick placeholder:text-ink-light focus:outline-none focus:border-zhusha/50 focus:ring-2 focus:ring-zhusha/10 transition-all"
          />
          {hasSearchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink-thick transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {hasSearchQuery && (
          <p className="mt-2 text-xs text-ink-light">
            找到 {totalFilteredIcons} 个图标
          </p>
        )}
      </div>

      {/* 配置控制面板 */}
      <div
        ref={configRef}
        className="mb-6 p-5 bg-ink-pale rounded-lg border border-ink/10 opacity-0"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-ink-medium uppercase tracking-wider font-medium">
            配置参数
          </div>
          <button
            onClick={() => {
              setSize(initialSize)
              setStrokeWidth(initialStrokeWidth)
            }}
            className="text-xs text-zhusha hover:text-haitang transition-colors"
          >
            重置默认值
          </button>
        </div>

        {/* 尺寸控制 */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-ink-thick">图标尺寸 (size)</label>
            <span className="text-sm font-mono text-ink-medium">{size}px</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSize(Math.max(12, size - 2))}
              className="p-1.5 rounded bg-paper border border-ink/10 hover:border-zhusha/50 transition-colors"
            >
              <MinusIcon className="w-4 h-4 text-ink-thick" />
            </button>
            <input
              type="range"
              min="12"
              max="48"
              step="2"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="flex-1 h-2 bg-ink-200 rounded-lg appearance-none cursor-pointer accent-zhusha"
            />
            <button
              onClick={() => setSize(Math.min(48, size + 2))}
              className="p-1.5 rounded bg-paper border border-ink/10 hover:border-zhusha/50 transition-colors"
            >
              <PlusIcon className="w-4 h-4 text-ink-thick" />
            </button>
          </div>
        </div>

        {/* 线宽控制 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-ink-thick">线条粗细 (strokeWidth)</label>
            <span className="text-sm font-mono text-ink-medium">{strokeWidth}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStrokeWidth(Math.max(0.5, strokeWidth - 0.5))}
              className="p-1.5 rounded bg-paper border border-ink/10 hover:border-zhusha/50 transition-colors"
            >
              <MinusIcon className="w-4 h-4 text-ink-thick" />
            </button>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="flex-1 h-2 bg-ink-200 rounded-lg appearance-none cursor-pointer accent-zhusha"
            />
            <button
              onClick={() => setStrokeWidth(Math.min(3, strokeWidth + 0.5))}
              className="p-1.5 rounded bg-paper border border-ink/10 hover:border-zhusha/50 transition-colors"
            >
              <PlusIcon className="w-4 h-4 text-ink-thick" />
            </button>
          </div>
        </div>

        {/* 快捷预设 */}
        <div className="mt-4 pt-4 border-t border-ink/10">
          <div className="text-xs text-ink-medium mb-2">快捷预设</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSize(16); setStrokeWidth(1) }}
              className="px-3 py-1.5 text-xs bg-paper border border-ink/10 rounded hover:border-zhusha/50 transition-colors"
            >
              紧凑 (16/1)
            </button>
            <button
              onClick={() => { setSize(20); setStrokeWidth(1.5) }}
              className="px-3 py-1.5 text-xs bg-paper border border-ink/10 rounded hover:border-zhusha/50 transition-colors"
            >
              默认 (20/1.5)
            </button>
            <button
              onClick={() => { setSize(24); setStrokeWidth(2) }}
              className="px-3 py-1.5 text-xs bg-paper border border-ink/10 rounded hover:border-zhusha/50 transition-colors"
            >
              醒目 (24/2)
            </button>
            <button
              onClick={() => { setSize(32); setStrokeWidth(2.5) }}
              className="px-3 py-1.5 text-xs bg-paper border border-ink/10 rounded hover:border-zhusha/50 transition-colors"
            >
              大号 (32/2.5)
            </button>
          </div>
        </div>
      </div>

      {/* 图标分组 */}
      <div ref={groupsRef} className="space-y-8">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12 text-ink-medium">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>未找到匹配的图标</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 px-4 py-2 text-sm text-zhusha hover:text-haitang transition-colors"
            >
              清除搜索
            </button>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div
              key={group.title}
              className="icon-group pb-6 border-b border-ink/10 last:border-0 last:pb-0 opacity-0"
            >
              <h3 className="text-sm font-semibold text-ink-thick mb-4 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-zhusha mr-2"></span>
                {group.title}
                <span className="ml-2 text-xs text-ink-light font-normal">
                  ({group.icons.length})
                </span>
              </h3>
              <div className="grid grid-cols-6 gap-3">
                {group.icons.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="icon-item relative flex flex-col items-center p-4 rounded-lg bg-paper border border-ink/8 cursor-pointer group overflow-hidden opacity-0"
                    title={name}
                    onMouseEnter={handleIconEnter}
                    onMouseLeave={handleIconLeave}
                    onClick={handleIconClick}
                  >
                    <div className="icon-bg absolute inset-0 bg-gradient-radial from-zhusha/10 to-transparent opacity-0 rounded-lg" />
                    <div className="icon-wrapper relative z-10">
                      <Icon
                        size={size}
                        strokeWidth={strokeWidth}
                        className="text-ink-thick group-hover:text-zhusha transition-colors duration-200"
                      />
                    </div>
                    <span className="icon-label relative z-10 text-xs text-ink-light mt-3 truncate w-full text-center font-mono">
                      {name}
                    </span>
                    <div className="icon-line absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-zhusha/40 w-0 opacity-0" />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 底部信息 */}
      <div className="footer-info mt-8 pt-4 border-t-2 border-ink/10 text-center text-sm text-ink-medium opacity-0">
        共展示{" "}
        <span className="font-semibold text-ink-thick">
          {totalFilteredIcons}
        </span>{" "}
        个图标 · Lucide 共有{" "}
        <span className="font-semibold text-ink-thick">1671+</span> 图标
        <span className="mx-2">·</span>
        <a
          href="https://lucide.dev/icons/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zhusha hover:text-haitang transition-colors inline-flex items-center gap-1"
        >
          浏览全部图标
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}

export default LucideDemo
