import { useEffect, useRef, useState } from "react"

// Bounce.js 类型声明
interface BounceOptions {
	from: { x?: number; y?: number } | number
	to: { x?: number; y?: number } | number
	duration?: number
	delay?: number
	easing?: "bounce" | "sway" | "hardbounce" | "hardsway"
	bounces?: number
	stiffness?: number
}

interface BounceInstance {
	scale: (options: BounceOptions) => BounceInstance
	rotate: (options: Omit<BounceOptions, "from" | "to"> & { from: number; to: number }) => BounceInstance
	translate: (options: BounceOptions) => BounceInstance
	skew: (options: BounceOptions) => BounceInstance
	define: (name: string) => string
	applyTo: (elements: Element | Element[] | NodeListOf<Element>, options?: { loop?: boolean; remove?: boolean; onComplete?: () => void }) => void
	remove: () => void
}

declare class Bounce {
	constructor()
	scale(options: BounceOptions): BounceInstance
	rotate(options: Omit<BounceOptions, "from" | "to"> & { from: number; to: number }): BounceInstance
	translate(options: BounceOptions): BounceInstance
	skew(options: BounceOptions): BounceInstance
	define(name: string): string
	applyTo(elements: Element | Element[] | NodeListOf<Element>, options?: { loop?: boolean; remove?: boolean; onComplete?: () => void }): void
	remove(): void
	static isSupported(): boolean
}

declare global {
	interface Window {
		Bounce: typeof Bounce
	}
}

function BounceDemo() {
	const [activeDemo, setActiveDemo] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const [isBounceLoaded, setIsBounceLoaded] = useState(false)
	const demoAreaRef = useRef<HTMLDivElement>(null)
	const bounceRef = useRef<BounceInstance | null>(null)
	const animationRef = useRef<number | null>(null)

	const demoTabs = [
		{ name: "弹跳缩放", key: "scale" },
		{ name: "旋转舞蹈", key: "rotate" },
		{ name: "弹性位移", key: "translate" },
		{ name: "倾斜摆动", key: "skew" },
		{ name: "组合动画", key: "combo" },
	]

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	// 加载 Bounce.js 库
	useEffect(() => {
		if (typeof window === "undefined") return

		if (window.Bounce) {
			setIsBounceLoaded(true)
			return
		}

		const script = document.createElement("script")
		script.src = "https://cdn.jsdelivr.net/npm/bounce.js@0.8.2/bounce.min.js"
		script.async = true
		script.onload = () => setIsBounceLoaded(true)
		document.head.appendChild(script)

		return () => {
			document.head.removeChild(script)
		}
	}, [])

	// 清理动画
	const cleanupAnimation = () => {
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current)
			animationRef.current = null
		}
		if (bounceRef.current) {
			bounceRef.current.remove()
			bounceRef.current = null
		}
		if (demoAreaRef.current) {
			demoAreaRef.current.innerHTML = ""
		}
	}

	// 运行演示
	const runDemo = (index: number) => {
		if (!isBounceLoaded || !demoAreaRef.current || typeof window === "undefined" || !window.Bounce) return

		cleanupAnimation()

		const container = demoAreaRef.current
		const BounceClass = window.Bounce

		switch (demoTabs[index].key) {
			case "scale":
				mountScaleDemo(container, BounceClass)
				break
			case "rotate":
				mountRotateDemo(container, BounceClass)
				break
			case "translate":
				mountTranslateDemo(container, BounceClass)
				break
			case "skew":
				mountSkewDemo(container, BounceClass)
				break
			case "combo":
				mountComboDemo(container, BounceClass)
				break
		}
	}

	// 弹跳缩放演示
	const mountScaleDemo = (container: HTMLDivElement, BounceClass: typeof Bounce) => {
		const element = createDemoElement("🏀", "#c83c3c")
		container.appendChild(element)

		const runAnimation = () => {
			const bounce = new BounceClass()
			bounce.scale({
				from: { x: 0.5, y: 0.5 },
				to: { x: 1, y: 1 },
				duration: 1000,
				easing: "bounce",
				bounces: 6,
				stiffness: 3,
			})
			bounce.applyTo(element, {
				onComplete: () => {
					animationRef.current = requestAnimationFrame(() => {
						setTimeout(runAnimation, 500)
					})
				},
			})
			bounceRef.current = bounce
		}

		runAnimation()
	}

	// 旋转舞蹈演示
	const mountRotateDemo = (container: HTMLDivElement, BounceClass: typeof Bounce) => {
		const element = createDemoElement("💃", "#8b5cf6")
		container.appendChild(element)

		const runAnimation = () => {
			const bounce = new BounceClass()
			bounce.rotate({
				from: 0,
				to: 360,
				duration: 1200,
				easing: "sway",
				bounces: 4,
				stiffness: 2,
			})
			bounce.applyTo(element, {
				onComplete: () => {
					animationRef.current = requestAnimationFrame(() => {
						setTimeout(runAnimation, 300)
					})
				},
			})
			bounceRef.current = bounce
		}

		runAnimation()
	}

	// 弹性位移演示
	const mountTranslateDemo = (container: HTMLDivElement, BounceClass: typeof Bounce) => {
		const element = createDemoElement("🚀", "#3b82f6")
		container.appendChild(element)

		const runAnimation = () => {
			// 向右弹跳
			const bounceRight = new BounceClass()
			bounceRight.translate({
				from: { x: -100, y: 0 },
				to: { x: 100, y: 0 },
				duration: 800,
				easing: "bounce",
				bounces: 5,
				stiffness: 3,
			})
			bounceRight.applyTo(element, {
				onComplete: () => {
					// 向左弹跳
					const bounceLeft = new BounceClass()
					bounceLeft.translate({
						from: { x: 100, y: 0 },
						to: { x: -100, y: 0 },
						duration: 800,
						easing: "bounce",
						bounces: 5,
						stiffness: 3,
					})
					bounceLeft.applyTo(element, {
						onComplete: () => {
							animationRef.current = requestAnimationFrame(() => {
								setTimeout(runAnimation, 300)
							})
						},
					})
					bounceRef.current = bounceLeft
				},
			})
			bounceRef.current = bounceRight
		}

		runAnimation()
	}

	// 倾斜摆动演示
	const mountSkewDemo = (container: HTMLDivElement, BounceClass: typeof Bounce) => {
		const element = createDemoElement("🌊", "#10b981")
		container.appendChild(element)

		const runAnimation = () => {
			const bounce = new BounceClass()
			bounce.skew({
				from: { x: 0, y: 0 },
				to: { x: 20, y: 0 },
				duration: 800,
				easing: "sway",
				bounces: 6,
				stiffness: 2,
			})
			bounce.applyTo(element, {
				onComplete: () => {
					// 反向倾斜
					const bounceBack = new BounceClass()
					bounceBack.skew({
						from: { x: 20, y: 0 },
						to: { x: -20, y: 0 },
						duration: 800,
						easing: "sway",
						bounces: 6,
						stiffness: 2,
					})
					bounceBack.applyTo(element, {
						onComplete: () => {
							animationRef.current = requestAnimationFrame(() => {
								setTimeout(runAnimation, 300)
							})
						},
					})
					bounceRef.current = bounceBack
				},
			})
			bounceRef.current = bounce
		}

		runAnimation()
	}

	// 组合动画演示
	const mountComboDemo = (container: HTMLDivElement, BounceClass: typeof Bounce) => {
		const element = createDemoElement("✨", "#f59e0b")
		container.appendChild(element)

		const runAnimation = () => {
			const bounce = new BounceClass()
			bounce
				.translate({
					from: { x: -150, y: 0 },
					to: { x: 0, y: 0 },
					duration: 600,
					stiffness: 4,
				})
				.scale({
					from: { x: 0.1, y: 0.1 },
					to: { x: 1, y: 1 },
					easing: "bounce",
					duration: 800,
					delay: 100,
					stiffness: 3,
				})
				.rotate({
					from: -180,
					to: 0,
					easing: "sway",
					duration: 1000,
					delay: 200,
				})
			bounce.applyTo(element, {
				onComplete: () => {
					animationRef.current = requestAnimationFrame(() => {
						setTimeout(runAnimation, 800)
					})
				},
			})
			bounceRef.current = bounce
		}

		runAnimation()
	}

	// 创建演示元素
	const createDemoElement = (emoji: string, color: string) => {
		const element = document.createElement("div")
		element.className = "bounce-demo-element"
		element.style.cssText = `
			width: 80px;
			height: 80px;
			background: ${color};
			border-radius: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 36px;
			box-shadow: 0 8px 24px ${color}40;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		`
		element.textContent = emoji
		return element
	}

	// 切换演示
	useEffect(() => {
		if (isBounceLoaded) {
			runDemo(activeDemo)
		}
		return cleanupAnimation
	}, [activeDemo, isBounceLoaded])

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
					<span className="text-zhusha text-xs font-bold" style={{ fontFamily: "serif" }}>舞</span>
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
						Bounce.js
					</h2>
					<p className="text-ink-medium text-sm tracking-wide mb-3">让元素跳跃起舞的舞蹈导演</p>
					<div className="flex justify-center">
						<a
							href="https://github.com/tictail/bounce.js"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300"
						>
							<span>github.com/tictail/bounce.js</span>
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
								onClick={() => setActiveDemo(index)}
								className={`px-4 py-2 text-sm tracking-widest rounded transition-all duration-300 ${
									activeDemo === index
										? "bg-ink-deep text-paper"
										: "bg-ink/5 text-ink-medium hover:bg-ink/10"
								}`}
								style={{ fontFamily: "serif" }}
							>
								{tab.name}
							</button>
						))}
					</div>
				</div>

				{/* 演示区域 */}
				<div
					ref={demoAreaRef}
					className="relative h-[280px] border border-ink/10 rounded-xl bg-paper-warm/30 overflow-hidden"
				>
					{!isBounceLoaded && (
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="flex items-center gap-2 text-ink-medium">
								<div className="w-4 h-4 border-2 border-ink/20 border-t-zhusha rounded-full animate-spin" />
								<span className="text-sm">加载中...</span>
							</div>
						</div>
					)}
				</div>

				{/* 参数说明 */}
				<div className="mt-4 p-4 bg-paper-warm/50 rounded-lg border border-ink/5">
					<div className="text-xs text-ink-medium space-y-1">
						<p className="font-semibold text-ink-deep mb-2">动画参数说明：</p>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
							<div><span className="text-zhusha">duration</span> - 动画时长</div>
							<div><span className="text-zhusha">easing</span> - 缓动类型</div>
							<div><span className="text-zhusha">bounces</span> - 弹跳次数</div>
							<div><span className="text-zhusha">stiffness</span> - 弹性强度</div>
						</div>
					</div>
				</div>

				{/* 特性统计 */}
				<div className="mt-6 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Scale</div>
							<div className="text-xs text-ink-light">缩放弹跳</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Rotate</div>
							<div className="text-xs text-ink-light">旋转舞蹈</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Translate</div>
							<div className="text-xs text-ink-light">弹性位移</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Skew</div>
							<div className="text-xs text-ink-light">倾斜摆动</div>
						</div>
					</div>
				</div>

				<div className="mt-4 text-center text-xs text-ink-light">
					<p className="tracking-wide">Bounce.js 生成 CSS3 @keyframes 动画，性能优异，无需 JavaScript 持续运行</p>
				</div>
			</div>
		</div>
	)
}

export default BounceDemo
