import { useEffect, useRef, useState } from "react"

// Mo.js 类型声明
declare global {
	interface Window {
		mojs: any
	}
}

// 国风配色
const COLORS = {
	zhusha: "#c83c3c",
	songyan: "#8b4513",
	xuanzhi: "#faf8f5",
	daiqing: "#4a6741",
	zhushi: "#d4a574",
	moshi: "#2c2c2c",
	cangshan: "#5c6b73",
	yunhui: "#8b8680",
	jin: "#d4a017",
}

function MojsDemo() {
	const [activeDemo, setActiveDemo] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const [isMojsLoaded, setIsMojsLoaded] = useState(false)
	const demoAreaRef = useRef<HTMLDivElement>(null)
	const animationsRef = useRef<any[]>([])

	const demoTabs = [
		{ name: "爆炸效果", key: "burst" },
		{ name: "形状动画", key: "shape" },
		{ name: "粒子系统", key: "particles" },
		{ name: "国风特效", key: "chinese" },
	]

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	// 加载 Mo.js
	useEffect(() => {
		if (typeof window === "undefined") return
		if (window.mojs) {
			setIsMojsLoaded(true)
			return
		}
		const script = document.createElement("script")
		script.src = "https://cdn.jsdelivr.net/npm/@mojs/core"
		script.async = true
		script.onload = () => setIsMojsLoaded(true)
		document.head.appendChild(script)
		return () => {
			document.head.removeChild(script)
		}
	}, [])

	const cleanupAnimations = () => {
		animationsRef.current.forEach((anim) => {
			if (anim && typeof anim.stop === "function") {
				anim.stop()
			}
		})
		animationsRef.current = []
	}

	const runDemo = (index: number) => {
		if (!isMojsLoaded || !demoAreaRef.current || !window.mojs) return
		cleanupAnimations()
		const container = demoAreaRef.current
		container.innerHTML = ""
		const mojs = window.mojs

		switch (demoTabs[index].key) {
			case "burst": mountBurstDemo(container, mojs); break
			case "shape": mountShapeDemo(container, mojs); break
			case "particles": mountParticlesDemo(container, mojs); break
			case "chinese": mountChineseDemo(container, mojs); break
		}
	}

	// 爆炸效果演示
	const mountBurstDemo = (container: HTMLDivElement, mojs: any) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col items-center justify-center relative"
		wrapper.style.cssText = `background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%); position: relative;`

		// 触发按钮
		const button = document.createElement("button")
		button.textContent = "点击触发爆炸"
		button.style.cssText = `
			padding: 16px 40px;
			font-size: 18px;
			font-family: "Noto Serif SC", serif;
			background: linear-gradient(135deg, ${COLORS.zhusha}, ${COLORS.zhushi});
			color: ${COLORS.xuanzhi};
			border: none;
			border-radius: 8px;
			cursor: pointer;
			transition: all 0.3s;
			letter-spacing: 4px;
			box-shadow: 0 4px 15px ${COLORS.zhusha}40;
		`

		button.addEventListener("mouseenter", () => {
			button.style.transform = "scale(1.05)"
			button.style.boxShadow = `0 6px 20px ${COLORS.zhusha}60`
		})
		button.addEventListener("mouseleave", () => {
			button.style.transform = "scale(1)"
			button.style.boxShadow = `0 4px 15px ${COLORS.zhusha}40`
		})

		// 添加自动播放提示
		const autoHint = document.createElement("div")
		autoHint.textContent = "▼ 首次加载自动播放"
		autoHint.style.cssText = `
			margin-top: 20px;
			font-size: 12px;
			color: ${COLORS.yunhui};
			font-family: "Noto Serif SC", serif;
		`

		wrapper.appendChild(button)
		wrapper.appendChild(autoHint)
		container.appendChild(wrapper)

		// 创建爆炸动画 - 使用 center 定位
		const burst = new mojs.Burst({
			parent: wrapper,
			left: '50%',
			top: '50%',
			radius: { 0: 150 },
			count: 12,
			children: {
				shape: ['circle', 'rect', 'polygon'],
				fill: [COLORS.zhusha, COLORS.daiqing, COLORS.zhushi, COLORS.jin],
				radius: { 6: 0 },
				scale: { 1: 0 },
				duration: 1500,
				easing: 'cubic.out',
				degreeShift: 'stagger(0, 30)',
			}
		})

		const burst2 = new mojs.Burst({
			parent: wrapper,
			left: '50%',
			top: '50%',
			radius: { 0: 100 },
			count: 8,
			children: {
				shape: 'circle',
				fill: COLORS.zhusha,
				radius: { 8: 0 },
				duration: 1200,
				delay: 100,
			}
		})

		animationsRef.current.push(burst, burst2)

		// 首次加载自动播放
		setTimeout(() => {
			burst.replay()
			burst2.replay()
		}, 300)

		button.addEventListener("click", () => {
			burst.replay()
			burst2.replay()
		})
	}

	// 形状动画演示
	const mountShapeDemo = (container: HTMLDivElement, mojs: any) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col items-center justify-center relative"
		wrapper.style.cssText = `background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%); position: relative;`

		// 控制按钮
		const controls = document.createElement("div")
		controls.style.cssText = `
			display: flex;
			gap: 12px;
			margin-bottom: 40px;
			z-index: 10;
		`

		const shapes = [
			{ name: "圆形", type: "circle", color: COLORS.zhusha },
			{ name: "方形", type: "rect", color: COLORS.daiqing },
			{ name: "多边形", type: "polygon", color: COLORS.zhushi },
		]

		shapes.forEach((shape) => {
			const btn = document.createElement("button")
			btn.textContent = shape.name
			btn.style.cssText = `
				padding: 10px 24px;
				font-size: 14px;
				font-family: "Noto Serif SC", serif;
				background: ${shape.color};
				color: ${COLORS.xuanzhi};
				border: none;
				border-radius: 6px;
				cursor: pointer;
				transition: all 0.3s;
				letter-spacing: 2px;
			`
			btn.addEventListener("click", () => {
				// 清理之前的动画
				cleanupAnimations()
				createShapeAnimation(wrapper, mojs, shape.type, shape.color)
			})
			controls.appendChild(btn)
		})

		wrapper.appendChild(controls)
		container.appendChild(wrapper)

		// 初始动画 - 延迟确保容器已渲染
		setTimeout(() => {
			createShapeAnimation(wrapper, mojs, "circle", COLORS.zhusha)
		}, 300)
	}

	const createShapeAnimation = (wrapper: HTMLDivElement, mojs: any, shapeType: string, color: string) => {
		// 使用 center 定位确保动画在可见区域
		const shape = new mojs.Shape({
			parent: wrapper,
			shape: shapeType,
			left: '50%',
			top: '50%',
			radius: { 0: 60 },
			fill: 'transparent',
			stroke: color,
			strokeWidth: { 10: 0 },
			duration: 1000,
			easing: 'cubic.out',
		})

		const shape2 = new mojs.Shape({
			parent: wrapper,
			shape: shapeType,
			left: '50%',
			top: '50%',
			radius: { 0: 40 },
			fill: color,
			opacity: { 1: 0 },
			duration: 800,
			delay: 200,
			easing: 'cubic.out',
		})

		// 添加第三个动画 - 旋转效果
		const shape3 = new mojs.Shape({
			parent: wrapper,
			shape: shapeType,
			left: '50%',
			top: '50%',
			radius: { 20: 50 },
			fill: 'transparent',
			stroke: COLORS.jin,
			strokeWidth: { 2: 0 },
			angle: { 0: 180 },
			duration: 1500,
			delay: 400,
			easing: 'cubic.out',
		})

		shape.play()
		shape2.play()
		shape3.play()
		animationsRef.current.push(shape, shape2, shape3)
	}

	// 粒子系统演示
	const mountParticlesDemo = (container: HTMLDivElement, mojs: any) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col items-center justify-center relative"
		wrapper.style.cssText = `background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%); position: relative;`

		// 说明文字
		const desc = document.createElement("p")
		desc.textContent = "点击任意位置生成粒子"
		desc.style.cssText = `
			font-size: 14px;
			color: ${COLORS.yunhui};
			font-family: "Noto Serif SC", serif;
			margin-bottom: 20px;
			letter-spacing: 2px;
		`
		wrapper.appendChild(desc)

		// 点击区域
		const clickArea = document.createElement("div")
		clickArea.style.cssText = `
			width: 300px;
			height: 200px;
			border: 2px dashed ${COLORS.zhushi}60;
			border-radius: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			background: ${COLORS.xuanzhi}50;
			transition: all 0.3s;
			position: relative;
		`
		clickArea.innerHTML = `<span style="color: ${COLORS.yunhui}; font-family: 'Noto Serif SC', serif;">点击这里</span>`

		clickArea.addEventListener("mouseenter", () => {
			clickArea.style.borderColor = COLORS.zhushi
			clickArea.style.background = `${COLORS.zhushi}10`
		})
		clickArea.addEventListener("mouseleave", () => {
			clickArea.style.borderColor = `${COLORS.zhushi}60`
			clickArea.style.background = `${COLORS.xuanzhi}50`
		})

		wrapper.appendChild(clickArea)
		container.appendChild(wrapper)

		clickArea.addEventListener("click", (e) => {
			const rect = clickArea.getBoundingClientRect()
			// 使用百分比定位
			const xPercent = ((e.clientX - rect.left) / rect.width) * 100
			const yPercent = ((e.clientY - rect.top) / rect.height) * 100

			// 创建粒子爆炸
			const colors = [COLORS.zhusha, COLORS.daiqing, COLORS.zhushi, COLORS.jin, COLORS.cangshan]

			const burst = new mojs.Burst({
				parent: clickArea,
				left: `${xPercent}%`,
				top: `${yPercent}%`,
				radius: { 0: 80 },
				count: 10,
				children: {
					shape: 'circle',
					fill: colors,
					radius: { 5: 0 },
					duration: 1000,
					easing: 'cubic.out',
				}
			})

			const burst2 = new mojs.Burst({
				parent: clickArea,
				left: `${xPercent}%`,
				top: `${yPercent}%`,
				radius: { 0: 50 },
				count: 6,
				children: {
					shape: 'polygon',
					fill: 'transparent',
					stroke: colors,
					strokeWidth: 2,
					radius: { 8: 0 },
					duration: 1200,
					easing: 'cubic.out',
				}
			})

			burst.replay()
			burst2.replay()

			animationsRef.current.push(burst, burst2)
		})
	}

	// 国风特效演示
	const mountChineseDemo = (container: HTMLDivElement, mojs: any) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col items-center justify-center relative"
		wrapper.style.cssText = `background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%); position: relative;`

		// 标题
		const title = document.createElement("h2")
		title.textContent = "墨韵"
		title.style.cssText = `
			font-size: 72px;
			font-family: "STKaiti", "KaiTi", "Noto Serif SC", serif;
			color: ${COLORS.moshi};
			letter-spacing: 20px;
			margin-bottom: 30px;
			cursor: pointer;
			transition: all 0.3s;
		`

		const desc = document.createElement("p")
		desc.textContent = "点击文字触发水墨特效"
		desc.style.cssText = `
			font-size: 14px;
			color: ${COLORS.yunhui};
			font-family: "Noto Serif SC", serif;
			letter-spacing: 2px;
		`

		// 添加自动播放提示
		const autoHint = document.createElement("div")
		autoHint.textContent = "▼ 首次加载自动播放"
		autoHint.style.cssText = `
			margin-top: 20px;
			font-size: 12px;
			color: ${COLORS.yunhui};
			font-family: "Noto Serif SC", serif;
		`

		wrapper.appendChild(title)
		wrapper.appendChild(desc)
		wrapper.appendChild(autoHint)
		container.appendChild(wrapper)

		// 创建水墨特效函数
		const createInkEffect = (centerX: number, centerY: number) => {
			// 水墨扩散效果
			const inkSpread = new mojs.Burst({
				parent: wrapper,
				left: centerX,
				top: centerY,
				radius: { 0: 200 },
				count: 16,
				children: {
					shape: 'circle',
					fill: COLORS.moshi,
					opacity: { 0.6: 0 },
					radius: { 15: 0 },
					duration: 2000,
					easing: 'cubic.out',
					degreeShift: 'stagger(0, 22.5)',
				}
			})

			// 朱砂点缀
			const zhushaDots = new mojs.Burst({
				parent: wrapper,
				left: centerX,
				top: centerY,
				radius: { 0: 120 },
				count: 8,
				children: {
					shape: 'circle',
					fill: COLORS.zhusha,
					radius: { 8: 0 },
					duration: 1500,
					delay: 200,
					easing: 'cubic.out',
				}
			})

			// 金色光点
			const goldDots = new mojs.Burst({
				parent: wrapper,
				left: centerX,
				top: centerY,
				radius: { 0: 80 },
				count: 6,
				children: {
					shape: 'polygon',
					fill: COLORS.jin,
					radius: { 6: 0 },
					duration: 1200,
					delay: 400,
					easing: 'cubic.out',
				}
			})

			inkSpread.replay()
			zhushaDots.replay()
			goldDots.replay()

			animationsRef.current.push(inkSpread, zhushaDots, goldDots)

			// 文字动画
			title.style.transform = "scale(1.1)"
			title.style.color = COLORS.zhusha
			setTimeout(() => {
				title.style.transform = "scale(1)"
				title.style.color = COLORS.moshi
			}, 500)
		}

		// 首次加载自动播放
		setTimeout(() => {
			createInkEffect('50%', '40%')
		}, 300)

		title.addEventListener("click", () => {
			createInkEffect('50%', '40%')
		})
	}

	useEffect(() => {
		if (isMojsLoaded) runDemo(activeDemo)
		return () => cleanupAnimations()
	}, [activeDemo, isMojsLoaded])

	return (
		<div className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden">
			{/* 装饰背景 */}
			<div className="absolute top-0 right-0 w-48 h-32 opacity-[0.03] pointer-events-none">
				<svg viewBox="0 0 200 150" className="w-full h-full" fill="currentColor">
					<circle cx="150" cy="50" r="80" />
				</svg>
			</div>

			{/* 印章装饰 */}
			<div className="absolute bottom-6 right-6 w-12 h-12 opacity-15 pointer-events-none">
				<div className="w-full h-full border-2 border-zhusha rounded-sm flex items-center justify-center rotate-12">
					<span className="text-zhusha text-xs font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>爆</span>
				</div>
			</div>

			<div className={`transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
				{/* 标题区域 */}
				<div className="mb-6 text-center pb-4 border-b-2 border-ink/10 relative">
					<div className="absolute left-1/2 -translate-x-1/2 top-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-zhusha/50 to-transparent" />
					<h2 className="text-2xl font-semibold text-ink-deep mb-2 tracking-[0.3em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						Mo.js
					</h2>
					<p className="text-ink-medium text-sm tracking-[0.2em] mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						动画效果炸裂的爆炸艺术家
					</p>
					<div className="flex justify-center">
						<a href="https://mojs.github.io/" target="_blank" rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300">
							<span>mojs.github.io</span>
							<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
					</div>
				</div>

				{/* 标签切换 */}
				<div className="mb-5">
					<div className="flex gap-2 flex-wrap justify-center">
						{demoTabs.map((tab, index) => (
							<button
								key={tab.key}
								onClick={() => setActiveDemo(index)}
								className={`px-5 py-2.5 text-sm tracking-[0.15em] rounded-lg transition-all duration-300 ${
									activeDemo === index
										? "bg-gradient-to-r from-ink-deep to-ink-deep/90 text-paper shadow-lg"
										: "bg-ink/5 text-ink-medium hover:bg-ink/10 hover:shadow-md"
								}`}
								style={{ fontFamily: "'Noto Serif SC', serif" }}
							>
								{tab.name}
							</button>
						))}
					</div>
				</div>

				{/* 演示区域 */}
				<div
					ref={demoAreaRef}
					className="relative h-[400px] border-2 border-ink/10 rounded-xl overflow-hidden shadow-inner"
					style={{ background: COLORS.xuanzhi }}
				>
					{!isMojsLoaded && (
						<div className="absolute inset-0 flex items-center justify-center bg-paper/80">
							<div className="flex items-center gap-3 text-ink-medium">
								<div className="w-5 h-5 border-2 border-ink/20 border-t-zhusha rounded-full animate-spin" />
								<span className="text-sm" style={{ fontFamily: "'Noto Serif SC', serif" }}>加载中...</span>
							</div>
						</div>
					)}
				</div>

				{/* API 说明 */}
				<div className="mt-5 p-5 rounded-xl border border-ink/10" style={{ background: `linear-gradient(135deg, ${COLORS.xuanzhi}, #f5f0e8)` }}>
					<div className="text-xs text-ink-medium space-y-2">
						<p className="font-semibold text-ink-deep mb-3 text-sm tracking-[0.15em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
							📜 核心组件
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							<div className="p-3 bg-paper/60 rounded border border-ink/5">
								<code className="text-zhusha font-bold">Burst</code>
								<span className="text-ink-light block text-[10px] mt-1">爆炸效果，粒子扩散动画</span>
							</div>
							<div className="p-3 bg-paper/60 rounded border border-ink/5">
								<code className="text-daiqing font-bold">Shape</code>
								<span className="text-ink-light block text-[10px] mt-1">形状动画，圆形/方形/多边形</span>
							</div>
							<div className="p-3 bg-paper/60 rounded border border-ink/5">
								<code className="text-zhushi font-bold">Html</code>
								<span className="text-ink-light block text-[10px] mt-1">DOM元素动画控制</span>
							</div>
						</div>
					</div>
				</div>

				{/* 特性统计 */}
				<div className="mt-6 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						{[
							{ icon: "💥", name: "爆炸效果", desc: "Burst 粒子系统" },
							{ icon: "⭕", name: "形状动画", desc: "多种图形变换" },
							{ icon: "✨", name: "粒子系统", desc: "点击交互特效" },
							{ icon: "🎨", name: "国风特效", desc: "水墨朱砂动画" },
						].map((item) => (
							<div key={item.name} className="p-4 rounded-xl border border-ink/10 transition-all hover:shadow-md"
								style={{ background: `linear-gradient(135deg, ${COLORS.xuanzhi}, #f5f0e8)` }}>
								<div className="text-2xl mb-2">{item.icon}</div>
								<div className="text-base font-semibold text-zhusha mb-1 tracking-wider" style={{ fontFamily: "'Noto Serif SC', serif" }}>
									{item.name}
								</div>
								<div className="text-xs text-ink-light">{item.desc}</div>
							</div>
						))}
					</div>
				</div>

				<div className="mt-5 text-center text-xs text-ink-light">
					<p className="tracking-[0.15em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						Mo.js 用代码绘制运动的诗篇，让每一个像素都充满活力
					</p>
				</div>
			</div>
		</div>
	)
}

export default MojsDemo
