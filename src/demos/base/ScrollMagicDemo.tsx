import { useEffect, useRef, useState, useCallback } from "react"
import Button from "../../components/base/Button"

interface ScrollMagicDemoProps {}

const ScrollMagicDemo: React.FC<ScrollMagicDemoProps> = () => {
	const [activeSection, setActiveSection] = useState(0)
	const [isAutoPlaying, setIsAutoPlaying] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const isAutoPlayingRef = useRef(false)
	const animationRef = useRef<number>()

	const sections = [
		{ id: 0, title: "首页", subtitle: "ScrollMagic" },
		{ id: 1, title: "文字飞入", subtitle: "Text Animation" },
		{ id: 2, title: "卡片层叠", subtitle: "Card Stack" },
		{ id: 3, title: "视差深度", subtitle: "Parallax" },
		{ id: 4, title: "形态变换", subtitle: "Morph" },
		{ id: 5, title: "完成", subtitle: "Complete" },
	]

	// 滚动到指定 section
	const scrollToSection = useCallback((index: number) => {
		const container = containerRef.current
		if (!container) return

		const sectionHeight = container.clientHeight
		container.scrollTo({
			top: index * sectionHeight,
			behavior: "smooth"
		})
	}, [])

	// 监听滚动
	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const handleScroll = () => {
			const scrollTop = container.scrollTop
			const sectionHeight = container.clientHeight
			const currentSection = Math.round(scrollTop / sectionHeight)
			setActiveSection(Math.max(0, Math.min(currentSection, sections.length - 1)))
		}

		container.addEventListener("scroll", handleScroll, { passive: true })
		return () => container.removeEventListener("scroll", handleScroll)
	}, [sections.length])

	// 自动演示
	const startAutoDemo = useCallback(() => {
		if (isAutoPlayingRef.current) return
		isAutoPlayingRef.current = true
		setIsAutoPlaying(true)

		let current = activeSection
		
		const next = () => {
			if (!isAutoPlayingRef.current) return
			
			current = (current + 1) % sections.length
			scrollToSection(current)
			
			if (current === sections.length - 1) {
				// 到达最后一页后停止
				setTimeout(() => {
					isAutoPlayingRef.current = false
					setIsAutoPlaying(false)
				}, 2000)
			} else {
				animationRef.current = window.setTimeout(next, 2500)
			}
		}

		animationRef.current = window.setTimeout(next, 2500)
	}, [activeSection, scrollToSection, sections.length])

	const stopAutoDemo = useCallback(() => {
		isAutoPlayingRef.current = false
		setIsAutoPlaying(false)
		if (animationRef.current) {
			clearTimeout(animationRef.current)
		}
	}, [])

	useEffect(() => {
		return () => stopAutoDemo()
	}, [stopAutoDemo])

	const progress = ((activeSection + 1) / sections.length) * 100

	return (
		<div className="w-full h-[520px] md:h-[620px] lg:h-[680px] max-h-[80vh] bg-slate-950 rounded-lg overflow-hidden relative">
			{/* CSS 动画 */}
			<style>{`
				.sm-demo-container {
					height: 100%;
					overflow-y: scroll;
					scroll-snap-type: y mandatory;
					scroll-behavior: smooth;
				}
				.sm-demo-container::-webkit-scrollbar {
					display: none;
				}
				.sm-demo-section {
					height: 100%;
					scroll-snap-align: start;
					scroll-snap-stop: always;
					flex-shrink: 0;
				}
				
				@keyframes fadeInUp {
					from { opacity: 0; transform: translateY(30px); }
					to { opacity: 1; transform: translateY(0); }
				}
				@keyframes slideInLeft {
					from { opacity: 0; transform: translateX(-50px); }
					to { opacity: 1; transform: translateX(0); }
				}
				@keyframes cardIn {
					from { opacity: 0; transform: translateY(40px) scale(0.9); }
					to { opacity: 1; transform: translateY(0) scale(1); }
				}
				@keyframes float {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-20px); }
				}
				@keyframes pulse {
					0%, 100% { transform: scale(1); opacity: 0.8; }
					50% { transform: scale(1.1); opacity: 1; }
				}
				@keyframes rotate {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				@keyframes morph {
					0%, 100% { border-radius: 20px; transform: rotate(0deg) scale(1); }
					50% { border-radius: 50%; transform: rotate(180deg) scale(1.15); }
				}
				@keyframes bounceIn {
					0% { opacity: 0; transform: scale(0.3); }
					50% { transform: scale(1.05); }
					70% { transform: scale(0.9); }
					100% { opacity: 1; transform: scale(1); }
				}
				
				.anim-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
				.anim-slideInLeft { animation: slideInLeft 0.5s ease-out forwards; }
				.anim-cardIn { animation: cardIn 0.5s ease-out forwards; }
				.anim-float { animation: float 3s ease-in-out infinite; }
				.anim-float-delay-1 { animation: float 4s ease-in-out infinite 0.5s; }
				.anim-float-delay-2 { animation: float 5s ease-in-out infinite 1s; }
				.anim-pulse { animation: pulse 2s ease-in-out infinite; }
				.anim-rotate { animation: rotate 20s linear infinite; }
				.anim-morph { animation: morph 6s ease-in-out infinite; }
				.anim-bounceIn { animation: bounceIn 0.6s ease-out forwards; }
			`}</style>

			{/* 顶部栏 */}
			<div className="absolute top-0 left-0 right-0 z-50 px-4 py-3 bg-gradient-to-b from-slate-950/80 to-transparent">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
							<span className="text-white text-sm">✨</span>
						</div>
						<div>
							<span className="text-white font-medium text-sm">ScrollMagic</span>
							<span className="text-white/40 text-xs ml-2">
								{activeSection + 1} / {sections.length}
							</span>
						</div>
					</div>
					<Button
						size="sm"
						variant="ghost"
						onClick={isAutoPlaying ? stopAutoDemo : startAutoDemo}
						className="text-white/70 hover:text-white text-xs"
					>
						{isAutoPlaying ? "⏸ 暂停" : "▶ 演示"}
					</Button>
				</div>
				
				{/* 进度条 */}
				<div className="mt-2 h-0.5 bg-white/10 rounded-full overflow-hidden">
					<div 
						className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			{/* 滚动容器 */}
			<div ref={containerRef} className="sm-demo-container">
				
				{/* Section 1: Hero */}
				<section className="sm-demo-section flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 relative">
					<div className="text-center px-6">
						<h1 className="text-4xl font-bold mb-2 anim-fadeInUp" style={{ 
							background: "linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #c084fc 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent"
						}}>
							ScrollMagic
						</h1>
						<p className="text-white/50 text-sm mb-8 anim-fadeInUp" style={{ animationDelay: "0.1s" }}>
							滚动动画的艺术
						</p>
						
						<div className="flex justify-center gap-8 anim-fadeInUp" style={{ animationDelay: "0.2s" }}>
							<div className="text-center">
								<div className="text-2xl font-bold text-white">6</div>
								<div className="text-xs text-white/40">动画效果</div>
							</div>
							<div className="w-px h-10 bg-white/10" />
							<div className="text-center">
								<div className="text-2xl font-bold text-white">60fps</div>
								<div className="text-xs text-white/40">流畅体验</div>
							</div>
							<div className="w-px h-10 bg-white/10" />
							<div className="text-center">
								<div className="text-2xl font-bold text-white">∞</div>
								<div className="text-xs text-white/40">创意可能</div>
							</div>
						</div>
					</div>
					
					<div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center anim-pulse">
						<div className="text-white/30 text-xs mb-2">向下滚动</div>
						<div className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto flex justify-center pt-2">
							<div className="w-1 h-2 bg-white/40 rounded-full" />
						</div>
					</div>
				</section>

				{/* Section 2: 文字飞入 */}
				<section className="sm-demo-section flex items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-900">
					<div className="px-6 max-w-md">
						<div className="mb-1 text-xs text-white/40">01</div>
						<h2 className="text-lg font-medium text-white/80 mb-8">文字飞入动画</h2>
						
						{[
							{ text: "精确控制", sub: "精确到每一帧", color: "#22d3ee" },
							{ text: "流畅过渡", sub: "自然的运动曲线", color: "#c084fc" },
							{ text: "性能优先", sub: "GPU硬件加速", color: "#fb923c" },
						].map((item, i) => (
							<div 
								key={i} 
								className="mb-6 anim-slideInLeft"
								style={{ animationDelay: `${i * 0.15}s` }}
							>
								<div className="flex items-baseline gap-3">
									<span className="text-2xl font-bold" style={{ color: item.color }}>
										{item.text}
									</span>
									<span className="text-white/40 text-sm">{item.sub}</span>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Section 3: 卡片层叠 */}
				<section className="sm-demo-section flex items-center justify-center bg-gradient-to-b from-rose-950 to-slate-900">
					<div className="px-6">
						<div className="mb-1 text-xs text-white/40">02</div>
						<h2 className="text-lg font-medium text-white/80 mb-8">卡片层叠动画</h2>
						
						<div className="flex gap-4">
							{[
								{ icon: "🎨", title: "视觉", color: "from-pink-500 to-rose-500" },
								{ icon: "⚡", title: "性能", color: "from-amber-500 to-orange-500" },
								{ icon: "🎯", title: "精准", color: "from-emerald-500 to-teal-500" },
							].map((card, i) => (
								<div
									key={i}
									className={`w-20 h-28 rounded-xl bg-gradient-to-br ${card.color} flex flex-col items-center justify-center shadow-lg anim-cardIn`}
									style={{ animationDelay: `${i * 0.1}s` }}
								>
									<span className="text-2xl">{card.icon}</span>
									<span className="text-white text-xs mt-1 font-medium">{card.title}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Section 4: 视差深度 */}
				<section className="sm-demo-section flex items-center justify-center bg-gradient-to-b from-violet-950 to-slate-900 relative overflow-hidden">
					<div className="absolute top-6 left-6 text-xs text-white/40">03</div>
					<h2 className="absolute top-6 left-12 text-lg font-medium text-white/80">视差深度效果</h2>
					
					{/* 浮动元素 */}
					<div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-xl top-1/4 left-1/4 anim-float" />
					<div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-xl bottom-1/3 right-1/4 anim-float-delay-1" />
					<div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-500/30 blur-xl top-1/3 right-1/3 anim-float-delay-2" />
					
					<div className="text-center z-10">
						<h3 className="text-xl font-bold text-white mb-2">视差深度</h3>
						<p className="text-white/40 text-xs">多层元素以不同速度移动</p>
						
						<div className="flex gap-6 mt-8">
							<div className="anim-float">
								<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg" />
							</div>
							<div className="anim-float-delay-1">
								<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg" />
							</div>
							<div className="anim-float-delay-2">
								<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg" />
							</div>
						</div>
					</div>
				</section>

				{/* Section 5: 形态变换 */}
				<section className="sm-demo-section flex items-center justify-center bg-gradient-to-b from-fuchsia-950 to-slate-900">
					<div className="text-center">
						<div className="mb-1 text-xs text-white/40">04</div>
						<h2 className="text-lg font-medium text-white/80 mb-8">形态变换动画</h2>
						
						<div className="relative w-32 h-32">
							{/* 轨道 */}
							<div className="absolute inset-0 border border-white/10 rounded-full anim-rotate" style={{ width: "140%", height: "140%", top: "-20%", left: "-20%" }} />
							
							{/* 变换元素 */}
							<div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 anim-morph flex items-center justify-center shadow-xl">
								<span className="text-4xl">🎭</span>
							</div>
						</div>
						
						<p className="text-white/40 text-xs mt-6">旋转 · 缩放 · 圆角变换</p>
					</div>
				</section>

				{/* Section 6: 完成 */}
				<section className="sm-demo-section flex items-center justify-center bg-gradient-to-b from-emerald-950 to-slate-900">
					<div className="text-center px-6">
						<div className="mb-1 text-xs text-white/40">05</div>
						
						<div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 anim-bounceIn">
							<span className="text-3xl">✨</span>
						</div>
						
						<h2 className="text-xl font-bold text-white mb-1 anim-fadeInUp" style={{ animationDelay: "0.3s" }}>演示完成</h2>
						<p className="text-white/40 text-xs mb-6 anim-fadeInUp" style={{ animationDelay: "0.4s" }}>
							ScrollMagic 让滚动动画变得优雅
						</p>
						
						<button 
							onClick={() => scrollToSection(0)}
							className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 text-xs transition-colors anim-fadeInUp"
							style={{ animationDelay: "0.5s" }}
						>
							重新开始
						</button>
					</div>
				</section>
			</div>

			{/* 右侧导航点 */}
			<div className="absolute right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
				{sections.map((_, index) => (
					<button
						key={index}
						onClick={() => {
							stopAutoDemo()
							scrollToSection(index)
						}}
						className={`w-2 h-2 rounded-full transition-all duration-200 ${
							activeSection === index 
								? "bg-white scale-125" 
								: "bg-white/30 hover:bg-white/50"
						}`}
					/>
				))}
			</div>
		</div>
	)
}

export default ScrollMagicDemo
