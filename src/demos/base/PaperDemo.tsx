import { useEffect, useRef, useState } from "react"

// Paper.js 类型声明
declare global {
	interface Window {
		paper: any
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

function PaperDemo() {
	const [activeDemo, setActiveDemo] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const [isPaperLoaded, setIsPaperLoaded] = useState(false)
	const demoAreaRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const paperScopeRef = useRef<any>(null)

	const demoTabs = [
		{ name: "基础绘图", key: "basic" },
		{ name: "路径动画", key: "path" },
		{ name: "交互绘图", key: "interactive" },
		{ name: "国风插画", key: "chinese" },
	]

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	// 加载 Paper.js
	useEffect(() => {
		if (typeof window === "undefined") return
		if (window.paper) {
			setIsPaperLoaded(true)
			return
		}
		const script = document.createElement("script")
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.17/paper-full.min.js"
		script.async = true
		script.onload = () => setIsPaperLoaded(true)
		document.head.appendChild(script)
		return () => {
			document.head.removeChild(script)
		}
	}, [])

	const cleanupPaper = () => {
		if (paperScopeRef.current) {
			paperScopeRef.current.remove()
			paperScopeRef.current = null
		}
	}

	const runDemo = (index: number) => {
		if (!isPaperLoaded || !canvasRef.current || !window.paper) return
		cleanupPaper()
		const canvas = canvasRef.current
		const paper = window.paper

		// 创建新的 PaperScope
		const scope = new paper.PaperScope()
		scope.setup(canvas)
		paperScopeRef.current = scope

		switch (demoTabs[index].key) {
			case "basic": mountBasicDemo(scope); break
			case "path": mountPathDemo(scope); break
			case "interactive": mountInteractiveDemo(scope); break
			case "chinese": mountChineseDemo(scope); break
		}
	}

	// 基础绘图演示
	const mountBasicDemo = (scope: any) => {
		const { Path, Point, Color } = scope

		// 绘制圆形
		const circle = new Path.Circle(new Point(150, 150), 50)
		circle.fillColor = new Color(COLORS.zhusha)
		circle.strokeColor = new Color(COLORS.songyan)
		circle.strokeWidth = 3

		// 绘制矩形
		const rect = new Path.Rectangle(new Point(250, 100), 80, 100)
		rect.fillColor = new Color(COLORS.daiqing)
		rect.strokeColor = new Color(COLORS.songyan)
		rect.strokeWidth = 2

		// 绘制多边形
		const polygon = new Path.RegularPolygon(new Point(400, 150), 6, 50)
		polygon.fillColor = new Color(COLORS.zhushi)
		polygon.strokeColor = new Color(COLORS.songyan)
		polygon.strokeWidth = 2

		// 绘制线条
		const line = new Path.Line(new Point(100, 250), new Point(450, 250))
		line.strokeColor = new Color(COLORS.cangshan)
		line.strokeWidth = 4

		// 绘制曲线
		const curve = new Path()
		curve.strokeColor = new Color(COLORS.zhusha)
		curve.strokeWidth = 3
		curve.add(new Point(100, 300))
		curve.add(new Point(200, 350))
		curve.add(new Point(300, 280))
		curve.add(new Point(400, 320))
		curve.smooth()
	}

	// 路径动画演示
	const mountPathDemo = (scope: any) => {
		const { Path, Point, Color } = scope

		// 创建多个圆形
		const circles: any[] = []
		const colors = [COLORS.zhusha, COLORS.daiqing, COLORS.zhushi, COLORS.cangshan, COLORS.jin]

		for (let i = 0; i < 5; i++) {
			const circle = new Path.Circle(new Point(100 + i * 80, 200), 25)
			circle.fillColor = new Color(colors[i])
			circle.strokeColor = new Color(COLORS.songyan)
			circle.strokeWidth = 2
			circles.push(circle)
		}

		// 动画循环
		let angle = 0
		scope.view.onFrame = () => {
			angle += 0.02
			circles.forEach((circle, i) => {
				const offset = i * 0.5
				circle.position.y = 200 + Math.sin(angle + offset) * 50
				circle.scaling = 1 + Math.sin(angle * 2 + offset) * 0.2
			})
		}
	}

	// 交互绘图演示
	const mountInteractiveDemo = (scope: any) => {
		const { Path, Point, Color } = scope

		// 创建路径
		const path = new Path()
		path.strokeColor = new Color(COLORS.zhusha)
		path.strokeWidth = 3
		path.strokeCap = 'round'
		path.strokeJoin = 'round'

		// 鼠标按下时开始绘制
		let isDrawing = false

		scope.view.onMouseDown = (event: any) => {
			isDrawing = true
			path.add(event.point)
		}

		scope.view.onMouseDrag = (event: any) => {
			if (isDrawing) {
				path.add(event.point)
				path.smooth()
			}
		}

		scope.view.onMouseUp = () => {
			isDrawing = false
		}

		// 清除按钮
		const clearBtn = document.createElement("button")
		clearBtn.textContent = "清除画布"
		clearBtn.style.cssText = `
			position: absolute;
			top: 10px;
			right: 10px;
			padding: 8px 16px;
			background: ${COLORS.zhusha};
			color: ${COLORS.xuanzhi};
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-family: "Noto Serif SC", serif;
			font-size: 12px;
		`
		clearBtn.addEventListener("click", () => {
			path.removeSegments()
		})
		demoAreaRef.current?.appendChild(clearBtn)
	}

	// 国风插画演示
	const mountChineseDemo = (scope: any) => {
		const { Path, Point, Color, Group } = scope

		// 绘制竹子
		const drawBamboo = (x: number, y: number, height: number) => {
			const group = new Group()

			// 竹节
			const segments = Math.floor(height / 40)
			for (let i = 0; i < segments; i++) {
				const segmentY = y - i * 40
				const segment = new Path.Rectangle(new Point(x - 4, segmentY - 35), 8, 35)
				segment.fillColor = new Color(COLORS.daiqing)
				segment.strokeColor = new Color(COLORS.songyan)
				segment.strokeWidth = 1
				group.addChild(segment)

				// 竹节连接处
				const joint = new Path.Rectangle(new Point(x - 5, segmentY - 2), 10, 4)
				joint.fillColor = new Color(COLORS.songyan)
				group.addChild(joint)
			}

			// 竹叶
			const leafPositions = [
				{ x: x + 5, y: y - height + 20, angle: -30 },
				{ x: x - 5, y: y - height + 30, angle: 30 },
				{ x: x + 8, y: y - height + 50, angle: -45 },
			]

			leafPositions.forEach((pos) => {
				const leaf = new Path()
				leaf.fillColor = new Color(COLORS.daiqing)
				leaf.add(new Point(pos.x, pos.y))
				leaf.add(new Point(pos.x + 20 * Math.cos((pos.angle * Math.PI) / 180), pos.y + 20 * Math.sin((pos.angle * Math.PI) / 180)))
				leaf.add(new Point(pos.x + 30 * Math.cos((pos.angle * Math.PI) / 180), pos.y + 5 * Math.sin((pos.angle * Math.PI) / 180)))
				leaf.closed = true
				group.addChild(leaf)
			})

			return group
		}

		// 绘制梅花
		const drawPlum = (x: number, y: number) => {
			const group = new Group()

			// 花朵
			for (let i = 0; i < 5; i++) {
				const angle = (i * 72 * Math.PI) / 180
				const petal = new Path.Ellipse({
					center: new Point(x + Math.cos(angle) * 12, y + Math.sin(angle) * 12),
					size: [15, 8],
					rotation: (i * 72),
				})
				petal.fillColor = new Color(COLORS.zhusha)
				group.addChild(petal)
			}

			// 花蕊
			const center = new Path.Circle(new Point(x, y), 5)
			center.fillColor = new Color(COLORS.jin)
			group.addChild(center)

			return group
		}

		// 绘制山
		const drawMountain = (points: number[][], color: string) => {
			const mountain = new Path()
			mountain.fillColor = new Color(color)
			mountain.strokeColor = new Color(COLORS.songyan)
			mountain.strokeWidth = 1

			points.forEach((point) => {
				mountain.add(new Point(point[0], point[1]))
			})
			mountain.closed = true
			return mountain
		}

		// 远山
		drawMountain(
			[[50, 350], [150, 200], [250, 350]],
			COLORS.cangshan + "60"
		)

		// 近山
		drawMountain(
			[[200, 350], [300, 180], [400, 350]],
			COLORS.daiqing + "80"
		)

		// 竹子
		drawBamboo(100, 350, 180)
		drawBamboo(120, 350, 150)

		// 梅花
		drawPlum(350, 150)
		drawPlum(380, 180)
		drawPlum(320, 200)

		// 太阳
		const sun = new Path.Circle(new Point(400, 80), 30)
		sun.fillColor = new Color(COLORS.zhusha + "40")
		sun.strokeColor = new Color(COLORS.zhusha)
		sun.strokeWidth = 2

		// 题字
		const text = new scope.PointText(new Point(50, 50))
		text.content = "竹梅图"
		text.fillColor = new Color(COLORS.moshi)
		text.fontSize = 24
		text.fontFamily = "STKaiti, KaiTi, serif"
	}

	useEffect(() => {
		if (isPaperLoaded) runDemo(activeDemo)
		return () => cleanupPaper()
	}, [activeDemo, isPaperLoaded])

	return (
		<div className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden">
			{/* 装饰背景 */}
			<div className="absolute top-0 right-0 w-48 h-32 opacity-[0.03] pointer-events-none">
				<svg viewBox="0 0 200 150" className="w-full h-full" fill="currentColor">
					<path d="M0,120 Q50,60 100,100 T200,80 L200,150 L0,150 Z" />
				</svg>
			</div>

			{/* 印章装饰 */}
			<div className="absolute bottom-6 right-6 w-12 h-12 opacity-15 pointer-events-none">
				<div className="w-full h-full border-2 border-zhusha rounded-sm flex items-center justify-center rotate-12">
					<span className="text-zhusha text-xs font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>绘</span>
				</div>
			</div>

			<div className={`transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
				{/* 标题区域 */}
				<div className="mb-6 text-center pb-4 border-b-2 border-ink/10 relative">
					<div className="absolute left-1/2 -translate-x-1/2 top-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-zhusha/50 to-transparent" />
					<h2 className="text-2xl font-semibold text-ink-deep mb-2 tracking-[0.3em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						Paper.js
					</h2>
					<p className="text-ink-medium text-sm tracking-[0.2em] mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						把矢量画稿变成灵动生命的插画师
					</p>
					<div className="flex justify-center">
						<a href="http://paperjs.org/" target="_blank" rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300">
							<span>paperjs.org</span>
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
					<canvas
						ref={canvasRef}
						width={550}
						height={400}
						className="w-full h-full"
					/>
					{!isPaperLoaded && (
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
							📜 核心 API
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							<div className="p-3 bg-paper/60 rounded border border-ink/5">
								<code className="text-zhusha font-bold">Path</code>
								<span className="text-ink-light block text-[10px] mt-1">矢量路径绘制</span>
							</div>
							<div className="p-3 bg-paper/60 rounded border border-ink/5">
								<code className="text-daiqing font-bold">Shape</code>
								<span className="text-ink-light block text-[10px] mt-1">圆形/矩形/多边形</span>
							</div>
							<div className="p-3 bg-paper/60 rounded border border-ink/5">
								<code className="text-zhushi font-bold">view.onFrame</code>
								<span className="text-ink-light block text-[10px] mt-1">动画帧循环</span>
							</div>
						</div>
					</div>
				</div>

				{/* 特性统计 */}
				<div className="mt-6 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						{[
							{ icon: "✏️", name: "基础绘图", desc: "矢量图形绘制" },
							{ icon: "🎬", name: "路径动画", desc: "流畅动画效果" },
							{ icon: "🖱️", name: "交互绘图", desc: "鼠标绘制路径" },
							{ icon: "🎨", name: "国风插画", desc: "竹梅山水图" },
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
						Paper.js 让每一笔都充满艺术灵魂，让矢量图形灵动起来
					</p>
				</div>
			</div>
		</div>
	)
}

export default PaperDemo
