import { useEffect, useRef, useState } from "react"
import { CanvasSpace, Pt, Circle, Curve } from "pts"

interface DemoSection {
	id: string
	title: string
	description: string
	codeExample: string
	keyPoints: string[]
}

const demoSections: DemoSection[] = [
	{
		id: "intro",
		title: "简介",
		description: "核心概念与设计理念",
		codeExample: "",
		keyPoints: [],
	},
	{
		id: "basic",
		title: "基础图形",
		description: "Pt、Group 与几何图元",
		codeExample: `// 创建点
const pt = new Pt(100, 200)

// 创建矩形并获取四角
const rect = Rectangle.fromCenter(center, 200)
const corners = Rectangle.corners(rect)

// 绘制多边形和圆形
form.strokeOnly("#c04851", 1).polygon(corners)
form.fillOnly("#c04851").circle(Circle.fromCenter(pt, 20))`,
		keyPoints: [
			"Pt - 二维/多维点的基本单位",
			"Group - 点的集合，可进行批量操作",
			"Rectangle/Circle - 几何图元工厂函数",
			"Form - 绑定 Space 的绘制工具",
		],
	},
	{
		id: "animation",
		title: "动态动画",
		description: "时间循环与运动轨迹",
		codeExample: `// 动画循环
space.add((time, ftime) => {
  // Num.cycle 创建周期动画 (0-1)
  const cycle = Num.cycle(time / 2000)

  // 圆周运动
  const angle = time / 1000
  const x = center.x + Math.cos(angle) * radius
  const y = center.y + Math.sin(angle) * radius

  // B-spline 曲线轨迹
  const curve = Curve.bspline(points)
  form.strokeOnly("#c04851", 2).polygon(curve)
})`,
		keyPoints: [
			"time 参数 - 动画时间轴",
			"Num.cycle - 周期函数 (0-1)",
			"Curve.bspline - 平滑曲线插值",
			"轨迹记录 - 数组存储历史位置",
		],
	},
	{
		id: "interaction",
		title: "交互效果",
		description: "鼠标跟随与粒子系统",
		codeExample: `// 获取鼠标位置
const pointer = space.pointer

// 绑定交互事件
space.bindMouse().bindTouch().play()

// 粒子系统
interface Particle {
  pt: Pt      // 位置
  vel: Pt     // 速度
  life: number // 生命
}

// 更新粒子
p.pt.x += p.vel.x
p.pt.y += p.vel.y`,
		keyPoints: ["space.pointer - 获取鼠标位置", "bindMouse/bindTouch - 绑定事件", "粒子生命周期管理", "距离检测与连线"],
	},
	{
		id: "visualization",
		title: "数据可视化",
		description: "曲线图表与动态数据",
		codeExample: `// 数据平滑过渡
dp.value += (dp.target - dp.value) * 0.05

// 创建数据点
const points = dataPoints.map((dp, i) => {
  const x = startX + (i / numPoints) * graphWidth
  const y = baseY - dp.value
  return new Pt(x, y)
})

// B-spline 曲线
const curve = Curve.bspline(points)
form.strokeOnly("#c04851", 2).polygon(curve)`,
		keyPoints: ["数据平滑过渡动画", "B-spline 曲线拟合", "柱状图绘制", "坐标轴与刻度"],
	},
]

const features = [
	{ title: "轻量级", desc: "核心库仅 ~12KB (gzip)，无外部依赖", icon: "○" },
	{ title: "数学优雅", desc: "将复杂运算以艺术形式呈现", icon: "△" },
	{ title: "类型安全", desc: "完整的 TypeScript 类型定义", icon: "□" },
	{ title: "模块化", desc: "Space、Form、Pt 三层架构", icon: "◇" },
]

const comparisons = [
	{ name: "Pts.js", math: "原生支持", creative: "核心优势", size: "~12KB" },
	{ name: "D3.js", math: "原生支持", creative: "一般", size: "~93KB" },
	{ name: "p5.js", math: "需要扩展", creative: "核心优势", size: "~1.3MB" },
	{ name: "Two.js", math: "原生支持", creative: "一般", size: "~180KB" },
]

const coreConcepts = [
	{
		name: "Pt (点)",
		desc: "最基础的图元，表示二维或多维空间中的一个点",
		code: `const pt = new Pt(100, 200)
pt.x = 150
pt.add(new Pt(10, 20))
pt.$subtract(another)`,
	},
	{
		name: "Group (点组)",
		desc: "点的集合，支持批量操作和几何变换",
		code: `const group = new Group(pt1, pt2, pt3)
group.rotate2D(Math.PI / 4, center)
form.polygon(group)`,
	},
	{
		name: "Space (空间)",
		desc: "画布容器，管理渲染循环和交互事件",
		code: `const space = new CanvasSpace("#canvas")
  .setup({ bgcolor: "#fff" })
space.add((time) => { /* 动画 */ })
space.bindMouse().play()`,
	},
	{
		name: "Form (形式)",
		desc: "绑定 Space 的绘制工具",
		code: `const form = space.getForm()
form.fill("#c04851").point(pt, 10)
form.stroke("#333", 2).line([pt1, pt2])`,
	},
]

function PtsDemo() {
	const containerRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const spaceRef = useRef<CanvasSpace | null>(null)
	const [activeSection, setActiveSection] = useState<string>("intro")
	const [isLoaded, setIsLoaded] = useState(false)
	const [showCode, setShowCode] = useState(true)
	const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (activeSection === "intro") {
			setShouldRenderCanvas(false)
			return
		}

		setShouldRenderCanvas(true)
	}, [activeSection])

	useEffect(() => {
		if (!canvasRef.current || activeSection === "intro" || !shouldRenderCanvas) return

		if (spaceRef.current) {
			spaceRef.current.stop()
			spaceRef.current.removeAll()
		}

		const space = new CanvasSpace(canvasRef.current).setup({
			bgcolor: "#f5f5f0",
			retina: true,
		})
		spaceRef.current = space

		const form = space.getForm()

		if (activeSection === "basic") {
			runBasicDemo(space, form)
		} else if (activeSection === "animation") {
			runAnimationDemo(space, form)
		} else if (activeSection === "interaction") {
			runInteractionDemo(space, form)
		} else if (activeSection === "visualization") {
			runVisualizationDemo(space, form)
		}

		space.bindMouse().bindTouch().play()

		return () => {
			space.stop()
			space.removeAll()
		}
	}, [activeSection, shouldRenderCanvas])

	const currentSection = demoSections.find((s) => s.id === activeSection)

	return (
		<div
			ref={containerRef}
			className='relative bg-paper border border-ink/10 rounded-ink max-w-4xl mx-auto overflow-hidden'>
			<div className='absolute top-0 right-0 w-40 h-40 opacity-[0.02] pointer-events-none'>
				<svg viewBox='0 0 100 100' className='w-full h-full'>
					<circle
						cx='70'
						cy='30'
						r='50'
						fill='none'
						stroke='currentColor'
						strokeWidth='0.3'
						className='text-ink-deep'
					/>
					<circle
						cx='70'
						cy='30'
						r='30'
						fill='none'
						stroke='currentColor'
						strokeWidth='0.2'
						className='text-ink-deep'
					/>
				</svg>
			</div>

			<div
				className={`transition-all duration-700 ease-out ${
					isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
				}`}>
				<div className='p-6 border-b border-ink/10'>
					<div className='flex items-center gap-3 mb-4'>
						<div className='w-2 h-8 bg-gradient-to-b from-zhusha to-zhusha/60 rounded-full' />
						<span className='text-xs text-ink-medium tracking-[0.2em] uppercase font-display'>工具库</span>
					</div>
					<h1 className='text-2xl font-display font-bold text-ink-deep mb-2 tracking-wide'>Pts.js</h1>
					<p className='text-ink-medium text-sm max-w-2xl leading-relaxed'>
						将数学运算以优雅的艺术形式呈现，为创意编程而生
					</p>
				</div>

				<div className='flex border-b border-ink/10'>
					{demoSections.map((section) => (
						<button
							key={section.id}
							onClick={() => setActiveSection(section.id)}
							className={`px-4 py-3 text-xs font-medium transition-all duration-300 relative ${
								activeSection === section.id ? "text-zhusha" : "text-ink-medium hover:text-ink-thick"
							}`}>
							{section.title}
							{activeSection === section.id && <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-zhusha' />}
						</button>
					))}
				</div>

				<div className='min-h-[400px]'>
					{activeSection === "intro" ? (
						<div className='p-6 space-y-6'>
							<div>
								<h3 className='text-sm font-semibold text-ink-thick mb-3'>核心功能</h3>
								<div className='grid grid-cols-2 gap-3'>
									{features.map((f) => (
										<div key={f.title} className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
											<div className='flex items-center gap-2 mb-1'>
												<span className='text-zhusha font-mono'>{f.icon}</span>
												<span className='text-sm font-medium text-ink-thick'>{f.title}</span>
											</div>
											<p className='text-xs text-ink-medium'>{f.desc}</p>
										</div>
									))}
								</div>
							</div>

							<div>
								<h3 className='text-sm font-semibold text-ink-thick mb-3'>核心概念</h3>
								<div className='space-y-3'>
									{coreConcepts.map((concept) => (
										<div key={concept.name} className='p-4 bg-paper-warm/30 rounded-lg border border-ink/5'>
											<h4 className='text-sm font-medium text-ink-thick mb-1'>{concept.name}</h4>
											<p className='text-xs text-ink-medium mb-2'>{concept.desc}</p>
											<pre className='text-[10px] font-mono text-ink-light bg-paper-warm/50 p-2 rounded overflow-x-auto'>
												<code>{concept.code}</code>
											</pre>
										</div>
									))}
								</div>
							</div>

							<div>
								<h3 className='text-sm font-semibold text-ink-thick mb-3'>适用场景</h3>
								<div className='flex flex-wrap gap-2'>
									{["创意编程", "生成艺术", "数据可视化", "交互动画", "教学演示", "原型设计"].map((s) => (
										<span
											key={s}
											className='px-3 py-1.5 text-xs bg-paper-warm/50 text-ink-medium rounded-full border border-ink/5'>
											{s}
										</span>
									))}
								</div>
							</div>

							<div>
								<h3 className='text-sm font-semibold text-ink-thick mb-3'>与其他库对比</h3>
								<div className='overflow-x-auto'>
									<table className='w-full text-xs'>
										<thead>
											<tr className='border-b border-ink/10'>
												<th className='text-left py-2 text-ink-medium font-medium'>库</th>
												<th className='text-left py-2 text-ink-medium font-medium'>数学运算</th>
												<th className='text-left py-2 text-ink-medium font-medium'>创意表达</th>
												<th className='text-left py-2 text-ink-medium font-medium'>体积</th>
											</tr>
										</thead>
										<tbody>
											{comparisons.map((c) => (
												<tr key={c.name} className='border-b border-ink/5'>
													<td className={`py-2 ${c.name === "Pts.js" ? "text-zhusha font-medium" : "text-ink-thick"}`}>
														{c.name}
													</td>
													<td className='py-2 text-ink-medium'>{c.math}</td>
													<td className='py-2 text-ink-medium'>{c.creative}</td>
													<td className='py-2 text-ink-medium font-mono'>{c.size}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							<div className='pt-4 border-t border-ink/10'>
								<a
									href='https://ptsjs.org'
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors group'>
									<span>访问官网 ptsjs.org</span>
									<span className='transition-transform duration-300 group-hover:translate-x-0.5'>→</span>
								</a>
							</div>
						</div>
					) : (
						<div className='flex flex-col lg:flex-row'>
							<div className='flex-1 relative min-h-[400px] p-4'>
								{shouldRenderCanvas && (
									<canvas ref={canvasRef} className='w-full h-full min-h-[350px] rounded-lg border border-ink/10' />
								)}
								{shouldRenderCanvas && (
									<div className='absolute bottom-4 left-4 px-2 py-1 bg-paper/80 backdrop-blur-sm rounded text-[10px] text-ink-light'>
										{currentSection?.description} · 移动鼠标交互
									</div>
								)}
							</div>

							<div className='lg:w-[280px] border-t lg:border-t-0 lg:border-l border-ink/10 p-4 bg-paper-warm/20'>
								<div className='flex items-center justify-between mb-3'>
									<h4 className='text-xs font-semibold text-ink-thick'>代码示例</h4>
									<button
										onClick={() => setShowCode(!showCode)}
										className='text-[10px] text-ink-light hover:text-zhusha transition-colors'>
										{showCode ? "收起" : "展开"}
									</button>
								</div>

								{showCode && currentSection && (
									<>
										<pre className='text-[10px] font-mono text-ink-light bg-paper-warm/50 p-3 rounded overflow-x-auto mb-4 leading-relaxed'>
											<code>{currentSection.codeExample}</code>
										</pre>

										<div className='mb-4'>
											<h5 className='text-[10px] font-semibold text-ink-medium mb-2'>关键点</h5>
											<ul className='space-y-1.5'>
												{currentSection.keyPoints.map((point, i) => (
													<li key={i} className='text-[10px] text-ink-light flex items-start gap-1.5'>
														<span className='text-zhusha mt-0.5'>•</span>
														<span>{point}</span>
													</li>
												))}
											</ul>
										</div>
									</>
								)}

								<div className='pt-3 border-t border-ink/5'>
									<a
										href='https://ptsjs.org/guide/'
										target='_blank'
										rel='noopener noreferrer'
										className='text-[10px] text-ink-light hover:text-zhusha transition-colors inline-flex items-center gap-1'>
										查看完整文档 →
									</a>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

function runBasicDemo(space: CanvasSpace, form: ReturnType<CanvasSpace["getForm"]>) {
	const player = (time: number) => {
		form.fillOnly("#faf9f6").rect([new Pt(0, 0), space.size])

		const center = space.center
		const baseSize = Math.min(space.width, space.height) * 0.35

		for (let ring = 0; ring < 5; ring++) {
			const radius = baseSize - ring * 28
			const sides = 6
			const points: Pt[] = []

			for (let i = 0; i < sides; i++) {
				const angleOffset = (time / 2500 + ring * 0.15) % (Math.PI * 2)
				const angle = (i / sides) * Math.PI * 2 + angleOffset
				const wobble = Math.sin(time / 800 + i * 0.5 + ring) * 4
				const x = center.x + Math.cos(angle) * (radius + wobble)
				const y = center.y + Math.sin(angle) * (radius + wobble)
				points.push(new Pt(x, y))
			}

			const alpha = 0.12 - ring * 0.02
			const gradientStart = `rgba(192, 72, 81, ${alpha})`
			const gradientEnd = `rgba(192, 72, 81, ${alpha * 0.3})`

			form.strokeOnly(gradientStart, 1.2).polygon(points)

			points.forEach((pt, i) => {
				const nextPt = points[(i + 1) % points.length]
				const midPt = new Pt((pt.x + nextPt.x) / 2, (pt.y + nextPt.y) / 2)
				const dotSize = 2.5 + Math.sin(time / 600 + i + ring) * 0.8
				form.fillOnly(`rgba(192, 72, 81, ${alpha * 0.6})`).point(midPt, dotSize)
			})
		}

		const innerRadius = baseSize * 0.25
		const numDots = 16
		for (let i = 0; i < numDots; i++) {
			const angle = (time / 1800 + (i / numDots) * Math.PI * 2) % (Math.PI * 2)
			const pulse = 1 + Math.sin(time / 400 + i * 0.3) * 0.15
			const x = center.x + Math.cos(angle) * innerRadius * pulse
			const y = center.y + Math.sin(angle) * innerRadius * pulse
			const size = 3.5 + Math.sin(time / 250 + i) * 1
			const alpha = 0.5 + Math.sin(time / 300 + i) * 0.15
			form.fillOnly(`rgba(192, 72, 81, ${alpha})`).point(new Pt(x, y), size)
		}

		const pointer = space.pointer
		if (pointer) {
			const dx = pointer.x - center.x
			const dy = pointer.y - center.y
			const dist = Math.sqrt(dx * dx + dy * dy)
			const maxDist = Math.min(space.width, space.height) / 2
			const influence = Math.max(0, 1 - dist / maxDist)

			if (influence > 0) {
				const rippleRadius = 25 + influence * 50 + Math.sin(time / 250) * 8
				form.strokeOnly(`rgba(192, 72, 81, ${influence * 0.25})`, 1).circle(Circle.fromCenter(pointer, rippleRadius))
				const rippleRadius2 = rippleRadius * 0.6
				form.strokeOnly(`rgba(192, 72, 81, ${influence * 0.15})`, 0.8).circle(Circle.fromCenter(pointer, rippleRadius2))
			}

			const pointerGlow = 18 + Math.sin(time / 300) * 5
			form.strokeOnly("rgba(192, 72, 81, 0.2)", 1).circle(Circle.fromCenter(pointer, pointerGlow))
			form.fillOnly("#c04851").point(pointer, 5)
		}

		form.fillOnly("#1a1917").point(center, 3.5)
	}

	space.add(player)
}

function runAnimationDemo(space: CanvasSpace, form: ReturnType<CanvasSpace["getForm"]>) {
	const trails: Pt[][] = []
	const maxTrails = 8
	const trailLength = 50

	for (let i = 0; i < maxTrails; i++) {
		trails.push([])
	}

	const player = (time: number) => {
		form.fillOnly("#faf9f6").rect([new Pt(0, 0), space.size])

		const center = space.center
		const baseRadius = Math.min(space.width, space.height) * 0.3

		for (let i = 0; i < maxTrails; i++) {
			const speed = 1500 + i * 180
			const angle = (time / speed + i * ((Math.PI * 2) / maxTrails)) % (Math.PI * 2)
			const radiusVariation = Math.sin(time / 1000 + i * 0.4) * 25
			const radius = baseRadius + radiusVariation
			const x = center.x + Math.cos(angle) * radius
			const y = center.y + Math.sin(angle) * radius
			const pt = new Pt(x, y)

			trails[i].unshift(pt)
			if (trails[i].length > trailLength) {
				trails[i].pop()
			}

			if (trails[i].length > 3) {
				const curve = Curve.bspline(trails[i])
				const alpha = 0.6 - (i / maxTrails) * 0.25
				const hue = 0 + (i / maxTrails) * 0.1
				form.strokeOnly(`rgba(192, 72, 81, ${alpha})`, 2.5 - i * 0.2).polygon(curve)
			}

			const size = 5 + Math.sin(time / 350 + i) * 1.8
			form.fillOnly("#c04851").point(pt, size)
		}

		const numRays = 24
		for (let i = 0; i < numRays; i++) {
			const angle = (time / 2500 + (i / numRays) * Math.PI * 2) % (Math.PI * 2)
			const innerR = 25
			const outerR = 55 + Math.sin(time / 500 + i * 0.4) * 18
			const x1 = center.x + Math.cos(angle) * innerR
			const y1 = center.y + Math.sin(angle) * innerR
			const x2 = center.x + Math.cos(angle) * outerR
			const y2 = center.y + Math.sin(angle) * outerR

			form.strokeOnly("rgba(26, 25, 23, 0.06)", 0.8).line([new Pt(x1, y1), new Pt(x2, y2)])
		}

		const pointer = space.pointer
		if (pointer) {
			const glowSize = 20 + Math.sin(time / 350) * 6
			form.strokeOnly("rgba(192, 72, 81, 0.18)", 1).circle(Circle.fromCenter(pointer, glowSize))
			const glowSize2 = glowSize * 0.65
			form.strokeOnly("rgba(192, 72, 81, 0.1)", 0.8).circle(Circle.fromCenter(pointer, glowSize2))
			form.fillOnly("#c04851").point(pointer, 5)
		}

		form.fillOnly("#1a1917").point(center, 4.5)
	}

	space.add(player)
}

function runInteractionDemo(space: CanvasSpace, form: ReturnType<CanvasSpace["getForm"]>) {
	interface Particle {
		pt: Pt
		vel: Pt
		life: number
		maxLife: number
		hue: number
	}

	const particles: Particle[] = []
	const maxParticles = 120

	const player = (time: number) => {
		form.fillOnly("#faf9f6").rect([new Pt(0, 0), space.size])

		const pointer = space.pointer || space.center

		if (particles.length < maxParticles && Math.random() < 0.5) {
			const angle = Math.random() * Math.PI * 2
			const speed = 0.4 + Math.random() * 1.8
			particles.push({
				pt: pointer.clone(),
				vel: new Pt(Math.cos(angle) * speed, Math.sin(angle) * speed),
				life: 100 + Math.random() * 80,
				maxLife: 100 + Math.random() * 80,
				hue: Math.random(),
			})
		}

		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i]

			p.vel.x *= 0.985
			p.vel.y *= 0.985
			p.vel.y += 0.02
			p.pt.x += p.vel.x
			p.pt.y += p.vel.y
			p.life -= 1

			const lifeRatio = p.life / p.maxLife
			const size = 2.5 + lifeRatio * 5
			const alpha = lifeRatio * 0.8

			form.fillOnly(`rgba(192, 72, 81, ${alpha})`).point(p.pt, size)

			if (p.life <= 0 || p.pt.x < 0 || p.pt.x > space.width || p.pt.y < 0 || p.pt.y > space.height) {
				particles.splice(i, 1)
			}
		}

		const connectionDist = 80
		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const dx = particles[i].pt.x - particles[j].pt.x
				const dy = particles[i].pt.y - particles[j].pt.y
				const dist = Math.sqrt(dx * dx + dy * dy)
				if (dist < connectionDist) {
					const alpha = (1 - dist / connectionDist) * 0.2
					form.strokeOnly(`rgba(192, 72, 81, ${alpha})`, 0.6).line([particles[i].pt, particles[j].pt])
				}
			}
		}

		const pointerGlow = 30 + Math.sin(time / 250) * 10
		form.strokeOnly("rgba(192, 72, 81, 0.22)", 1.2).circle(Circle.fromCenter(pointer, pointerGlow))
		const pointerGlow2 = pointerGlow * 0.6
		form.strokeOnly("rgba(192, 72, 81, 0.12)", 1).circle(Circle.fromCenter(pointer, pointerGlow2))
		form.fillOnly("#c04851").point(pointer, 7)
	}

	space.add(player)
}

function runVisualizationDemo(space: CanvasSpace, form: ReturnType<CanvasSpace["getForm"]>) {
	const dataPoints: { value: number; target: number }[] = []
	const numPoints = 12

	for (let i = 0; i < numPoints; i++) {
		dataPoints.push({
			value: 30 + Math.random() * 80,
			target: 30 + Math.random() * 80,
		})
	}

	const player = (time: number) => {
		form.fillOnly("#faf9f6").rect([new Pt(0, 0), space.size])

		const padding = 70
		const graphWidth = space.width - padding * 2
		const graphHeight = space.height - padding * 2
		const baseY = space.height - padding
		const startX = padding

		dataPoints.forEach((dp) => {
			dp.value += (dp.target - dp.value) * 0.025
			if (Math.random() < 0.006) {
				dp.target = 25 + Math.random() * 95
			}
		})

		const points: Pt[] = []
		dataPoints.forEach((dp, i) => {
			const x = startX + (i / (numPoints - 1)) * graphWidth
			const y = baseY - (dp.value / 130) * graphHeight
			points.push(new Pt(x, y))
		})

		if (points.length > 3) {
			const curve = Curve.bspline(points)
			form.strokeOnly("rgba(192, 72, 81, 0.5)", 2.5).polygon(curve)

			const areaPoints = [new Pt(startX, baseY), ...points, new Pt(startX + graphWidth, baseY)]
			form.fillOnly("rgba(192, 72, 81, 0.08)").polygon(areaPoints)
		}

		form.strokeOnly("rgba(26, 25, 23, 0.12)", 1).line([new Pt(startX, baseY), new Pt(startX + graphWidth, baseY)])
		form.strokeOnly("rgba(26, 25, 23, 0.12)", 1).line([new Pt(startX, padding), new Pt(startX, baseY)])

		for (let i = 0; i <= 5; i++) {
			const y = baseY - (i / 5) * graphHeight
			form.strokeOnly("rgba(26, 25, 23, 0.04)", 0.8).line([new Pt(startX, y), new Pt(startX + graphWidth, y)])
			const valueLabel = Math.round((i / 5) * 130)
			form.fillOnly("rgba(26, 25, 23, 0.4)").text(new Pt(startX - 30, y + 4), String(valueLabel))
		}

		points.forEach((p, i) => {
			const barHeight = (dataPoints[i].value / 130) * graphHeight
			const barWidth = (graphWidth / numPoints) * 0.65

			const barAlpha = 0.06 + (i / numPoints) * 0.06
			form
				.fillOnly(`rgba(192, 72, 81, ${barAlpha})`)
				.rect([new Pt(p.x - barWidth / 2, baseY), new Pt(p.x + barWidth / 2, baseY - barHeight)])

			const pulse = 1 + Math.sin(time / 350 + i * 0.4) * 0.25
			const dotSize = 5 * pulse
			form.fillOnly("#c04851").point(p, dotSize)
		})

		const pointer = space.pointer
		if (pointer) {
			const inGraph =
				pointer.x >= startX && pointer.x <= startX + graphWidth && pointer.y >= padding && pointer.y <= baseY

			if (inGraph) {
				const dataIndex = Math.round(((pointer.x - startX) / graphWidth) * (numPoints - 1))
				if (dataIndex >= 0 && dataIndex < numPoints) {
					const dp = dataPoints[dataIndex]
					const tooltipY = Math.max(padding + 20, Math.min(baseY - 20, pointer.y - 20))
					form.fillOnly("rgba(26, 25, 23, 0.75)").text(new Pt(pointer.x + 12, tooltipY), `${dp.value.toFixed(1)}`)

					const guideX = points[dataIndex].x
					form.strokeOnly("rgba(192, 72, 81, 0.2)", 0.8).line([new Pt(guideX, padding), new Pt(guideX, baseY)])
				}
			}

			form.fillOnly("#c04851").point(pointer, 5)
		}
	}

	space.add(player)
}

export default PtsDemo
