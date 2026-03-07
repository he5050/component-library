import { useCallback, useEffect, useRef, useState } from "react"
import { animate, createTimeline, stagger } from "animejs"
import { useDemoRuntime } from "./hooks/useDemoRuntime"

interface AnimejsDemoProps {
	variant?: "basic" | "timeline" | "svg"
}

function AnimejsDemo({ variant = "basic" }: AnimejsDemoProps) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [activeDemo, setActiveDemo] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)
	const {
		isRunActive,
		addCleanup,
		clearRunResources,
		beginRun,
		stopRun,
	} = useDemoRuntime()

	const demoTabs = [
		{ name: "水墨晕染", key: "ink" },
		{ name: "笔触序列", key: "timeline" },
		{ name: "印章阵列", key: "stagger" },
		{ name: "山水描边", key: "svg" },
		{ name: "印章弹跳", key: "spring" },
	]

	const clearDemoArea = useCallback(() => {
		clearRunResources()
		if (!containerRef.current) return
		const demoArea = containerRef.current.querySelector(".demo-area")
		if (!demoArea) return
		demoArea.innerHTML = ""
	}, [clearRunResources])

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (!isLoaded) return
		const runId = beginRun()
		runDemo(activeDemo, runId)
		return () => {
			if (isRunActive(runId)) stopRun()
			clearDemoArea()
		}
	}, [activeDemo, isLoaded, beginRun, isRunActive, stopRun, clearDemoArea])

	/** 注册 anime 实例，切换/卸载时自动 pause。 */
	const registerAnimation = (animation: { pause: () => void }) => {
		addCleanup(() => animation.pause())
		return animation
	}

	const runDemo = (demoIndex: number, runId: number) => {
		clearDemoArea()
		if (!containerRef.current) return
		const demoArea = containerRef.current.querySelector(".demo-area")
		if (!demoArea) return

		switch (demoIndex) {
			case 0:
				runInkDemo(demoArea, runId)
				break
			case 1:
				runTimelineDemo(demoArea, runId)
				break
			case 2:
				runStaggerDemo(demoArea, runId)
				break
			case 3:
				runSvgDemo(demoArea, runId)
				break
			case 4:
				runSpringDemo(demoArea, runId)
				break
		}
	}

	const runInkDemo = (container: Element, runId: number) => {
		if (!isRunActive(runId)) return
		for (let i = 0; i < 5; i++) {
			const dot = document.createElement("div")
			dot.className = "ink-dot absolute rounded-full"
			dot.style.cssText = `
				width: 20px;
				height: 20px;
				background: radial-gradient(circle, rgba(44,44,44,0.8) 0%, rgba(44,44,44,0.2) 50%, transparent 70%);
				left: ${50 + i * 60}px;
				top: 50%;
				transform: translateY(-50%);
			`
			container.appendChild(dot)
		}

		const dots = container.querySelectorAll(".ink-dot")
		registerAnimation(animate(dots, {
			scale: [0, 4],
			opacity: [1, 0],
			duration: 2000,
			delay: stagger(200),
			ease: "outExpo",
			loop: true,
		}))
	}

	const runTimelineDemo = (container: Element, runId: number) => {
		if (!isRunActive(runId)) return
		const strokes = ["一", "丨", "丿", "丶"]
		strokes.forEach((char) => {
			const stroke = document.createElement("div")
			stroke.className = "stroke-char absolute"
			stroke.style.cssText = `
				font-size: 48px;
				font-family: serif;
				color: #2c2c2c;
				left: ${60 + strokes.indexOf(char) * 70}px;
				top: 50%;
				transform: translateY(-50%);
				opacity: 0;
			`
			stroke.textContent = char
			container.appendChild(stroke)
		})

		const tl = createTimeline({
			loop: true,
		})
		const strokeNodes = container.querySelectorAll(".stroke-char")

		tl.add(strokeNodes, {
			opacity: [0, 1],
			duration: 400,
			delay: stagger(150),
			ease: "outQuad",
		}).add(strokeNodes, {
			opacity: [1, 0.3],
			duration: 600,
		})

		registerAnimation(tl)
	}

	const runStaggerDemo = (container: Element, runId: number) => {
		if (!isRunActive(runId)) return
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 4; col++) {
				const seal = document.createElement("div")
				seal.className = "seal-item absolute"
				seal.style.cssText = `
					width: 40px;
					height: 40px;
					border: 2px solid #c83c3c;
					border-radius: 4px;
					left: ${40 + col * 55}px;
					top: ${40 + row * 55}px;
					opacity: 0;
					transform: scale(0.8);
				`
				const inner = document.createElement("span")
				inner.style.cssText = `
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
					font-family: serif;
					font-size: 14px;
					color: #c83c3c;
				`
				inner.textContent = "墨"
				seal.appendChild(inner)
				container.appendChild(seal)
			}
		}

		const sealNodes = container.querySelectorAll(".seal-item")
		registerAnimation(animate(sealNodes, {
			scale: [0.8, 1],
			opacity: [0, 1],
			delay: stagger(80, { grid: [4, 3], from: "center" }),
			ease: "spring(1, 80, 10, 0)",
			loop: true,
		}))
	}

	const runSvgDemo = (container: Element, runId: number) => {
		if (!isRunActive(runId)) return
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		svg.setAttribute("viewBox", "0 0 300 150")
		svg.style.cssText = "width: 100%; height: 100%;"

		const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
		path1.setAttribute("d", "M20,100 Q80,20 150,80 T280,60")
		path1.setAttribute("fill", "none")
		path1.setAttribute("stroke", "#2c2c2c")
		path1.setAttribute("stroke-width", "2")
		path1.setAttribute("class", "mountain-path")

		const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
		path2.setAttribute("d", "M20,120 Q100,60 180,100 T280,90")
		path2.setAttribute("fill", "none")
		path2.setAttribute("stroke", "#c83c3c")
		path2.setAttribute("stroke-width", "1.5")
		path2.setAttribute("class", "mountain-path-2")

		svg.appendChild(path1)
		svg.appendChild(path2)
		container.appendChild(svg)

		const length1 = path1.getTotalLength()
		const length2 = path2.getTotalLength()
		path1.style.strokeDasharray = String(length1)
		path1.style.strokeDashoffset = String(length1)
		path2.style.strokeDasharray = String(length2)
		path2.style.strokeDashoffset = String(length2)

		registerAnimation(animate([path1, path2], {
			strokeDashoffset: [0],
			ease: "inOutSine",
			duration: 3000,
			alternate: true,
			loop: true,
		}))
	}

	const runSpringDemo = (container: Element, runId: number) => {
		if (!isRunActive(runId)) return
		const stamp = document.createElement("div")
		stamp.className = "stamp-item"
		stamp.style.cssText = `
			position: absolute;
			width: 80px;
			height: 80px;
			border: 3px solid #c83c3c;
			border-radius: 6px;
			left: calc(50% - 40px);
			top: calc(50% - 40px);
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(200, 60, 60, 0.1);
			transform: scale(0) rotate(45deg);
		`

		const inner = document.createElement("span")
		inner.style.cssText = `
			font-family: serif;
			font-size: 28px;
			color: #c83c3c;
			font-weight: bold;
		`
		inner.textContent = "墨韵"
		stamp.appendChild(inner)
		container.appendChild(stamp)

		registerAnimation(animate(stamp, {
			scale: [0, 1],
			rotate: [45, 0],
			ease: "outElastic(1, .5)",
			duration: 1500,
			loop: true,
			loopDelay: 500,
		}))
	}

	return (
		<div className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden">
			<div className="absolute top-0 right-0 w-40 h-40 opacity-[0.02] pointer-events-none">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					<circle cx="80" cy="20" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-ink-deep" />
					<circle cx="80" cy="20" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-ink-deep" />
				</svg>
			</div>

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
				<div className="mb-6 text-center pb-4 border-b border-ink/10 relative">
					<div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-zhusha/30 to-transparent" />

					<h2 className="text-xl font-display font-semibold text-ink-deep mb-1.5 tracking-wider">
						Anime.js
					</h2>
					<p className="text-ink-medium text-sm tracking-wide mb-3">把 CSS 动画玩成艺术的魔法师</p>
					<a
						href="https://animejs.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300"
					>
						<span>animejs.com</span>
						<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				</div>

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

				<div
					ref={containerRef}
					className="relative h-[200px] border border-ink/10 rounded-xl bg-paper-warm/30 overflow-hidden"
				>
					<div className="demo-area w-full h-full relative" />

					<div className="absolute bottom-2 right-2 text-xs text-ink-light/50">
						{demoTabs[activeDemo].key === "ink" && "水墨晕染 · scale + opacity"}
						{demoTabs[activeDemo].key === "timeline" && "笔触序列 · timeline + stagger"}
						{demoTabs[activeDemo].key === "stagger" && "印章阵列 · stagger grid"}
						{demoTabs[activeDemo].key === "svg" && "山水描边 · strokeDashoffset"}
						{demoTabs[activeDemo].key === "spring" && "印章弹跳 · spring easing"}
					</div>
				</div>

				<div className="mt-6 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">~17KB</div>
							<div className="text-xs text-ink-light">轻量体积</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">SVG</div>
							<div className="text-xs text-ink-light">路径动画</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Timeline</div>
							<div className="text-xs text-ink-light">时间轴</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Stagger</div>
							<div className="text-xs text-ink-light">交错动画</div>
						</div>
					</div>
				</div>

				<div className="mt-4 text-center text-xs text-ink-light">
					<p className="tracking-wide">点击上方标签切换不同动画演示效果</p>
				</div>
			</div>
		</div>
	)
}

export default AnimejsDemo
