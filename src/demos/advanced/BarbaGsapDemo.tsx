import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

function BarbaGsapDemo() {
	const [activeDemo, setActiveDemo] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const [currentPage, setCurrentPage] = useState("home")
	const [isTransitioning, setIsTransitioning] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null)
	const overlayRef = useRef<HTMLDivElement>(null)

	const demoTabs = [
		{ name: "水墨晕染", key: "ink" },
		{ name: "分屏滑动", key: "split" },
		{ name: "3D翻转", key: "flip" },
		{ name: "圆形展开", key: "circle" },
	]

	const pages = {
		home: {
			title: "首页",
			subtitle: "Home",
			icon: "🏠",
			color: "from-amber-50 to-orange-50",
			borderColor: "border-amber-200",
			content: "欢迎来到首页，体验 Barba.js + GSAP 的高级过渡效果",
			accent: "#f59e0b",
		},
		about: {
			title: "关于",
			subtitle: "About",
			icon: "📖",
			color: "from-blue-50 to-cyan-50",
			borderColor: "border-blue-200",
			content: "了解我们的故事和使命，探索更多可能",
			accent: "#3b82f6",
		},
		work: {
			title: "作品",
			subtitle: "Work",
			icon: "🎨",
			color: "from-purple-50 to-pink-50",
			borderColor: "border-purple-200",
			content: "探索我们精心打造的作品集，感受设计之美",
			accent: "#a855f7",
		},
		contact: {
			title: "联系",
			subtitle: "Contact",
			icon: "✉️",
			color: "from-emerald-50 to-teal-50",
			borderColor: "border-emerald-200",
			content: "与我们取得联系，开始一段美好的合作",
			accent: "#10b981",
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
		const overlay = overlayRef.current
		if (!content || !overlay) return

		// 离开动画
		switch (demoTabs[activeDemo].key) {
			case "ink":
				await animateInkOut(content, overlay)
				break
			case "split":
				await animateSplitOut(content, overlay)
				break
			case "flip":
				await animateFlipOut(content, overlay)
				break
			case "circle":
				await animateCircleOut(content, overlay)
				break
		}

		setCurrentPage(page)

		// 进入动画
		requestAnimationFrame(async () => {
			switch (demoTabs[activeDemo].key) {
				case "ink":
					await animateInkIn(content, overlay)
					break
				case "split":
					await animateSplitIn(content, overlay)
					break
				case "flip":
					await animateFlipIn(content, overlay)
					break
				case "circle":
					await animateCircleIn(content, overlay)
					break
			}
			setIsTransitioning(false)
		})
	}

	// 水墨晕染效果
	const animateInkOut = (content: HTMLElement, overlay: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: () => resolve(),
			})

			// 创建水墨扩散效果
			tl.to(content, {
				duration: 0.8,
				ease: "power2.inOut",
			})
			.to(overlay, {
				duration: 0.6,
				opacity: 1,
				ease: "power2.in",
			}, "-=0.4")
			.to(content, {
				duration: 0.4,
				opacity: 0,
				scale: 1.1,
				filter: "blur(10px)",
				ease: "power2.in",
			}, "-=0.6")
		})
	}

	const animateInkIn = (content: HTMLElement, overlay: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: () => resolve(),
			})

			// 重置状态
			gsap.set(content, { opacity: 0, scale: 0.9, filter: "blur(20px)" })

			tl.to(overlay, {
				duration: 0.4,
				opacity: 0,
				ease: "power2.out",
			})
			.to(content, {
				duration: 0.8,
				opacity: 1,
				scale: 1,
				filter: "blur(0px)",
				ease: "power2.out",
			}, "-=0.2")
		})
	}

	// 分屏滑动效果
	const animateSplitOut = (content: HTMLElement, overlay: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: () => resolve(),
			})

			tl.to(content.querySelectorAll(".split-left"), {
				duration: 0.5,
				x: "-100%",
				ease: "power3.in",
			})
			.to(content.querySelectorAll(".split-right"), {
				duration: 0.5,
				x: "100%",
				ease: "power3.in",
			}, "<")
			.to(content, {
				duration: 0.3,
				opacity: 0,
				ease: "power2.in",
			}, "-=0.2")
		})
	}

	const animateSplitIn = (content: HTMLElement, overlay: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: () => resolve(),
			})

			// 重置状态
			gsap.set(content, { opacity: 1 })
			gsap.set(content.querySelectorAll(".split-left"), { x: "-100%" })
			gsap.set(content.querySelectorAll(".split-right"), { x: "100%" })

			tl.to(content.querySelectorAll(".split-left"), {
				duration: 0.6,
				x: "0%",
				ease: "power3.out",
			})
			.to(content.querySelectorAll(".split-right"), {
				duration: 0.6,
				x: "0%",
				ease: "power3.out",
			}, "<")
		})
	}

	// 3D翻转效果
	const animateFlipOut = (content: HTMLElement, overlay: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: () => resolve(),
			})

			tl.to(content, {
				duration: 0.6,
				rotateY: -90,
				opacity: 0,
				transformOrigin: "center center",
				ease: "power2.in",
			})
		})
	}

	const animateFlipIn = (content: HTMLElement, overlay: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: () => resolve(),
			})

			// 重置状态
			gsap.set(content, { rotateY: 90, opacity: 0 })

			tl.to(content, {
				duration: 0.7,
				rotateY: 0,
				opacity: 1,
				transformOrigin: "center center",
				ease: "power2.out",
			})
		})
	}

	// 圆形展开效果
	const animateCircleOut = (content: HTMLElement, overlay: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: () => resolve(),
			})

			tl.to(content, {
				duration: 0.7,
				clipPath: "circle(0% at 50% 50%)",
				ease: "power2.inOut",
			})
		})
	}

	const animateCircleIn = (content: HTMLElement, overlay: HTMLElement): Promise<void> => {
		return new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: () => resolve(),
			})

			// 重置状态
			gsap.set(content, { clipPath: "circle(0% at 50% 50%)" })

			tl.to(content, {
				duration: 0.8,
				clipPath: "circle(150% at 50% 50%)",
				ease: "power2.out",
			})
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
					<span className="text-zhusha text-xs font-bold" style={{ fontFamily: "serif" }}>动</span>
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
						Barba.js + GSAP
					</h2>
					<p className="text-ink-medium text-sm tracking-wide mb-3">高级页面过渡动画组合</p>
					<div className="flex justify-center gap-4 text-xs text-ink-medium">
						<a
							href="https://barba.js.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 hover:text-zhusha transition-colors duration-300"
						>
							<span>barba.js.org</span>
							<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
						<span className="text-ink/30">|</span>
						<a
							href="https://greensock.com/gsap/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 hover:text-zhusha transition-colors duration-300"
						>
							<span>greensock.com</span>
							<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
					</div>
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
				<div className="relative h-[320px] border border-ink/10 rounded-xl bg-paper-warm/30 overflow-hidden" style={{ perspective: "1000px" }}>
					{/* 遮罩层 */}
					<div
						ref={overlayRef}
						className="absolute inset-0 bg-ink-deep/20 pointer-events-none z-10 opacity-0"
					/>

					{/* 页面内容 */}
					<div
						ref={contentRef}
						className={`w-full h-full p-6 bg-gradient-to-br ${currentPageData.color} ${currentPageData.borderColor} border-2 rounded-xl`}
						style={{ transformStyle: "preserve-3d" }}
					>
						<div className="flex flex-col h-full">
							{/* 页面头部 - 分屏动画元素 */}
							<div className="flex items-center gap-4 mb-6 split-left">
								<div className="w-14 h-14 rounded-xl bg-white/70 backdrop-blur flex items-center justify-center shadow-sm">
									<span className="text-3xl">{currentPageData.icon}</span>
								</div>
								<div className="split-right">
									<h3 className="text-xl font-bold text-ink-deep">{currentPageData.title}</h3>
									<p className="text-sm text-ink-medium">{currentPageData.subtitle}</p>
								</div>
							</div>

							{/* 页面内容 */}
							<div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-ink/10">
								<p className="text-ink-deep text-sm leading-relaxed">
									{currentPageData.content}
								</p>
								<div className="mt-4 flex gap-2">
									<div className="w-8 h-1 rounded-full" style={{ backgroundColor: currentPageData.accent }} />
									<div className="w-4 h-1 rounded-full bg-ink/20" />
									<div className="w-2 h-1 rounded-full bg-ink/20" />
								</div>
							</div>

							{/* 装饰元素 */}
							<div className="mt-4 flex justify-between items-center split-right">
								<div className="flex gap-2">
									{[1, 2, 3].map((i) => (
										<div
											key={i}
											className="w-2 h-2 rounded-full"
											style={{ backgroundColor: currentPageData.accent, opacity: i * 0.3 }}
										/>
										))}
								</div>
								<span className="text-xs text-ink-light">GSAP Powered</span>
							</div>
						</div>
					</div>

					{/* 过渡指示器 */}
					{isTransitioning && (
						<div className="absolute inset-0 flex items-center justify-center bg-paper/30 backdrop-blur-sm z-20">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-zhusha animate-pulse" />
								<span className="text-sm text-ink-medium">Transitioning...</span>
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
							<div className="text-lg font-display font-semibold text-zhusha mb-1">GSAP</div>
							<div className="text-xs text-ink-light">专业动画</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Timeline</div>
							<div className="text-xs text-ink-light">时间轴控制</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">3D</div>
							<div className="text-xs text-ink-light">立体效果</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Clip</div>
							<div className="text-xs text-ink-light">遮罩动画</div>
						</div>
					</div>
				</div>

				<div className="mt-4 text-center text-xs text-ink-light">
					<p className="tracking-wide">Barba.js 负责页面切换逻辑，GSAP 负责动画执行，完美组合</p>
				</div>
			</div>
		</div>
	)
}

export default BarbaGsapDemo
