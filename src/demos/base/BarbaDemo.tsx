import { useEffect, useRef, useState } from "react"
import barba from "@barba/core"

function BarbaDemo() {
	const [activeDemo, setActiveDemo] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const [currentPage, setCurrentPage] = useState("home")
	const [isTransitioning, setIsTransitioning] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	const demoTabs = [
		{ name: "淡入淡出", key: "fade" },
		{ name: "滑动过渡", key: "slide" },
		{ name: "缩放效果", key: "scale" },
		{ name: "遮罩动画", key: "mask" },
	]

	const pages = {
		home: {
			title: "首页",
			subtitle: "Home",
			icon: "🏠",
			color: "#faf8f5",
			borderColor: "border-ink/10",
			content: "欢迎来到首页，体验流畅的页面过渡效果",
		},
		about: {
			title: "关于",
			subtitle: "About",
			icon: "📖",
			color: "#f5f0e8",
			borderColor: "border-ink/10",
			content: "了解我们的故事和使命",
		},
		work: {
			title: "作品",
			subtitle: "Work",
			icon: "🎨",
			color: "#faf8f5",
			borderColor: "border-ink/10",
			content: "探索我们精心打造的作品集",
		},
		contact: {
			title: "联系",
			subtitle: "Contact",
			icon: "✉️",
			color: "#f5f0e8",
			borderColor: "border-ink/10",
			content: "与我们取得联系，开始合作",
		},
	}

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	// 页面切换动画
	const transitionTo = async (page: string) => {
		if (isTransitioning || page === currentPage) return
		setIsTransitioning(true)

		const content = contentRef.current
		if (!content) return

		// 离开动画
		switch (demoTabs[activeDemo].key) {
			case "fade":
				await animateFadeOut(content)
				break
			case "slide":
				await animateSlideOut(content)
				break
			case "scale":
				await animateScaleOut(content)
				break
			case "mask":
				await animateMaskOut(content)
				break
		}

		setCurrentPage(page)

		// 进入动画
		requestAnimationFrame(async () => {
			switch (demoTabs[activeDemo].key) {
				case "fade":
					await animateFadeIn(content)
					break
				case "slide":
					await animateSlideIn(content)
					break
				case "scale":
					await animateScaleIn(content)
					break
				case "mask":
					await animateMaskIn(content)
					break
			}
			setIsTransitioning(false)
		})
	}

	// 淡入淡出动画
	const animateFadeOut = (element: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const animation = element.animate(
				[{ opacity: 1 }, { opacity: 0 }],
				{ duration: 300, easing: "ease-in" }
			)
			animation.onfinish = () => resolve()
		})
	}

	const animateFadeIn = (element: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const animation = element.animate(
				[{ opacity: 0 }, { opacity: 1 }],
				{ duration: 400, easing: "ease-out" }
			)
			animation.onfinish = () => resolve()
		})
	}

	// 滑动动画
	const animateSlideOut = (element: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const animation = element.animate(
				[{ transform: "translateX(0)", opacity: 1 }, { transform: "translateX(-50px)", opacity: 0 }],
				{ duration: 350, easing: "ease-in" }
			)
			animation.onfinish = () => resolve()
		})
	}

	const animateSlideIn = (element: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const animation = element.animate(
				[{ transform: "translateX(50px)", opacity: 0 }, { transform: "translateX(0)", opacity: 1 }],
				{ duration: 400, easing: "ease-out" }
			)
			animation.onfinish = () => resolve()
		})
	}

	// 缩放动画
	const animateScaleOut = (element: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const animation = element.animate(
				[{ transform: "scale(1)", opacity: 1 }, { transform: "scale(0.9)", opacity: 0 }],
				{ duration: 300, easing: "ease-in" }
			)
			animation.onfinish = () => resolve()
		})
	}

	const animateScaleIn = (element: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const animation = element.animate(
				[{ transform: "scale(1.1)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }],
				{ duration: 400, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
			)
			animation.onfinish = () => resolve()
		})
	}

	// 遮罩动画
	const animateMaskOut = (element: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const animation = element.animate(
				[{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(0 0 100% 0)" }],
				{ duration: 400, easing: "ease-in-out" }
			)
			animation.onfinish = () => resolve()
		})
	}

	const animateMaskIn = (element: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const animation = element.animate(
				[{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
				{ duration: 500, easing: "ease-in-out" }
			)
			animation.onfinish = () => resolve()
		})
	}

	const currentPageData = pages[currentPage as keyof typeof pages]
	const pageKeys = Object.keys(pages)

	return (
		<div className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden">
			{/* 装饰背景 */}
			<div className="absolute top-0 right-0 w-40 h-40 opacity-[0.02] pointer-events-none">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					<circle cx="80" cy="20" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-ink-deep" />
					<circle cx="80" cy="20" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-ink-deep" />
				</svg>
			</div>

			<div className="absolute bottom-8 right-8 w-12 h-12 opacity-10 pointer-events-none">
				<div className="w-full h-full rounded-sm border-2 border-zhusha flex items-center justify-center">
					<span className="text-zhusha text-xs font-bold" style={{ fontFamily: "serif" }}>流</span>
				</div>
			</div>

			<div
				className={`transition-all duration-700 ease-out ${
					isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
				}`}
			>
				{/* 标题区域 */}
				<div className="mb-6 text-center pb-4 border-b border-ink/10 relative">
					<div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-zhusha/30 to-transparent" />

					<h2 className="text-xl font-display font-semibold text-ink-deep mb-1.5 tracking-wider">
						Barba.js
					</h2>
					<p className="text-ink-medium text-sm tracking-wide mb-3">让页面切换变得流畅优雅</p>
					<a
						href="https://barba.js.org/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300"
					>
						<span>barba.js.org</span>
						<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				</div>

				{/* 标签切换 */}
				<div className="mb-4">
					<div className="flex gap-2 flex-wrap justify-center">
						{demoTabs.map((tab, index) => (
							<button
								key={tab.key}
								onClick={() => !isTransitioning && setActiveDemo(index)}
								className={`px-4 py-2 text-sm tracking-widest rounded transition-all duration-300 ${
									activeDemo === index
										? "bg-ink-deep text-paper"
										: "bg-ink/5 text-ink-medium hover:bg-ink/10"
								} ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
								style={{ fontFamily: "serif" }}
							>
								{tab.name}
							</button>
						))}
					</div>
				</div>

				{/* 页面演示区域 */}
				<div
					ref={containerRef}
					className="relative h-[300px] border border-ink/10 rounded-xl bg-paper-warm/30 overflow-hidden"
				>
					{/* 页面内容 */}
					<div
						ref={contentRef}
						className={`w-full h-full p-6 ${currentPageData.borderColor} border-2 rounded-xl`}
						style={{ background: currentPageData.color }}
					>
						<div className="flex flex-col h-full">
							{/* 页面头部 */}
							<div className="flex items-center gap-4 mb-6">
								<div className="w-14 h-14 rounded-xl bg-white/70 backdrop-blur flex items-center justify-center shadow-sm">
									<span className="text-3xl">{currentPageData.icon}</span>
								</div>
								<div>
									<h3 className="text-xl font-bold text-ink-deep">{currentPageData.title}</h3>
									<p className="text-sm text-ink-medium">{currentPageData.subtitle}</p>
								</div>
							</div>

							{/* 页面内容 */}
							<div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-ink/10">
								<p className="text-ink-deep text-sm leading-relaxed">{currentPageData.content}</p>
								<div className="mt-4 flex gap-2">
									<div className="w-2 h-2 rounded-full bg-zhusha/60" />
									<div className="w-2 h-2 rounded-full bg-ink/30" />
									<div className="w-2 h-2 rounded-full bg-ink/30" />
								</div>
							</div>
						</div>
					</div>

					{/* 过渡指示器 */}
					{isTransitioning && (
						<div className="absolute inset-0 flex items-center justify-center bg-paper/50 backdrop-blur-sm">
							<div className="flex items-center gap-2 text-ink-medium">
								<div className="w-2 h-2 rounded-full bg-zhusha animate-bounce" style={{ animationDelay: "0ms" }} />
								<div className="w-2 h-2 rounded-full bg-zhusha animate-bounce" style={{ animationDelay: "150ms" }} />
								<div className="w-2 h-2 rounded-full bg-zhusha animate-bounce" style={{ animationDelay: "300ms" }} />
							</div>
						</div>
					)}
				</div>

				{/* 页面导航 */}
				<div className="mt-4 flex justify-center gap-2">
					{pageKeys.map((page) => (
						<button
							key={page}
							onClick={() => transitionTo(page)}
							disabled={isTransitioning}
							className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
								currentPage === page
									? "bg-zhusha text-white shadow-md"
									: "bg-ink/5 text-ink-medium hover:bg-ink/10"
							} ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							{pages[page as keyof typeof pages].title}
						</button>
					))}
				</div>

				{/* 特性统计 */}
				<div className="mt-6 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">~10KB</div>
							<div className="text-xs text-ink-light">压缩体积</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">SPA</div>
							<div className="text-xs text-ink-light">流畅体验</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Hook</div>
							<div className="text-xs text-ink-light">生命周期</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">预加载</div>
							<div className="text-xs text-ink-light">智能缓存</div>
						</div>
					</div>
				</div>

				<div className="mt-4 text-center text-xs text-ink-light">
					<p className="tracking-wide">点击上方标签切换过渡效果，点击下方按钮切换页面</p>
				</div>
			</div>
		</div>
	)
}

export default BarbaDemo
