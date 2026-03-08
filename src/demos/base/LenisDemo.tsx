import { useEffect, useRef, useState } from "react"
import { DemoLayout } from "../components/DemoLayout"

type DemoTab = "smooth" | "animation" | "anchor"

interface TabItem {
  id: DemoTab
  label: string
  description: string
}

const demoTabs: TabItem[] = [
  { id: "smooth", label: "平滑滚动", description: "基础平滑效果" },
  { id: "animation", label: "滚动动画", description: "配合 GSAP 动画" },
  { id: "anchor", label: "锚点导航", description: "滚动锚点定位" },
]

/** 水墨诗词内容 */
const inkPoems = [
  {
    title: "山居秋暝",
    content: "空山新雨后，天气晚来秋。明月松间照，清泉石上流。",
    author: "王维",
  },
  {
    title: "鸟鸣涧",
    content: "人闲桂花落，夜静春山空。月出惊山鸟，时鸣春涧中。",
    author: "王维",
  },
  {
    title: "鹿柴",
    content: "空山不见人，但闻人语响。返景入深林，复照青苔上。",
    author: "王维",
  },
  {
    title: "江雪",
    content: "千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。",
    author: "柳宗元",
  },
  {
    title: "登鹳雀楼",
    content: "白日依山尽，黄河入海流。欲穷千里目，更上一层楼。",
    author: "王之涣",
  },
]

function LenisDemo() {
  const [activeTab, setActiveTab] = useState<DemoTab>("smooth")
  const lenisRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 初始化 Lenis
  useEffect(() => {
    if (typeof window === "undefined") return

    let lenis: any = null

    const initLenis = async () => {
      try {
        // @ts-ignore - Lenis 模块导出类型
        const LenisLib = await import("lenis")
        const Lenis = LenisLib.default || LenisLib

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        })

        lenisRef.current = lenis

        function raf(time: number) {
          lenis?.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch (error) {
        console.error("Failed to initialize Lenis:", error)
      }
    }

    initLenis()

    return () => {
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  // Tab 2: GSAP ScrollTrigger 动画
  useEffect(() => {
    if (activeTab !== "animation") return
    if (!lenisRef.current) return

    let gsapInstance: any = null

    const initAnimation = async () => {
      try {
        // @ts-ignore - GSAP 模块导出类型
        const gsapModule = await import("gsap")
        // @ts-ignore - GSAP 默认导出
        const gsap = gsapModule.gsap || (gsapModule.default && gsapModule.default.gsap) || gsapModule.default

        if (!gsap) return

        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        // 同步 Lenis 和 ScrollTrigger
        lenisRef.current.on("scroll", ScrollTrigger.update)

        gsap.ticker.add((time: number) => {
          lenisRef.current?.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        gsapInstance = gsap

        // 等待 DOM 渲染后设置动画
        setTimeout(() => {
          const cards = document.querySelectorAll(".animation-card")
          cards.forEach((card) => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            })
          })
        }, 100)
      } catch (error) {
        console.error("Failed to initialize GSAP animation:", error)
      }
    }

    initAnimation()

    return () => {
      if (gsapInstance) {
        gsapInstance.globalTimeline.clear()
      }
    }
  }, [activeTab])

  const features = [
    { icon: "🌀", name: "~5KB", desc: "轻量体积" },
    { icon: "📜", name: "3 种", desc: "演示模式" },
    { icon: "🔗", name: "GSAP", desc: "完美结合" },
    { icon: "📱", name: "100%", desc: "移动端支持" },
  ]

  const tabs = demoTabs.map((t) => ({ name: t.label, key: t.id }))

  // Tab 1: 平滑滚动内容
  const renderSmoothContent = () => (
    <div
      ref={containerRef}
      className="space-y-6 p-6 overflow-y-auto h-[320px] pr-2"
      style={{ scrollBehavior: "auto" }}
    >
      {inkPoems.map((poem, index) => (
        <div
          key={index}
          className="p-5 bg-gradient-to-r from-paper-warm/60 to-paper/60 rounded-xl border border-ink/10 hover:border-zhusha/20 hover:shadow-ink-hover transition-all duration-300 group"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zhusha/20 to-zhusha/5 flex items-center justify-center border border-zhusha/20 flex-shrink-0 group-hover:scale-110 transition-transform">
              <span className="text-zhusha font-semibold">{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-ink-deep mb-1">{poem.title}</h3>
              <p className="text-ink-medium text-sm leading-relaxed mb-2">{poem.content}</p>
              <span className="text-xs text-ink-light">—— {poem.author}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center py-8 border-t border-ink/10 mt-4">
        <p className="text-ink-light text-sm">向下滚动体验丝滑效果 ↑</p>
      </div>
    </div>
  )

  // Tab 2: 滚动动画内容
  const renderAnimationContent = () => (
    <div className="space-y-12 p-6 overflow-y-auto h-[320px] pr-2">
      {[
        { title: "水墨初现", desc: "当元素进入视图时，淡淡的水墨晕染效果缓缓展开" },
        { title: "气韵生动", desc: "如宣纸上的墨迹，由浓转淡，由浅入深" },
        { title: "虚实相生", desc: "实则，虚之。动与静的完美平衡" },
        { title: "留白意境", desc: "于空白处见天地，于运动中见禅意" },
      ].map((item, i) => (
        <div
          key={i}
          className="animation-card opacity-0 translate-y-8 p-6 bg-gradient-to-r from-paper-warm to-paper rounded-xl border border-ink/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zhusha/10 flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-zhusha rounded-full" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink-deep">{item.title}</h3>
              <p className="text-ink-medium text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center py-8 border-t border-ink/10">
        <p className="text-ink-light text-sm">向下滚动触发水墨晕染动画 ↑</p>
      </div>
    </div>
  )

  // Tab 3: 锚点导航内容
  const renderAnchorContent = () => {
    const sections = [
      { id: "section-1", title: "引言", content: "水墨哲学的现代诠释——在数字世界中寻找东方的静谧与深邃。留白不是空白，而是气的流动，是意的延展。" },
      { id: "section-2", title: "理念", content: "计白当黑，黑白相生。设计中的每一处空白都有其存在的意义，如同山水画中的虚实关系。" },
      { id: "section-3", title: "实践", content: "将水墨精神融入现代界面设计，让用户在浏览时感受东方美学的韵味与禅意。" },
      { id: "section-4", title: "总结", content: "回归本真，寻找平衡。在快节奏的数字生活中，打造一方静谧的精神家园。" },
    ]

    const scrollToSection = (id: string) => {
      const element = document.getElementById(id)
      if (element && lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      } else if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }

    return (
      <div className="h-[320px] overflow-y-auto">
        {/* 固定导航栏 */}
        <div className="sticky top-0 z-10 bg-paper/95 backdrop-blur-sm border-b border-ink/10 p-3">
          <div className="flex gap-2 justify-center flex-wrap">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="px-3 py-1.5 text-xs text-ink-medium hover:text-zhusha hover:bg-zhusha/5 rounded transition-all duration-200"
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* 可滚动内容区 */}
        <div className="p-4 space-y-4">
          {sections.map((s) => (
            <section
              id={s.id}
              key={s.id}
              className="min-h-[180px] p-5 bg-paper-warm/30 rounded-xl border border-ink/5"
            >
              <h2 className="text-lg font-semibold text-ink-deep mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-zhusha rounded-full" />
                {s.title}
              </h2>
              <p className="text-ink-medium text-sm leading-relaxed">{s.content}</p>
            </section>
          ))}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "smooth":
        return renderSmoothContent()
      case "animation":
        return renderAnimationContent()
      case "anchor":
        return renderAnchorContent()
      default:
        return null
    }
  }

  return (
    <DemoLayout
      title="Lenis 平滑滚动"
      subtitle="行云流水 · 丝滑体验"
      tabs={tabs}
      activeTab={demoTabs.findIndex((t) => t.id === activeTab)}
      onTabChange={(index) => setActiveTab(demoTabs[index].id)}
      features={features}
    >
      <div className="relative">
        {/* 演示区域 */}
        <div className="relative border-2 border-ink/10 rounded-xl overflow-hidden shadow-inner bg-paper-warm/20">
          {renderContent()}
        </div>

        {/* 提示 */}
        <div className="mt-4 p-3 bg-paper-warm/60 border border-ink/10 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 text-xs text-ink-medium">
            <svg className="w-4 h-4 text-zhusha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {activeTab === "smooth" && "尝试滚动页面，感受丝滑的惯性效果"}
              {activeTab === "animation" && "向下滚动，元素将以水墨晕染效果入场"}
              {activeTab === "anchor" && "点击上方导航，平滑滚动到对应章节"}
            </span>
          </div>
        </div>
      </div>
    </DemoLayout>
  )
}

export default LenisDemo