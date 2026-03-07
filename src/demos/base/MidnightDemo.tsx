import { useState, useRef, useEffect } from "react"

interface MidnightDemoProps {
	variant?: "basic" | "multi" | "gradient"
}

function MidnightDemo({ variant = "basic" }: MidnightDemoProps) {
	const [activeStyle, setActiveStyle] = useState("default")
	const [activeSection, setActiveSection] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const navItems = [
		{ name: "首页", style: "default" },
		{ name: "关于", style: "light" },
		{ name: "作品", style: "ink" },
		{ name: "联系", style: "zhusha" },
	]

	const scrollToSection = (index: number) => {
		if (!scrollContainerRef.current) return
		const sectionHeight = 500
		scrollContainerRef.current.scrollTo({
			top: sectionHeight * index,
			behavior: "smooth",
		})
		setActiveSection(index)
	}

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (!scrollContainerRef.current) return

		const scrollContainer = scrollContainerRef.current
		const sections = scrollContainer.querySelectorAll("[data-midnight]")
		
		const handleScroll = () => {
			const scrollTop = scrollContainer.scrollTop
			const sectionHeight = 500
			const currentIndex = Math.round(scrollTop / sectionHeight)
			setActiveSection(currentIndex)
			
			const currentSection = sections[currentIndex]
			if (currentSection) {
				const style = currentSection.getAttribute("data-midnight") || "default"
				setActiveStyle(style)
			}
		}

		scrollContainer.addEventListener("scroll", handleScroll)
		handleScroll()

		return () => scrollContainer.removeEventListener("scroll", handleScroll)
	}, [])

	const getNavStyle = () => {
		switch (activeStyle) {
			case "light":
				return {
					background: "linear-gradient(180deg, rgba(250, 248, 245, 0.95) 0%, rgba(245, 243, 240, 0.9) 100%)",
					color: "#2c2c2c",
					boxShadow: "0 2px 20px rgba(44, 44, 44, 0.08), inset 0 -1px 0 rgba(44, 44, 44, 0.05)",
					borderBottom: "1px solid rgba(44, 44, 44, 0.08)",
				}
			case "ink":
				return {
					background: "linear-gradient(180deg, rgba(26, 26, 26, 0.95) 0%, rgba(44, 44, 44, 0.9) 100%)",
					color: "#faf8f5",
					boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
					borderBottom: "none",
				}
			case "zhusha":
				return {
					background: "linear-gradient(135deg, rgba(200, 60, 60, 0.95) 0%, rgba(160, 50, 50, 0.9) 100%)",
					color: "#faf8f5",
					boxShadow: "0 4px 30px rgba(200, 60, 60, 0.3)",
					borderBottom: "none",
				}
			default:
				return {
					background: "linear-gradient(180deg, rgba(44, 44, 44, 0.95) 0%, rgba(74, 74, 74, 0.9) 50%, rgba(44, 44, 44, 0.95) 100%)",
					color: "#faf8f5",
					boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
					borderBottom: "none",
				}
		}
	}

	const getButtonStyle = (isActive: boolean) => {
		const baseStyle = "relative px-4 py-2 transition-all duration-500 group"
		
		if (isActive) {
			return {
				className: `${baseStyle} text-current`,
				indicator: "#c83c3c",
				bg: "rgba(255, 255, 255, 0.1)",
			}
		}
		
		return {
			className: `${baseStyle} text-current/60 hover:text-current/90`,
			indicator: "transparent",
			bg: "transparent",
		}
	}

	return (
		<div className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden">
			{/* 水墨纹理装饰 */}
			<div className="absolute top-0 right-0 w-40 h-40 opacity-[0.02] pointer-events-none">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					<circle cx="80" cy="20" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-ink-deep" />
					<circle cx="80" cy="20" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-ink-deep" />
				</svg>
			</div>
			
			{/* 印章装饰 */}
			<div className="absolute bottom-8 right-8 w-12 h-12 opacity-10 pointer-events-none">
				<div className="w-full h-full rounded-sm border-2 border-zhusha flex items-center justify-center">
					<span className="text-zhusha text-xs font-bold" style={{ fontFamily: "serif" }}>墨</span>
				</div>
			</div>

			<div
				className={`transition-all duration-700 ease-out ${
					isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
				}`}
			>
				{/* 标题区域 */}
				<div className="mb-8 text-center pb-6 border-b border-ink/10 relative">
					<div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-zhusha/30 to-transparent" />
					
					<h2 className="text-xl font-display font-semibold text-ink-deep mb-1.5 tracking-wider">
						Midnight.js
					</h2>
					<p className="text-ink-medium text-sm tracking-wide">让导航栏变色优雅到极致的调色师</p>
					<a
						href="https://aerolab.github.io/midnight.js"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 mt-3 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300"
					>
						<span>aerolab.github.io/midnight.js</span>
					</a>
				</div>

				{/* 核心特性 */}
				<div className="mb-6">
					<h3 className="text-xs font-medium text-ink-medium mb-3 tracking-wide">核心特性</h3>
					<div className="grid grid-cols-2 gap-3 text-xs text-ink-light">
						<div className="flex items-center gap-2">
							<span className="text-zhusha">•</span>
							<span>智能切换导航栏样式</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-zhusha">•</span>
							<span>轻量级 (~3KB)</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-zhusha">•</span>
							<span>基于 jQuery</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-zhusha">•</span>
							<span>流畅过渡效果</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-zhusha">•</span>
							<span>高度可定制</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-zhusha">•</span>
							<span>多导航支持</span>
						</div>
					</div>
				</div>

				{/* 演示区域 */}
				<div className="relative">
					<div
						ref={scrollContainerRef}
						className="h-[500px] border border-ink/10 rounded-xl overflow-y-auto relative"
						style={{ scrollBehavior: "smooth" }}
					>
						{/* 固定导航栏 */}
						<div
							className="sticky top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-500"
							style={getNavStyle()}
						>
							<div className="font-bold text-lg tracking-widest relative" style={{ fontFamily: "serif" }}>
								<span className="relative z-10">墨韵</span>
								<span className="absolute -right-3 -top-1 w-2 h-2 rounded-full bg-zhusha/80" />
							</div>
							<div className="flex gap-2 text-sm tracking-widest" style={{ fontFamily: "serif" }}>
								{navItems.map((item, index) => {
									const isActive = activeSection === index
									const btnStyle = getButtonStyle(isActive)
									return (
										<button
											key={item.name}
											onClick={() => scrollToSection(index)}
											className={btnStyle.className}
										>
											<span className="relative z-10">{item.name}</span>
											{isActive && (
												<>
													<span 
														className="absolute inset-0 rounded backdrop-blur-sm" 
														style={{ background: btnStyle.bg }}
													/>
													<span 
														className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
														style={{ background: btnStyle.indicator }}
													/>
													<span 
														className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
														style={{ background: btnStyle.indicator, opacity: 0.6 }}
													/>
												</>
											)}
											<span className="absolute inset-0 bg-white/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										</button>
									)
								})}
							</div>
						</div>

						{/* 区域 1 - 默认样式：水墨渐变 */}
						<div
							className="h-full flex items-center justify-center relative overflow-hidden"
							data-midnight="default"
							style={{
								background: "linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 50%, #2c2c2c 100%)",
							}}
						>
							{/* 水墨晕染效果 */}
							<div className="absolute inset-0 opacity-20">
								<div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-white/10 to-transparent blur-3xl" />
								<div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-radial from-white/5 to-transparent blur-2xl" />
							</div>
							
							<div className="text-center text-white relative z-10">
								<div className="text-6xl mb-4 opacity-80">山</div>
								<h3 className="text-2xl font-bold mb-2 tracking-widest" style={{ fontFamily: "serif" }}>水墨意境</h3>
								<p className="text-sm opacity-70 tracking-wide">默认导航栏样式</p>
							</div>
						</div>

						{/* 区域 2 - 宣纸白样式 */}
						<div
							className="h-full flex items-center justify-center relative overflow-hidden"
							data-midnight="light"
							style={{
								background: "linear-gradient(180deg, #faf8f5 0%, #f5f3f0 100%)",
							}}
						>
							{/* 宣纸纹理 */}
							<div className="absolute inset-0 opacity-30">
								<div className="absolute inset-0" style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								}} />
							</div>
							
							<div className="text-center text-ink-deep relative z-10">
								<div className="text-6xl mb-4 opacity-60">云</div>
								<h3 className="text-2xl font-bold mb-2 tracking-widest" style={{ fontFamily: "serif" }}>宣纸留白</h3>
								<p className="text-sm opacity-60 tracking-wide">浅色导航栏样式</p>
							</div>
						</div>

						{/* 区域 3 - 浓墨样式 */}
						<div
							className="h-full flex items-center justify-center relative overflow-hidden"
							data-midnight="ink"
							style={{
								background: "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 50%, #1a1a1a 100%)",
							}}
						>
							{/* 墨点装饰 */}
							<div className="absolute inset-0 opacity-10">
								<div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-white blur-3xl" />
								<div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-white blur-2xl" />
							</div>
							
							<div className="text-center text-white relative z-10">
								<div className="text-6xl mb-4 opacity-90">月</div>
								<h3 className="text-2xl font-bold mb-2 tracking-widest" style={{ fontFamily: "serif" }}>浓墨深沉</h3>
								<p className="text-sm opacity-70 tracking-wide">深色导航栏样式</p>
							</div>
						</div>

						{/* 区域 4 - 朱砂样式 */}
						<div
							className="h-full flex items-center justify-center relative overflow-hidden"
							data-midnight="zhusha"
							style={{
								background: "linear-gradient(135deg, #c83c3c 0%, #a03232 100%)",
							}}
						>
							{/* 印章纹理 */}
							<div className="absolute inset-0 opacity-10">
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-white rounded-sm transform rotate-12" />
							</div>
							
							<div className="text-center text-white relative z-10">
								<div className="text-6xl mb-4 opacity-90">印</div>
								<h3 className="text-2xl font-bold mb-2 tracking-widest" style={{ fontFamily: "serif" }}>朱砂印章</h3>
								<p className="text-sm opacity-80 tracking-wide">朱砂导航栏样式</p>
							</div>
						</div>
					</div>

					{/* 状态提示 */}
					<div className="mt-4 p-4 bg-paper-warm/50 border border-ink/10 rounded-lg relative">
						<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-zhusha/30 to-transparent" />
						
						<div className="text-xs text-ink-light text-center">
							<p className="mb-1">滚动查看导航栏样式切换效果</p>
							<p className="text-ink-medium font-medium">
								当前样式：{activeStyle === "default" ? "水墨" : activeStyle === "light" ? "宣纸" : activeStyle === "ink" ? "浓墨" : "朱砂"}
							</p>
						</div>
					</div>
				</div>

				{/* 特性卡片 */}
				<div className="mt-8 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						<div className="p-4 bg-paper-warm/50 rounded-lg border border-ink/5 relative overflow-hidden group hover:border-zhusha/20 transition-all duration-300">
							<div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-zhusha/20 opacity-0 group-hover:opacity-100 transition-opacity" />
							<div className="text-lg font-display font-semibold text-zhusha mb-1">~3KB</div>
							<div className="text-xs text-ink-light">压缩体积</div>
						</div>
						<div className="p-4 bg-paper-warm/50 rounded-lg border border-ink/5 relative overflow-hidden group hover:border-zhusha/20 transition-all duration-300">
							<div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-zhusha/20 opacity-0 group-hover:opacity-100 transition-opacity" />
							<div className="text-lg font-display font-semibold text-zhusha mb-1">jQuery</div>
							<div className="text-xs text-ink-light">依赖库</div>
						</div>
						<div className="p-4 bg-paper-warm/50 rounded-lg border border-ink/5 relative overflow-hidden group hover:border-zhusha/20 transition-all duration-300">
							<div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-zhusha/20 opacity-0 group-hover:opacity-100 transition-opacity" />
							<div className="text-lg font-display font-semibold text-zhusha mb-1">自动</div>
							<div className="text-xs text-ink-light">智能切换</div>
						</div>
						<div className="p-4 bg-paper-warm/50 rounded-lg border border-ink/5 relative overflow-hidden group hover:border-zhusha/20 transition-all duration-300">
							<div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-zhusha/20 opacity-0 group-hover:opacity-100 transition-opacity" />
							<div className="text-lg font-display font-semibold text-zhusha mb-1">流畅</div>
							<div className="text-xs text-ink-light">过渡效果</div>
						</div>
					</div>
				</div>

				{/* 底部说明 */}
				<div
					className={`mt-6 pt-5 border-t border-ink/10 text-center text-xs text-ink-light transition-all duration-500 delay-500 ${
						isLoaded ? "opacity-100" : "opacity-0"
					}`}
				>
					<p className="tracking-wide">根据滚动位置自动切换导航栏样式，让导航栏与内容完美融合</p>
				</div>
			</div>
		</div>
	)
}

export default MidnightDemo
