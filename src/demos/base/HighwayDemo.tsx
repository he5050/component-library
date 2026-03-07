import { useState, useCallback, useEffect, useRef } from "react"
import Button from "../../components/base/Button"
import { useDemoRuntime } from "./hooks/useDemoRuntime"

interface HighwayDemoProps {}

// 页面类型
type PageType = "home" | "about" | "work" | "contact"

// 页面配置 - 国风配色
const PAGES: Record<PageType, { title: string; subtitle: string; color: string; icon: string; glow: string; border: string }> = {
	home: { title: "首页", subtitle: "Home", color: "from-purple-50 to-purple-100", icon: "🏠", glow: "rgba(147, 112, 219, 0.15)", border: "border-purple-200" },
	about: { title: "关于", subtitle: "About", color: "from-blue-50 to-cyan-50", icon: "👤", glow: "rgba(59, 130, 246, 0.15)", border: "border-blue-200" },
	work: { title: "作品", subtitle: "Work", color: "from-orange-50 to-rose-50", icon: "💼", glow: "rgba(249, 115, 22, 0.15)", border: "border-orange-200" },
	contact: { title: "联系", subtitle: "Contact", color: "from-emerald-50 to-teal-50", icon: "✉️", glow: "rgba(16, 185, 129, 0.15)", border: "border-emerald-200" },
}

// 过渡类型
type TransitionType = "fade" | "slide" | "scale" | "flip"

const TRANSITIONS: Record<TransitionType, { name: string; description: string }> = {
	fade: { name: "淡入淡出", description: "Opacity + blur + scale" },
	slide: { name: "滑动", description: "Slide with fade mask" },
	scale: { name: "缩放", description: "Elastic scale" },
	flip: { name: "翻转", description: "3D flip with depth" },
}

const HighwayDemo: React.FC<HighwayDemoProps> = () => {
	const [currentPage, setCurrentPage] = useState<PageType>("home")
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [transitionType, setTransitionType] = useState<TransitionType>("fade")
	const [direction, setDirection] = useState<"next" | "prev">("next")
	const [isExiting, setIsExiting] = useState(false)
	const [isAutoPlaying, setIsAutoPlaying] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null)
	const touchStartX = useRef(0)
	const autoRunIdRef = useRef<number | null>(null)
	const transitionTimerRefs = useRef<ReturnType<typeof setTimeout>[]>([])
	const {
		isRunActive,
		beginRun,
		stopRun,
		setRunTimer,
	} = useDemoRuntime()

	// 页面索引
	const pageKeys: PageType[] = ["home", "about", "work", "contact"]
	const currentIndex = pageKeys.indexOf(currentPage)

	/** 记录页面切换中的短时定时器，便于统一清理。 */
	const setTransitionTimer = useCallback((callback: () => void, delay: number) => {
		const timer = window.setTimeout(() => {
			transitionTimerRefs.current = transitionTimerRefs.current.filter((id) => id !== timer)
			callback()
		}, delay)
		transitionTimerRefs.current.push(timer)
		return timer
	}, [])

	/** 清理页面切换相关定时器。 */
	const clearTransitionTimers = useCallback(() => {
		transitionTimerRefs.current.forEach((timer) => clearTimeout(timer))
		transitionTimerRefs.current = []
	}, [])

	// 页面切换
	const navigateTo = useCallback((page: PageType, dir: "next" | "prev" = "next") => {
		if (isTransitioning || page === currentPage) return

		setIsExiting(true)
		setIsTransitioning(true)
		setDirection(dir)

		// 退出动画
		setTransitionTimer(() => {
			setCurrentPage(page)
			setIsExiting(false)
			// 进入动画
			setTransitionTimer(() => {
				setIsTransitioning(false)
			}, 50)
		}, 380)
	}, [currentPage, isTransitioning, setTransitionTimer])

	// 获取下一个页面
	const getNextPage = useCallback((): PageType => {
		const currentIndex = pageKeys.indexOf(currentPage)
		return pageKeys[(currentIndex + 1) % pageKeys.length]
	}, [currentPage])

	// 获取上一个页面
	const getPrevPage = useCallback((): PageType => {
		const currentIndex = pageKeys.indexOf(currentPage)
		return pageKeys[(currentIndex - 1 + pageKeys.length) % pageKeys.length]
	}, [currentPage])

	const stopAutoDemo = useCallback(() => {
		const runId = autoRunIdRef.current
		autoRunIdRef.current = null
		if (runId !== null && isRunActive(runId)) {
			stopRun()
		}
		setIsAutoPlaying(false)
	}, [isRunActive, stopRun])

	// 自动演示
	const startAutoDemo = useCallback(() => {
		if (isAutoPlaying) {
			stopAutoDemo()
			return
		}

		const runId = beginRun()
		autoRunIdRef.current = runId
		setIsAutoPlaying(true)

		let current = pageKeys.indexOf(currentPage)
		const run = () => {
			if (!isRunActive(runId)) return
			current = (current + 1) % pageKeys.length
			navigateTo(pageKeys[current], "next")
			setRunTimer(runId, run, 3000)
		}

		setRunTimer(runId, run, 3000)
	}, [isAutoPlaying, stopAutoDemo, beginRun, pageKeys, currentPage, isRunActive, navigateTo, setRunTimer])

	// 键盘控制
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isTransitioning) return
			if (e.key === "ArrowLeft") {
				navigateTo(getPrevPage(), "prev")
			} else if (e.key === "ArrowRight") {
				navigateTo(getNextPage(), "next")
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [isTransitioning, navigateTo, getPrevPage, getNextPage])

	// 触摸控制
	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX
	}

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (isTransitioning) return
		const diff = touchStartX.current - e.changedTouches[0].clientX
		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				navigateTo(getNextPage(), "next")
			} else {
				navigateTo(getPrevPage(), "prev")
			}
		}
	}

	useEffect(() => {
		return () => {
			stopAutoDemo()
			clearTransitionTimers()
		}
	}, [stopAutoDemo, clearTransitionTimers])

	// 获取过渡动画类名 - 增强版
	const getTransitionClass = () => {
		if (!isTransitioning) return "opacity-100 scale-100 blur-0"

		const base = isExiting ? "opacity-0" : "opacity-100"

		switch (transitionType) {
			case "fade":
				return `${base} scale-[0.95] blur-[8px]`
			case "slide":
				return direction === "next"
					? `${base} translate-x-16`
					: `${base} -translate-x-16`
			case "scale":
				return `${base} scale-[0.85]`
			case "flip":
				return direction === "next"
					? `${base} rotate-y-[90deg]`
					: `${base} -rotate-y-[90deg]`
			default:
				return `${base} opacity-0`
		}
	}

	// 获取内容动画延迟 - 交错动画
	const getContentDelay = (index: number) => ({
		animationDelay: `${index * 0.08 + 0.15}s`,
	})

	const currentPageData = PAGES[currentPage]

	// 获取底部背景光晕颜色
	const getGlowStyle = () => ({
		background: `radial-gradient(ellipse at center bottom, ${currentPageData.glow} 0%, transparent 70%)`,
	})

	return (
		<div
			className="w-full h-full bg-[#f5f5f0] rounded-2xl overflow-hidden relative border border-ink-200"
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			{/* CSS 动画定义 - 精致细腻版 */}
			<style>{`
				@keyframes fadeInUp {
					from { opacity: 0; transform: translateY(24px); filter: blur(8px); }
					to { opacity: 1; transform: translateY(0); filter: blur(0); }
				}
				@keyframes slideIn {
					from { opacity: 0; transform: translateX(40px); }
					to { opacity: 1; transform: translateX(0); }
				}
				@keyframes scaleIn {
					0% { opacity: 0; transform: scale(0.8); }
					70% { opacity: 1; transform: scale(1.02); }
					100% { opacity: 1; transform: scale(1); }
				}
				@keyframes flipIn {
					from { opacity: 0; transform: perspective(600px) rotateY(90deg); }
					to { opacity: 1; transform: perspective(600px) rotateY(0); }
				}
				@keyframes float {
					0%, 100% { transform: translateY(0) rotate(0deg); }
					25% { transform: translateY(-8px) rotate(1deg); }
					75% { transform: translateY(-12px) rotate(-1deg); }
				}
				@keyframes pulse {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.7; transform: scale(1.1); }
				}
				@keyframes dotPulse {
					0%, 100% { transform: scale(1); opacity: 1; }
					50% { transform: scale(1.3); opacity: 0.8; }
				}
				@keyframes progressBar {
					from { transform: scaleX(0); }
					to { transform: scaleX(1); }
				}
				@keyframes shimmer {
					0% { transform: translateX(-100%); }
					100% { transform: translateX(100%); }
				}
				@keyframes iconPop {
					0% { transform: scale(0.5); opacity: 0; }
					60% { transform: scale(1.1); }
					100% { transform: scale(1); opacity: 1; }
				}

				.anim-fadeInUp { animation: fadeInUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
				.anim-slideIn { animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
				.anim-scaleIn { animation: scaleIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
				.anim-flipIn { animation: flipIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
				.anim-float { animation: float 4s ease-in-out infinite; }
				.anim-pulse { animation: pulse 2s ease-in-out infinite; }
				.anim-dotPulse { animation: dotPulse 1.5s ease-in-out infinite; }
				.anim-progress { animation: progressBar 0.38s linear forwards; transform-origin: left; }
				.anim-shimmer { animation: shimmer 1s ease-in-out infinite; }
				.anim-iconPop { animation: iconPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

				.transition-content {
					transition: all 0.38s cubic-bezier(0.16, 1, 0.3, 1);
				}

				/* 卡片光晕效果 - 国风 */
				.card-glow {
					box-shadow:
						0 4px 16px rgba(26, 25, 23, 0.08),
						0 1px 4px rgba(26, 25, 23, 0.04),
						inset 0 1px 0 rgba(255, 255, 255, 0.8);
				}

				/* 按钮悬浮效果 */
				.nav-btn {
					transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
				}
				.nav-btn:active {
					transform: scale(0.92);
				}

				/* 点状指示器 */
				.dot-indicator {
					transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
				}
			`}</style>

			{/* 底部动态光晕 */}
			<div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={getGlowStyle()} />

			{/* 顶部导航栏 - 国风 */}
			<div className="absolute top-0 left-0 right-0 z-50 px-5 py-3 bg-gradient-to-b from-[#f5f5f0]/95 via-[#f5f5f0]/80 to-transparent">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a1917] to-[#33312c] flex items-center justify-center shadow-md">
							<span className="text-white text-sm">🛣️</span>
						</div>
						<div>
							<span className="text-ink-deep font-medium text-sm tracking-wide">Highway.js</span>
							<span className="text-ink-light text-xs ml-2">页面过渡</span>
						</div>
					</div>

					{/* 过渡类型选择 - 国风胶囊样式 */}
					<div className="flex items-center gap-2">
						<span className="text-ink-light text-[11px]">过渡:</span>
						<div className="flex gap-0.5 bg-ink-100 rounded-lg p-0.5">
							{(Object.keys(TRANSITIONS) as TransitionType[]).map((type) => (
								<button
									key={type}
									onClick={() => setTransitionType(type)}
									className={`px-2.5 py-1 text-[11px] rounded-md font-medium transition-all duration-200 ${
										transitionType === type
											? "bg-ink-deep text-white shadow-sm"
											: "text-ink-medium hover:text-ink-deep hover:bg-ink-200"
									}`}
								>
									{TRANSITIONS[type].name}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* 主内容区 */}
			<div className="h-full pt-20 pb-24 px-5 flex items-center justify-center">
				<div
					ref={contentRef}
					className={`w-full max-w-sm transition-content ${getTransitionClass()}`}
					style={{ perspective: "1000px" }}
				>
					{/* 页面卡片 - 国风版本 */}
					<div
						className={`relative rounded-2xl bg-gradient-to-br ${currentPageData.color} p-6 card-glow overflow-hidden border ${currentPageData.border}`}
					>
						{/* 卡片高光层 */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent pointer-events-none" />

						{/* 页面图标 - 国风立体感 */}
						<div className="w-14 h-14 rounded-xl bg-white/60 backdrop-blur flex items-center justify-center mb-4 anim-iconPop shadow-sm">
							<span className="text-3xl">{currentPageData.icon}</span>
						</div>

						{/* 页面标题 */}
						<h1
							className={`text-2xl font-bold text-ink-deep mb-1 tracking-tight ${
								transitionType === "fade"
									? "anim-fadeInUp"
									: transitionType === "slide"
										? "anim-slideIn"
										: transitionType === "scale"
											? "anim-scaleIn"
											: "anim-flipIn"
							}`}
						>
							{currentPageData.title}
						</h1>

						<p
							className="text-ink-medium text-sm mb-4 font-medium tracking-wide anim-fadeInUp"
							style={{ animationDelay: "0.08s" }}
						>
							{currentPageData.subtitle}
						</p>

						{/* 页面内容 - 国风卡片样式 */}
						<div className="space-y-2">
							{currentPage === "home" && (
								<>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 anim-fadeInUp border border-ink-200/50" style={getContentDelay(0)}>
										<div className="text-ink-deep text-sm font-medium flex items-center gap-2">
											<span>🚀</span> 快速导航
										</div>
										<div className="text-ink-light text-xs mt-1">体验流畅的页面过渡效果</div>
									</div>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 anim-fadeInUp border border-ink-200/50" style={getContentDelay(1)}>
										<div className="text-ink-deep text-sm font-medium flex items-center gap-2">
											<span>⚡</span> 高性能
										</div>
										<div className="text-ink-light text-xs mt-1">预加载和缓存机制</div>
									</div>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 anim-fadeInUp border border-ink-200/50" style={getContentDelay(2)}>
										<div className="text-ink-deep text-sm font-medium flex items-center gap-2">
											<span>🎨</span> 动画友好
										</div>
										<div className="text-ink-light text-xs mt-1">支持自定义过渡动画</div>
									</div>
								</>
							)}

							{currentPage === "about" && (
								<>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 anim-fadeInUp border border-ink-200/50" style={getContentDelay(0)}>
										<div className="text-ink-deep text-sm font-medium flex items-center gap-2">
											<span>📖</span> 关于我们
										</div>
										<div className="text-ink-light text-xs mt-1">专业的开发团队</div>
									</div>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 anim-fadeInUp border border-ink-200/50" style={getContentDelay(1)}>
										<div className="text-ink-deep text-sm font-medium flex items-center gap-2">
											<span>🎯</span> 我们的使命
										</div>
										<div className="text-ink-light text-xs mt-1">创造卓越的用户体验</div>
									</div>
								</>
							)}

							{currentPage === "work" && (
								<>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 anim-fadeInUp border border-ink-200/50" style={getContentDelay(0)}>
										<div className="text-ink-deep text-sm font-medium flex items-center gap-2">
											<span>🎨</span> 设计作品
										</div>
										<div className="text-ink-light text-xs mt-1">精美的视觉设计</div>
									</div>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 anim-fadeInUp border border-ink-200/50" style={getContentDelay(1)}>
										<div className="text-ink-deep text-sm font-medium flex items-center gap-2">
											<span>💻</span> 开发项目
										</div>
										<div className="text-ink-light text-xs mt-1">高质量的前端实现</div>
									</div>
								</>
							)}

							{currentPage === "contact" && (
								<>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 anim-fadeInUp border border-ink-200/50" style={getContentDelay(0)}>
										<div className="text-ink-deep text-sm font-medium flex items-center gap-2">
											<span>📧</span> 电子邮件
										</div>
										<div className="text-ink-light text-xs mt-1">hello@example.com</div>
									</div>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 anim-fadeInUp border border-ink-200/50" style={getContentDelay(1)}>
										<div className="text-ink-deep text-sm font-medium flex items-center gap-2">
											<span>📱</span> 社交媒体
										</div>
										<div className="text-ink-light text-xs mt-1">关注我们的最新动态</div>
									</div>
								</>
							)}
						</div>
					</div>

					{/* 过渡指示器 - 国风进度条 */}
					{isTransitioning && (
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-ink-200 rounded-b-2xl overflow-hidden">
							<div
								className="h-full bg-ink-deep anim-progress"
								style={{
									background: `linear-gradient(90deg, ${currentPageData.glow}, rgba(26, 25, 23, 0.6))`,
								}}
							/>
						</div>
					)}
				</div>
			</div>

			{/* 底部导航 - 国风版 */}
			<div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-[#f5f5f0]/95 via-[#f5f5f0]/80 to-transparent">
				<div className="flex items-center justify-between">
					{/* 点状指示器 + 页码 */}
					<div className="flex items-center gap-3">
						{/* 点状指示器 */}
						<div className="flex gap-1.5">
							{pageKeys.map((page, index) => (
								<button
									key={page}
									onClick={() => navigateTo(page, index > currentIndex ? "next" : "prev")}
									disabled={isTransitioning}
									className={`dot-indicator w-2 h-2 rounded-full transition-all ${
										currentPage === page
											? "bg-ink-deep w-6 rounded-full"
											: "bg-ink-300 hover:bg-ink-400"
									}`}
								/>
							))}
						</div>
						{/* 页码 */}
						<span className="text-ink-light text-xs font-medium ml-1">
							{currentIndex + 1}/{pageKeys.length}
						</span>
					</div>

					{/* 导航控制 - 国风胶囊按钮 */}
					<div className="flex items-center gap-1">
						<Button
							size="sm"
							variant="ghost"
							onClick={() => navigateTo(getPrevPage(), "prev")}
							disabled={isTransitioning}
							className="nav-btn w-8 h-8 rounded-lg text-ink-medium hover:text-ink-deep hover:bg-ink-100"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</Button>

						<Button
							size="sm"
							variant="ghost"
							onClick={startAutoDemo}
							className={`nav-btn px-3 h-8 rounded-lg text-xs font-medium transition-all ${
								isAutoPlaying
									? "bg-ink-deep text-white"
									: "text-ink-medium hover:text-ink-deep hover:bg-ink-100"
							}`}
						>
							{isAutoPlaying ? (
								<>
									<svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
										<rect x="6" y="4" width="4" height="16" rx="1" />
										<rect x="14" y="4" width="4" height="16" rx="1" />
									</svg>
									暂停
								</>
							) : (
								<>
									<svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8 5v14l11-7z" />
									</svg>
									演示
								</>
							)}
						</Button>

						<Button
							size="sm"
							variant="ghost"
							onClick={() => navigateTo(getNextPage(), "next")}
							disabled={isTransitioning}
							className="nav-btn w-8 h-8 rounded-lg text-ink-medium hover:text-ink-deep hover:bg-ink-100"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HighwayDemo
