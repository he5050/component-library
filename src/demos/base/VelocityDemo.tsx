import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Velocity from "velocity-animate"
import { useDemoRuntime } from "./hooks/useDemoRuntime"

type VelocityTarget = Element | Element[] | NodeListOf<Element>
type VelocityProps = Record<string, number | string | number[] | string[]>
type VelocityOptions = {
	duration?: number
	delay?: number
	easing?: string | number[]
	complete?: () => void
	[key: string]: unknown
}
type DemoKey = "smooth" | "ui" | "stagger" | "ink" | "spring"

interface DemoRuntime {
	isActive: () => boolean
	animate: (target: VelocityTarget, properties: VelocityProps, options?: VelocityOptions) => Promise<void>
	stop: (target: Element | NodeListOf<Element>) => void
	setTimer: (callback: () => void, delay: number) => ReturnType<typeof setTimeout>
	addCleanup: (cleanup: () => void) => void
}

interface DemoScene {
	key: DemoKey
	name: string
	hint: string
	mount: (container: Element, runtime: DemoRuntime) => void
}

type VelocityCommand = "stop" | "finish" | "pause" | "resume" | "reverse"
interface VelocityFunction {
	(target: VelocityTarget, properties: VelocityProps, options?: VelocityOptions): Promise<unknown> | unknown
	(target: VelocityTarget, command: VelocityCommand): unknown
}

/** 兼容不同打包形态，返回可调用的 Velocity 函数。 */
function resolveVelocityFunction(): VelocityFunction | null {
	const raw = Velocity as unknown as { default?: unknown; Velocity?: unknown }
	if (typeof Velocity === "function") {
		return Velocity as unknown as VelocityFunction
	}
	if (raw && typeof raw.default === "function") {
		return raw.default as VelocityFunction
	}
	if (raw && typeof raw.Velocity === "function") {
		return raw.Velocity as VelocityFunction
	}
	if (typeof window !== "undefined") {
		const globalVelocity = (window as unknown as { Velocity?: unknown }).Velocity
		if (typeof globalVelocity === "function") {
			return globalVelocity as VelocityFunction
		}
	}
	return null
}

/** 提取 Velocity 属性动画的目标值。 */
function toTargetValue(value: number | string | number[] | string[]) {
	return Array.isArray(value) ? value[0] : value
}

/** 将目标集合标准化为元素数组。 */
function normalizeTargets(target: VelocityTarget): Element[] {
	if (Array.isArray(target)) return target
	if (target instanceof Element) return [target]
	return Array.from(target)
}

/** Velocity 不可用时的样式降级，避免场景完全不可见。 */
function applyFallbackStyles(target: VelocityTarget, properties: VelocityProps) {
	const elements = normalizeTargets(target)
	elements.forEach((element) => {
		if (!(element instanceof HTMLElement)) return
		const transforms: string[] = []

		Object.entries(properties).forEach(([key, rawValue]) => {
			const value = toTargetValue(rawValue)
			switch (key) {
				case "opacity":
					element.style.opacity = String(value)
					break
				case "borderRadius":
					element.style.borderRadius = String(value)
					break
				case "scale":
					transforms.push(`scale(${value})`)
					break
				case "translateX":
					transforms.push(`translateX(${typeof value === "number" ? `${value}px` : value})`)
					break
				case "translateY":
					transforms.push(`translateY(${typeof value === "number" ? `${value}px` : value})`)
					break
				case "rotateZ":
					transforms.push(`rotate(${typeof value === "number" ? `${value}deg` : value})`)
					break
				default:
					// 其余属性按 CSS 字符串写入
					element.style.setProperty(key, String(value))
			}
		})

		if (transforms.length > 0) {
			element.style.transform = transforms.join(" ")
		}
	})
}

/** 创建并挂载流畅链式动画场景。 */
function mountSmoothScene(container: Element, runtime: DemoRuntime) {
	const box = document.createElement("div")
	box.className = "velocity-box absolute"
	box.style.cssText = `
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #c83c3c 0%, #a03030 100%);
		border-radius: 12px;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		box-shadow: 0 8px 32px rgba(200, 60, 60, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	`

	const icon = document.createElement("span")
	icon.textContent = "墨"
	icon.style.cssText = `
		color: white;
		font-size: 24px;
		font-family: serif;
		font-weight: bold;
	`

	box.appendChild(icon)
	container.appendChild(box)

	const runChain = () => {
		if (!runtime.isActive()) return
		void runtime
			.animate(box, { translateX: 200, rotateZ: 180 }, { duration: 800, easing: "ease-in-out" })
			.then(() => runtime.animate(box, { scale: 1.3, borderRadius: "50%" }, { duration: 620, easing: "ease-out" }))
			.then(() =>
				runtime.animate(
					box,
					{ translateX: 0, rotateZ: 0, scale: 1, borderRadius: "12px" },
					{ duration: 820, easing: "ease-in-out" },
				),
			)
			.then(() => {
				if (!runtime.isActive()) return
				runtime.setTimer(runChain, 520)
			})
	}

	runChain()
}

/** 创建并挂载 UI 预置效果场景。 */
function mountUIScene(container: Element, runtime: DemoRuntime) {
	const wrapper = document.createElement("div")
	wrapper.className = "ui-demo-wrapper absolute inset-0 flex items-center justify-center gap-4"
	container.appendChild(wrapper)

	const fadeOut = (el: Element) => runtime.animate(el, { opacity: [0, 1] }, { duration: 420 })

	const effects = [
		{
			name: "淡入",
			color: "#c83c3c",
			enter: (el: Element, delay = 0) => runtime.animate(el, { opacity: [1, 0] }, { duration: 760, delay }),
		},
		{
			name: "滑入",
			color: "#2c2c2c",
			enter: (el: Element, delay = 0) => {
				if (el instanceof HTMLElement) {
					el.style.opacity = "0"
					el.style.transform = "translateY(36px)"
				}
				return runtime.animate(
					el,
					{ opacity: [1, 0], translateY: [0, 36] },
					{ duration: 820, easing: "ease-out", delay },
				)
			},
		},
		{
			name: "弹出",
			color: "#8b4513",
			enter: (el: Element, delay = 0) => {
				if (el instanceof HTMLElement) {
					el.style.opacity = "0"
					el.style.transform = "scale(0.5)"
				}
				return runtime.animate(el, { opacity: [1, 0], scale: [1, 0.5] }, { duration: 820, easing: "ease-out", delay })
			},
		},
	]

	effects.forEach((effect, index) => {
		const card = document.createElement("div")
		card.className = `ui-card ui-card-${index}`
		card.style.cssText = `
			width: 80px;
			height: 100px;
			background: ${effect.color};
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			opacity: 0;
			box-shadow: 0 4px 16px rgba(0,0,0,0.15);
		`

		const icon = document.createElement("div")
		icon.style.cssText = `
			width: 32px;
			height: 32px;
			border: 2px solid rgba(255,255,255,0.6);
			border-radius: 50%;
		`

		const label = document.createElement("span")
		label.textContent = effect.name
		label.style.cssText = `
			color: white;
			font-size: 12px;
			font-family: serif;
			margin-top: 8px;
		`

		card.appendChild(icon)
		card.appendChild(label)
		wrapper.appendChild(card)

		runtime.setTimer(() => {
			void effect.enter(card, index * 200)
		}, 100)
	})

	const runCycle = () => {
		if (!runtime.isActive()) return
		effects.forEach((effect, index) => {
			const card = wrapper.querySelector(`.ui-card-${index}`)
			if (!card) return
			void fadeOut(card).then(() => effect.enter(card, index * 150))
		})
		runtime.setTimer(runCycle, 3900)
	}

	runtime.setTimer(runCycle, 1900)
}

/** 创建并挂载 stagger 交错动画场景。 */
function mountStaggerScene(container: Element, runtime: DemoRuntime) {
	const grid = document.createElement("div")
	grid.className = "stagger-grid absolute"
	grid.style.cssText = `
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 12px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	`
	container.appendChild(grid)

	const items: HTMLDivElement[] = []
	for (let i = 0; i < 15; i++) {
		const item = document.createElement("div")
		item.className = "stagger-item"
		const isRed = i % 3 === 0
		item.style.cssText = `
			width: 50px;
			height: 50px;
			background: ${isRed ? "linear-gradient(135deg, #c83c3c, #a03030)" : "linear-gradient(135deg, #555555, #333333)"};
			border-radius: ${isRed ? "4px" : "50%"};
			opacity: 0;
			transform: scale(0);
			box-shadow: 0 4px 12px rgba(0,0,0,0.2);
			display: flex;
			align-items: center;
			justify-content: center;
		`
		if (isRed) {
			const seal = document.createElement("span")
			seal.textContent = "印"
			seal.style.cssText = "color: white; font-size: 14px; font-family: serif;"
			item.appendChild(seal)
		}
		grid.appendChild(item)
		items.push(item)
	}

	const runSequence = () => {
		if (!runtime.isActive()) return

		// 手动交错入场
		items.forEach((item, index) => {
			runtime.setTimer(() => {
				// 先设置初始状态
				item.style.opacity = "0"
				item.style.transform = "scale(0)"
				void runtime.animate(
					item,
					{ opacity: 1, transform: ["scale(1)", "scale(0)"] },
					{
						duration: 520,
						easing: "ease-out",
					},
				)
			}, index * 70)
		})

		const inTotal = (items.length - 1) * 70 + 520
		runtime.setTimer(() => {
			// 手动交错退场
			items.forEach((item, index) => {
				runtime.setTimer(() => {
					void runtime.animate(
						item,
						{ opacity: 0, transform: ["scale(0)", "scale(1)"] },
						{
							duration: 380,
							easing: "ease-in",
						},
					)
				}, index * 45)
			})

			const outTotal = (items.length - 1) * 45 + 380
			runtime.setTimer(runSequence, outTotal + 420)
		}, inTotal + 900)
	}

	runSequence()
}

/** 创建并挂载水墨晕染场景。 */
function mountInkScene(container: Element, runtime: DemoRuntime) {
	const wrapper = document.createElement("div")
	wrapper.className = "ink-wrapper absolute inset-0"
	container.appendChild(wrapper)

	const createInkDot = (x: number, y: number, delay: number, size = 60) => {
		const dot = document.createElement("div")
		dot.className = "ink-dot"
		dot.style.cssText = `
			position: absolute;
			width: ${size}px;
			height: ${size}px;
			background: radial-gradient(circle, rgba(20,20,20,1) 0%, rgba(50,50,50,0.7) 35%, rgba(80,80,80,0.3) 60%, transparent 100%);
			border-radius: 50%;
			left: ${x}px;
			top: ${y}px;
			transform: translate(-50%, -50%) scale(0);
			opacity: 0;
			filter: blur(3px);
		`
		wrapper.appendChild(dot)

		runtime.setTimer(() => {
			// 先确保初始状态
			dot.style.opacity = "0"
			dot.style.transform = "translate(-50%, -50%) scale(0)"
			void runtime
				.animate(
					dot,
					{
						opacity: 0.85,
						transform: ["translate(-50%, -50%) scale(2.3)", "translate(-50%, -50%) scale(0)"],
					},
					{
						duration: 1700,
						easing: "ease-in-out",
					},
				)
				.then(() => runtime.animate(dot, { opacity: 0 }, { duration: 700 }))
		}, delay)
	}

	const runInkSequence = () => {
		if (!runtime.isActive()) return
		wrapper.innerHTML = ""
		const centerX = wrapper.clientWidth / 2
		const centerY = wrapper.clientHeight / 2

		createInkDot(centerX, centerY, 0, 80)
		for (let i = 0; i < 6; i++) {
			const angle = (i / 6) * Math.PI * 2
			const distance = 60 + Math.random() * 40
			const x = centerX + Math.cos(angle) * distance
			const y = centerY + Math.sin(angle) * distance
			createInkDot(x, y, 300 + i * 150, 40 + Math.random() * 20)
		}

		runtime.setTimer(runInkSequence, 3300)
	}

	runInkSequence()
}

/** 创建并挂载弹性交互场景。 */
function mountSpringScene(container: Element, runtime: DemoRuntime) {
	const wrapper = document.createElement("div")
	wrapper.className = "spring-wrapper absolute inset-0 flex items-center justify-center"
	container.appendChild(wrapper)

	const stamp = document.createElement("div")
	stamp.className = "spring-stamp"
	stamp.style.cssText = `
		width: 100px;
		height: 100px;
		border: 4px solid #c83c3c;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(200, 60, 60, 0.1);
		box-shadow: 0 8px 32px rgba(200, 60, 60, 0.3);
		cursor: pointer;
	`

	const text = document.createElement("span")
	text.textContent = "墨韵"
	text.style.cssText = `
		color: #c83c3c;
		font-size: 28px;
		font-family: serif;
		font-weight: bold;
	`

	stamp.appendChild(text)
	wrapper.appendChild(stamp)

	const handleClick = () => {
		if (!runtime.isActive()) return
		runtime.stop(stamp)
		void runtime
			.animate(stamp, { scale: 0.8 }, { duration: 100 })
			.then(() => runtime.animate(stamp, { scale: 1.1 }, { duration: 220, easing: "ease-out" }))
			.then(() => runtime.animate(stamp, { scale: 1 }, { duration: 320, easing: "ease-out" }))
	}

	stamp.addEventListener("click", handleClick)
	runtime.addCleanup(() => stamp.removeEventListener("click", handleClick))

	const runSpring = () => {
		if (!runtime.isActive()) return
		void runtime
			.animate(
				stamp,
				{
					scale: 1,
					rotateZ: 0,
				},
				{
					duration: 980,
					easing: "ease-out",
				},
			)
			.then(() => {
				runtime.setTimer(() => {
					void runtime.animate(stamp, { scale: 0.5, opacity: 0 }, { duration: 360 }).then(() => {
						// 重置状态
						stamp.style.opacity = "1"
						runtime.setTimer(runSpring, 140)
					})
				}, 1200)
			})
	}

	runSpring()
}

const DEMO_SCENES: DemoScene[] = [
	{
		key: "smooth",
		name: "流畅动画",
		hint: "链式动画 · 流畅性能",
		mount: mountSmoothScene,
	},
	{
		key: "ui",
		name: "UI 特效",
		hint: "UI Pack · 预置特效",
		mount: mountUIScene,
	},
	{
		key: "stagger",
		name: "交错序列",
		hint: "交错动画 · stagger",
		mount: mountStaggerScene,
	},
	{
		key: "ink",
		name: "水墨晕染",
		hint: "水墨晕染 · 国风动效",
		mount: mountInkScene,
	},
	{
		key: "spring",
		name: "弹性交互",
		hint: "弹性动画 · spring easing",
		mount: mountSpringScene,
	},
]

/** 获取安全的场景对象，避免索引越界。 */
function getSceneByIndex(index: number) {
	return DEMO_SCENES[index] || DEMO_SCENES[0]
}

function VelocityDemo() {
	const [activeDemo, setActiveDemo] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const { isRunActive, addCleanup, clearRunResources, beginRun, stopRun, setRunTimer } = useDemoRuntime()
	const velocityFn = useMemo(() => resolveVelocityFunction(), [])

	/** 安全停止 Velocity 动画，避免 stop 抛错中断流程。 */
	const stopVelocity = useCallback(
		(target: Element | NodeListOf<Element>) => {
			if (!velocityFn) return
			try {
				velocityFn(target, "stop")
			} catch {
				// stop 失败通常由节点销毁导致，直接忽略
			}
		},
		[velocityFn],
	)

	/** 清空演示区域，并同步停止所有运行中的动画与资源。 */
	const clearDemoArea = useCallback(() => {
		clearRunResources()
		if (!containerRef.current) return
		const demoArea = containerRef.current.querySelector(".demo-area")
		if (!demoArea) return
		stopVelocity(demoArea.querySelectorAll("*"))
		stopVelocity(demoArea)
		demoArea.innerHTML = ""
	}, [clearRunResources, stopVelocity])

	/** 基于当前 runId 生成场景运行时能力。 */
	const createRuntime = useCallback(
		(runId: number): DemoRuntime => {
			const animate = (target: VelocityTarget, properties: VelocityProps, options: VelocityOptions = {}) => {
				if (!isRunActive(runId)) return Promise.resolve()
				if (!velocityFn) {
					// 降级策略：无 Velocity 时不阻塞循环，同时保证场景可继续执行
					applyFallbackStyles(target, properties)
					return Promise.resolve()
				}
				return new Promise<void>((resolve) => {
					let settled = false
					const resolveOnce = () => {
						if (settled) return
						settled = true
						resolve()
					}

					const fallbackDelay =
						(typeof options.delay === "number" ? options.delay : 0) +
						(typeof options.duration === "number" ? options.duration : 0) +
						120
					setRunTimer(runId, resolveOnce, Math.max(200, fallbackDelay))

					try {
						const originalComplete = options.complete
						const nextOptions: VelocityOptions = {
							...options,
							complete: () => {
								if (typeof originalComplete === "function") {
									try {
										originalComplete()
									} catch {
										// 用户回调异常不阻塞主流程
									}
								}
								resolveOnce()
							},
						}
						const result = velocityFn(target, properties, nextOptions)
						if (result && typeof (result as { then?: unknown }).then === "function") {
							;(result as Promise<unknown>).then(() => resolveOnce()).catch(() => resolveOnce())
						}
					} catch {
						resolveOnce()
					}
				})
			}

			return {
				isActive: () => isRunActive(runId),
				animate,
				stop: stopVelocity,
				setTimer: (callback, delay) => setRunTimer(runId, callback, delay),
				addCleanup,
			}
		},
		[addCleanup, isRunActive, setRunTimer, stopVelocity, velocityFn],
	)

	/** 启动指定场景。 */
	const runScene = useCallback(
		(sceneIndex: number, runtime: DemoRuntime) => {
			clearDemoArea()
			if (!containerRef.current) return
			const demoArea = containerRef.current.querySelector(".demo-area")
			if (!demoArea) return
			const scene = getSceneByIndex(sceneIndex)
			scene.mount(demoArea, runtime)
		},
		[clearDemoArea],
	)

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (!isLoaded) return
		const runId = beginRun()
		const runtime = createRuntime(runId)
		runScene(activeDemo, runtime)

		return () => {
			if (isRunActive(runId)) stopRun()
			clearDemoArea()
		}
	}, [activeDemo, isLoaded, beginRun, createRuntime, runScene, isRunActive, stopRun, clearDemoArea])

	const currentScene = getSceneByIndex(activeDemo)

	return (
		<div className='relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden'>
			{/* 装饰背景 */}
			<div className='absolute top-0 right-0 w-40 h-40 opacity-[0.02] pointer-events-none'>
				<svg viewBox='0 0 100 100' className='w-full h-full'>
					<circle
						cx='80'
						cy='20'
						r='60'
						fill='none'
						stroke='currentColor'
						strokeWidth='0.3'
						className='text-ink-deep'
					/>
					<circle
						cx='80'
						cy='20'
						r='40'
						fill='none'
						stroke='currentColor'
						strokeWidth='0.2'
						className='text-ink-deep'
					/>
				</svg>
			</div>

			<div className='absolute bottom-8 right-8 w-12 h-12 opacity-10 pointer-events-none'>
				<div className='w-full h-full rounded-sm border-2 border-zhusha flex items-center justify-center'>
					<span className='text-zhusha text-xs font-bold' style={{ fontFamily: "serif" }}>
						速
					</span>
				</div>
			</div>

			<div
				className={`transition-all duration-700 ease-out ${
					isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
				}`}>
				{/* 标题区域 */}
				<div className='mb-6 text-center pb-4 border-b border-ink/10 relative'>
					<div className='absolute left-1/2 -translate-x-1/2 top-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-zhusha/30 to-transparent' />

					<h2 className='text-xl font-display font-semibold text-ink-deep mb-1.5 tracking-wider'>Velocity.js</h2>
					<p className='text-ink-medium text-sm tracking-wide mb-3'>性能与美感完美平衡的动画引擎</p>
					<a
						href='http://velocityjs.org/'
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300'>
						<span>velocityjs.org</span>
						<svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
							/>
						</svg>
					</a>
				</div>

				{/* 标签切换 */}
				<div className='mb-4'>
					<div className='flex gap-2 flex-wrap justify-center'>
						{DEMO_SCENES.map((scene, index) => (
							<button
								key={scene.key}
								onClick={() => setActiveDemo(index)}
								className={`px-4 py-2 text-sm tracking-widest rounded transition-all duration-300 ${
									activeDemo === index ? "bg-ink-deep text-paper" : "bg-ink/5 text-ink-medium hover:bg-ink/10"
								}`}
								style={{ fontFamily: "serif" }}>
								{scene.name}
							</button>
						))}
					</div>
				</div>

				{/* 演示区域 */}
				<div
					ref={containerRef}
					className='relative h-[220px] border border-ink/10 rounded-xl bg-paper-warm/30 overflow-hidden'>
					<div className='demo-area w-full h-full relative' />

					<div className='absolute bottom-2 right-2 text-xs text-ink-light/50'>{currentScene.hint}</div>
				</div>

				{/* 特性统计 */}
				<div className='mt-6 pt-5 border-t border-ink/10'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>~23KB</div>
							<div className='text-xs text-ink-light'>压缩体积</div>
						</div>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>60fps</div>
							<div className='text-xs text-ink-light'>流畅性能</div>
						</div>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>UI Pack</div>
							<div className='text-xs text-ink-light'>预置动画</div>
						</div>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>Chain</div>
							<div className='text-xs text-ink-light'>链式调用</div>
						</div>
					</div>
				</div>

				<div className='mt-4 text-center text-xs text-ink-light'>
					<p className='tracking-wide'>点击上方标签切换不同动画演示效果</p>
				</div>
			</div>
		</div>
	)
}

export default VelocityDemo
