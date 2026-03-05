import { useState, useRef, useEffect } from "react"

type DemoVariant = "mountain" | "window" | "seal"

interface DemoTab {
	id: DemoVariant
	label: string
	description: string
}

const demoTabs: DemoTab[] = [
	{ id: "mountain", label: "山水层叠", description: "水墨山水意境" },
	{ id: "window", label: "窗棂景深", description: "中式园林窗景" },
	{ id: "seal", label: "印章浮动", description: "朱砂印章效果" },
]

function ParallaxDemo() {
	const [activeTab, setActiveTab] = useState<DemoVariant>("mountain")
	const sceneRef = useRef<HTMLDivElement>(null)
	const parallaxRef = useRef<any>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (!sceneRef.current || typeof window === "undefined") return

		const initParallax = async () => {
			try {
				const Parallax = (await import("parallax-js")).default

				const configs: Record<DemoVariant, any> = {
					mountain: { relativeInput: true, scalarX: 8, scalarY: 6, frictionX: 0.12, frictionY: 0.12 },
					window: { relativeInput: true, scalarX: 10, scalarY: 8, frictionX: 0.1, frictionY: 0.1 },
					seal: { relativeInput: true, scalarX: 6, scalarY: 6, frictionX: 0.15, frictionY: 0.15 },
				}

				if (parallaxRef.current) {
					parallaxRef.current.destroy()
					parallaxRef.current = null
				}

				await new Promise(resolve => setTimeout(resolve, 50))

				if (sceneRef.current) {
					parallaxRef.current = new Parallax(sceneRef.current, configs[activeTab])
				}
			} catch (error) {
				console.error("Failed to load parallax-js:", error)
			}
		}

		initParallax()

		return () => {
			if (parallaxRef.current) {
				parallaxRef.current.destroy()
				parallaxRef.current = null
			}
		}
	}, [activeTab])

	const renderDemoContent = () => {
		switch (activeTab) {
			case "mountain":
				return (
					<>
						{/* 背景层 - 宣纸渐变 */}
						<div className="absolute inset-0 bg-gradient-to-b from-paper via-paper-warm to-paper rounded-xl"></div>

						{/* 水墨晕染背景 (depth: 0.02) - 最慢 */}
						<div className="absolute inset-0" data-depth="0.02">
							<div className="absolute top-8 right-16 w-32 h-32 bg-ink/3 rounded-full blur-3xl"></div>
							<div className="absolute bottom-12 left-12 w-24 h-24 bg-ink/2 rounded-full blur-2xl"></div>
						</div>

						{/* 远山层 (depth: 0.05) - 最远景 */}
						<div className="absolute inset-0 rounded-xl overflow-hidden" data-depth="0.05">
							<svg className="absolute bottom-0 left-0 w-full h-48 text-dai/20" viewBox="0 0 1200 200" preserveAspectRatio="none">
								<path d="M0,100 Q150,50 300,120 T600,100 T900,130 T1200,90 L1200,200 L0,200 Z" fill="currentColor" />
							</svg>
						</div>

						{/* 中山层 (depth: 0.1) - 中景 */}
						<div className="absolute inset-0 rounded-xl overflow-hidden" data-depth="0.1">
							<svg className="absolute bottom-0 left-0 w-full h-40 text-mogray/30" viewBox="0 0 1200 200" preserveAspectRatio="none">
								<path d="M0,120 Q200,60 400,140 T800,110 T1200,130 L1200,200 L0,200 Z" fill="currentColor" />
							</svg>
						</div>

						{/* 近山层 (depth: 0.15) - 近景 */}
						<div className="absolute inset-0 rounded-xl overflow-hidden" data-depth="0.15">
							<svg className="absolute bottom-0 left-0 w-full h-32 text-ink/40" viewBox="0 0 1200 200" preserveAspectRatio="none">
								<path d="M0,140 Q250,80 500,150 T1000,130 T1200,150 L1200,200 L0,200 Z" fill="currentColor" />
							</svg>
						</div>

						{/* 飞鸟 (depth: 0.2) */}
						<div className="absolute top-16 left-20" data-depth="0.2">
							<svg className="w-8 h-4 text-ink-medium/60" viewBox="0 0 32 16" fill="currentColor">
								<path d="M0,8 Q8,0 16,8 Q24,0 32,8" stroke="currentColor" strokeWidth="1.5" fill="none" />
							</svg>
						</div>
						<div className="absolute top-20 right-32" data-depth="0.18">
							<svg className="w-6 h-3 text-ink-medium/50" viewBox="0 0 24 12" fill="currentColor">
								<path d="M0,6 Q6,0 12,6 Q18,0 24,6" stroke="currentColor" strokeWidth="1.5" fill="none" />
							</svg>
						</div>

						{/* 中心标题 - 竖排文字 (depth: 0.12) */}
						<div className="absolute inset-0 flex items-center justify-center" data-depth="0.12">
							<div className="flex gap-8">
								<div className="flex flex-col items-center gap-2">
									<div className="w-0.5 h-12 bg-gradient-to-b from-zhusha to-transparent"></div>
									<span className="text-2xl font-display font-semibold text-ink-deep tracking-[0.5em] ink-vertical">
										山水有清音
									</span>
									<div className="w-0.5 h-8 bg-gradient-to-t from-zhusha to-transparent"></div>
								</div>
							</div>
						</div>

						{/* 印章装饰 (depth: 0.25) */}
						<div className="absolute bottom-16 right-20" data-depth="0.25">
							<div className="w-12 h-12 border-2 border-zhusha/80 rounded flex items-center justify-center rotate-6 bg-zhusha/10">
								<span className="text-zhusha text-xs font-display font-bold">禅意</span>
							</div>
						</div>
					</>
				)

			case "window":
				return (
					<>
						{/* 背景层 */}
						<div className="absolute inset-0 bg-gradient-to-b from-paper-warm via-paper to-aged rounded-xl"></div>

						{/* 窗棂边框 - 固定不动 (z-10 确保在最上层) */}
						<div className="absolute inset-0 border-[16px] border-zitan/90 z-10 pointer-events-none">
							{/* 窗格装饰 */}
							<div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-zitan/80"></div>
							<div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-zitan/80"></div>
							<div className="absolute top-0 left-0 w-16 h-16 border-r-2 border-b-2 border-zitan/60"></div>
							<div className="absolute top-0 right-0 w-16 h-16 border-l-2 border-b-2 border-zitan/60"></div>
							<div className="absolute bottom-0 left-0 w-16 h-16 border-r-2 border-t-2 border-zitan/60"></div>
							<div className="absolute bottom-0 right-0 w-16 h-16 border-l-2 border-t-2 border-zitan/60"></div>
						</div>

						{/* 窗外远景 (depth: 0.08) */}
						<div className="absolute inset-0" data-depth="0.08">
							<svg className="absolute bottom-8 left-8 right-8 h-32 text-cang/30" viewBox="0 0 800 150" preserveAspectRatio="none">
								<path d="M0,80 Q100,40 200,90 T400,70 T600,100 T800,60 L800,150 L0,150 Z" fill="currentColor" />
							</svg>
							{/* 远山淡影 */}
							<svg className="absolute bottom-8 left-8 right-8 h-40 text-dai/20" viewBox="0 0 800 200" preserveAspectRatio="none">
								<path d="M0,120 Q150,60 300,130 T600,100 T800,120 L800,200 L0,200 Z" fill="currentColor" />
							</svg>
						</div>

						{/* 窗外近景 (depth: 0.15) */}
						<div className="absolute inset-0" data-depth="0.15">
							{/* 竹子 */}
							<div className="absolute bottom-8 left-16 w-1 h-24 bg-gradient-to-t from-zhu to-transparent"></div>
							<div className="absolute bottom-8 left-20 w-0.5 h-20 bg-gradient-to-t from-zhu/80 to-transparent"></div>
							<div className="absolute bottom-8 right-20 w-1 h-28 bg-gradient-to-t from-zhu to-transparent"></div>
							{/* 竹叶 */}
							<div className="absolute bottom-28 left-14">
								<svg className="w-8 h-4 text-zhu/60" viewBox="0 0 32 16" fill="currentColor">
									<ellipse cx="16" cy="8" rx="14" ry="6" transform="rotate(-15 16 8)" />
								</svg>
							</div>
							<div className="absolute bottom-32 right-18">
								<svg className="w-10 h-5 text-zhu/50" viewBox="0 0 40 20" fill="currentColor">
									<ellipse cx="20" cy="10" rx="18" ry="8" transform="rotate(15 20 10)" />
								</svg>
							</div>
						</div>

						{/* 窗台 (depth: 0.2) */}
						<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zitan/40 to-transparent" data-depth="0.2"></div>

						{/* 茶具 (depth: 0.25) */}
						<div className="absolute bottom-12 left-1/3" data-depth="0.25">
							<div className="flex items-end gap-2">
								<div className="w-6 h-8 bg-zitan/60 rounded-t-sm"></div>
								<div className="w-5 h-6 bg-zitan/50 rounded-t-sm"></div>
								<div className="w-4 h-5 bg-zitan/40 rounded-t-sm"></div>
							</div>
						</div>

						{/* 题字 (depth: 0.18) */}
						<div className="absolute top-16 right-16" data-depth="0.18">
							<div className="flex flex-col items-center gap-1">
								<span className="text-sm font-display font-semibold text-ink-deep tracking-[0.3em] ink-vertical">
									窗含西岭
								</span>
								<div className="w-4 h-4 border border-zhusha/60 flex items-center justify-center mt-1">
									<span className="text-zhusha text-[8px] font-bold">秋</span>
								</div>
							</div>
						</div>
					</>
				)

			case "seal":
				return (
					<>
						{/* 背景层 */}
						<div className="absolute inset-0 bg-gradient-to-br from-paper via-paper-warm to-su rounded-xl"></div>

						{/* 宣纸纹理背景 (depth: 0.05) */}
						<div className="absolute inset-0 ink-texture" data-depth="0.05"></div>

						{/* 书法文字 (depth: 0.15) */}
						<div className="absolute inset-0 flex items-center justify-center" data-depth="0.15">
							<div className="grid grid-cols-2 gap-16">
								<span className="text-6xl font-display font-bold text-ink/10">琴</span>
								<span className="text-6xl font-display font-bold text-ink/10">棋</span>
								<span className="text-6xl font-display font-bold text-ink/10">书</span>
								<span className="text-6xl font-display font-bold text-ink/10">画</span>
							</div>
						</div>

						{/* 墨迹装饰 (depth: 0.25) */}
						<div className="absolute top-12 left-12" data-depth="0.25">
							<div className="w-20 h-20 bg-ink/5 rounded-full blur-xl"></div>
						</div>
						<div className="absolute bottom-16 right-16" data-depth="0.3">
							<div className="w-24 h-24 bg-ink/4 rounded-full blur-2xl"></div>
						</div>

						{/* 主印章 - 朱砂红 (depth: 0.5) */}
						<div className="absolute inset-0 flex items-center justify-center" data-depth="0.5">
							<div className="relative">
								<div className="w-32 h-32 border-4 border-zhusha/90 rounded-lg flex items-center justify-center bg-zhusha/10 rotate-3 shadow-ink-seal">
									<div className="grid grid-cols-2 gap-1 p-4">
										<span className="text-zhusha text-xl font-display font-bold">天</span>
										<span className="text-zhusha text-xl font-display font-bold">人</span>
										<span className="text-zhusha text-xl font-display font-bold">合</span>
										<span className="text-zhusha text-xl font-display font-bold">一</span>
									</div>
								</div>
								{/* 印章挂绳 */}
								<div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-zhusha/60"></div>
								<div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-zhusha/60"></div>
							</div>
						</div>

						{/* 小印章装饰 (depth: 0.35) */}
						<div className="absolute top-8 right-12" data-depth="0.35">
							<div className="w-10 h-10 border-2 border-zhusha/70 rounded flex items-center justify-center -rotate-6 bg-zhusha/15">
								<span className="text-zhusha text-xs font-display font-bold">如意</span>
							</div>
						</div>
						<div className="absolute bottom-12 left-12" data-depth="0.4">
							<div className="w-8 h-8 border-2 border-zhusha/60 rounded rotate-12 flex items-center justify-center bg-zhusha/10">
								<span className="text-zhusha text-[10px] font-display font-bold">吉祥</span>
							</div>
						</div>

						{/* 云纹装饰 (depth: 0.2) */}
						<div className="absolute top-0 right-0 w-32 h-32" data-depth="0.2">
							<svg viewBox="0 0 100 100" className="w-full h-full text-ink/5">
								<path d="M10,50 Q25,30 40,50 T70,50 T90,50" stroke="currentColor" strokeWidth="2" fill="none" />
								<path d="M10,60 Q25,40 40,60 T70,60 T90,60" stroke="currentColor" strokeWidth="2" fill="none" />
							</svg>
						</div>

						{/* 标题文字 (depth: 0.6) */}
						<div className="absolute bottom-8 left-1/2 -translate-x-1/2" data-depth="0.6">
							<div className="flex items-center gap-4">
								<div className="h-px w-12 bg-gradient-to-r from-transparent to-ink/30"></div>
								<span className="text-sm font-display text-ink-medium tracking-[0.5em]">印章视差</span>
								<div className="h-px w-12 bg-gradient-to-l from-transparent to-ink/30"></div>
							</div>
						</div>
					</>
				)
		}
	}

	return (
		<div className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-6xl mx-auto overflow-hidden shadow-ink-card">
			{/* 装饰性云纹 */}
			<div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					<circle cx="80" cy="20" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink-deep" />
				</svg>
			</div>

			{/* 左上角印章装饰 */}
			<div className="absolute top-4 left-4 w-10 h-10 border-2 border-zhusha/30 rounded flex items-center justify-center rotate-6">
				<span className="text-zhusha text-[8px] font-display font-bold">视差</span>
			</div>

			<div
				className={`transition-all duration-700 ease-out ${
					isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
				}`}
			>
				{/* 标题区域 */}
				<div className="mb-6 text-center pb-6 border-b border-ink/10 relative">
					<div className="flex items-center justify-center gap-3 mb-2">
						<div className="h-px w-16 bg-gradient-to-r from-transparent to-ink/20"></div>
						<div className="w-8 h-8 rounded-full bg-gradient-to-br from-zhusha/20 to-zhusha/5 flex items-center justify-center border border-zhusha/30">
							<svg className="w-4 h-4 text-zhusha" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
							</svg>
						</div>
						<div className="h-px w-16 bg-gradient-to-l from-transparent to-ink/20"></div>
					</div>
					<h2 className="text-xl font-display font-semibold text-ink-deep mb-1.5 tracking-[0.2em]">
						山水视差
					</h2>
					<p className="text-ink-medium text-sm tracking-wide">移步换景 · 层峦叠嶂</p>
				</div>

				{/* Tab 切换 - 中式标签 */}
				<div className="mb-6">
					<div className="flex flex-wrap gap-2 justify-center">
						{demoTabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border relative overflow-hidden group ${
									activeTab === tab.id
										? "bg-gradient-to-br from-zhusha to-zhusha/90 text-white border-zhusha shadow-ink-seal"
										: "bg-paper-warm text-ink-medium border-ink/10 hover:border-zhusha/30 hover:bg-zhusha/5"
								}`}
							>
								<div className="flex flex-col items-center gap-0.5 relative z-10">
									<span className="tracking-wide">{tab.label}</span>
									<span className={`text-xs tracking-wider ${activeTab === tab.id ? "opacity-80" : "opacity-60"}`}>
										{tab.description}
									</span>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* 演示区域 - 带画框装饰 */}
				<div className="relative">
					{/* 画框四角装饰 */}
					<div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-zitan/40 rounded-tl-lg z-20"></div>
					<div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-zitan/40 rounded-tr-lg z-20"></div>
					<div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-zitan/40 rounded-bl-lg z-20"></div>
					<div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-zitan/40 rounded-br-lg z-20"></div>

					{/* parallax.js 视差容器 */}
					<div
						ref={sceneRef}
						className="relative h-[400px] rounded-xl overflow-hidden shadow-ink"
					>
						{renderDemoContent()}
					</div>

					{/* 提示区域 */}
					<div className="mt-4 p-3 bg-paper-warm/60 border border-ink/10 rounded-lg backdrop-blur-sm">
						<div className="flex items-center justify-center gap-2 text-xs text-ink-medium">
							<svg className="w-4 h-4 text-zhusha" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
							</svg>
							<span>移动鼠标在演示区域上查看山水层叠的视差效果</span>
						</div>
					</div>
				</div>

				{/* 特性统计 - 中式卡片 */}
				<div className="mt-6 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="p-4 bg-gradient-to-br from-paper-warm to-paper rounded-lg border border-ink/8 text-center relative overflow-hidden group hover:border-zhusha/20 hover:shadow-ink-hover transition-all duration-300">
							<div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-zhusha/5 to-transparent rounded-bl-full"></div>
							<div className="text-lg font-display font-semibold text-zhusha mb-1 relative z-10">~12KB</div>
							<div className="text-xs text-ink-light relative z-10">轻量体积</div>
						</div>
						<div className="p-4 bg-gradient-to-br from-paper-warm to-paper rounded-lg border border-ink/8 text-center relative overflow-hidden group hover:border-zhusha/20 hover:shadow-ink-hover transition-all duration-300">
							<div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-zhusha/5 to-transparent rounded-bl-full"></div>
							<div className="text-lg font-display font-semibold text-zhusha mb-1 relative z-10">3 种</div>
							<div className="text-xs text-ink-light relative z-10">意境模式</div>
						</div>
						<div className="p-4 bg-gradient-to-br from-paper-warm to-paper rounded-lg border border-ink/8 text-center relative overflow-hidden group hover:border-zhusha/20 hover:shadow-ink-hover transition-all duration-300">
							<div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-zhusha/5 to-transparent rounded-bl-full"></div>
							<div className="text-lg font-display font-semibold text-zhusha mb-1 relative z-10">0</div>
							<div className="text-xs text-ink-light relative z-10">外部依赖</div>
						</div>
						<div className="p-4 bg-gradient-to-br from-paper-warm to-paper rounded-lg border border-ink/8 text-center relative overflow-hidden group hover:border-zhusha/20 hover:shadow-ink-hover transition-all duration-300">
							<div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-zhusha/5 to-transparent rounded-bl-full"></div>
							<div className="text-lg font-display font-semibold text-zhusha mb-1 relative z-10">100%</div>
							<div className="text-xs text-ink-light relative z-10">响应式</div>
						</div>
					</div>
				</div>

				{/* 底部题字 */}
				<div
					className={`mt-6 pt-5 border-t border-ink/10 text-center transition-all duration-500 delay-500 ${
						isLoaded ? "opacity-100" : "opacity-0"
					}`}
				>
					<div className="flex items-center justify-center gap-4 text-xs text-ink-light">
						<div className="h-px w-8 bg-gradient-to-r from-transparent to-ink/15"></div>
						<p className="tracking-wider">水墨层叠 · 移步换景 · 气韵生动</p>
						<div className="h-px w-8 bg-gradient-to-l from-transparent to-ink/15"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ParallaxDemo
