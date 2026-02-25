import React, { useEffect, useRef, useCallback } from "react"
import { createTimeline, stagger, remove } from "animejs"
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
  size = 20,
  strokeWidth = 1.5,
}: LucideDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const configRef = useRef<HTMLDivElement>(null)
  const groupsRef = useRef<HTMLDivElement>(null)

  // 入场动画
  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: animeConfig.easing.inkFade },
    })

    // 卡片整体淡入
    tl.add(containerRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.98, 1],
      duration: animeConfig.duration.slow,
    })

    // 标题区域
    .add(titleRef.current, {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: animeConfig.duration.normal,
    }, "-=300")

    // 配置信息
    .add(configRef.current, {
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: animeConfig.duration.normal,
    }, "-=200")

    // 图标分组依次入场
    .add(".icon-group", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: animeConfig.duration.normal,
      delay: stagger(80),
    }, "-=200")

    // 图标网格涟漪入场
    .add(".icon-item", {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: animeConfig.duration.normal,
      delay: stagger(20, { grid: [6, 5], from: "center" }),
    }, "-=400")

    // 底部信息
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

  // 图标悬停动画
  const handleIconEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const iconWrapper = target.querySelector(".icon-wrapper")
    const iconBg = target.querySelector(".icon-bg")
    const iconLine = target.querySelector(".icon-line")
    const iconLabel = target.querySelector(".icon-label")

    remove([iconWrapper, iconBg, iconLine, iconLabel])

    // 图标放大并轻微旋转
    const tl = createTimeline({ defaults: { duration: animeConfig.duration.fast } })
    tl.add(iconWrapper, {
      scale: 1.2,
      rotate: "5deg",
      ease: animeConfig.easing.inkFloat,
    })

    // 背景晕染扩散
    tl.add(iconBg, {
      opacity: [0, 0.6],
      scale: [0.5, 1.5],
      ease: animeConfig.easing.inkSpread,
      duration: animeConfig.duration.normal,
    }, 0)

    // 底部装饰线展开
    tl.add(iconLine, {
      width: [0, 24],
      opacity: [0, 0.6],
      ease: animeConfig.easing.inkSoft,
      duration: animeConfig.duration.normal,
    }, 0)

    // 文字颜色变化
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

  // 点击涟漪效果
  const handleIconClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 创建涟漪元素
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

    // 图标点击反馈
    const iconWrapper = target.querySelector(".icon-wrapper")
    tl.add(iconWrapper, {
      scale: [1.2, 1.1],
      ease: animeConfig.easing.inkFloat,
      duration: animeConfig.duration.fast,
    }, 0)
  }, [])

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
      </div>

      {/* 配置信息 */}
      <div
        ref={configRef}
        className="mb-6 p-4 bg-ink-pale rounded-lg border border-ink/10 opacity-0"
      >
        <div className="text-xs text-ink-medium mb-2 uppercase tracking-wider font-medium">
          当前配置
        </div>
        <div className="flex gap-6 text-sm text-ink-thick font-mono">
          <span>size: {size}px</span>
          <span>strokeWidth: {strokeWidth}</span>
        </div>
      </div>

      {/* 图标分组 */}
      <div ref={groupsRef} className="space-y-8">
        {iconGroups.map((group) => (
          <div
            key={group.title}
            className="icon-group pb-6 border-b border-ink/10 last:border-0 last:pb-0 opacity-0"
          >
            <h3 className="text-sm font-semibold text-ink-thick mb-4 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-zhusha mr-2"></span>
              {group.title}
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
                  {/* 水墨晕染背景 */}
                  <div className="icon-bg absolute inset-0 bg-gradient-radial from-zhusha/10 to-transparent opacity-0 rounded-lg" />

                  {/* 图标 */}
                  <div className="icon-wrapper relative z-10">
                    <Icon
                      size={size}
                      strokeWidth={strokeWidth}
                      className="text-ink-thick group-hover:text-zhusha transition-colors duration-200"
                    />
                  </div>

                  {/* 图标名称 */}
                  <span className="icon-label relative z-10 text-xs text-ink-light mt-3 truncate w-full text-center font-mono">
                    {name}
                  </span>

                  {/* 底部装饰线 */}
                  <div className="icon-line absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-zhusha/40 w-0 opacity-0" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 底部信息 */}
      <div className="footer-info mt-8 pt-4 border-t-2 border-ink/10 text-center text-sm text-ink-medium opacity-0">
        共展示{" "}
        <span className="font-semibold text-ink-thick">
          {iconGroups.reduce((acc, g) => acc + g.icons.length, 0)}
        </span>{" "}
        个图标 · Lucide 共有{" "}
        <span className="font-semibold text-ink-thick">1671+</span> 图标
      </div>
    </div>
  )
}

export default LucideDemo
