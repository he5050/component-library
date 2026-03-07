import { useEffect, useRef, useState } from "react"

// Waypoints.js 类型声明
interface WaypointOptions {
	element: Element
	handler: (direction: "up" | "down") => void
	offset?: string | number | (() => number)
	context?: Element
	horizontal?: boolean
}

declare class Waypoint {
	constructor(options: WaypointOptions)
	destroy(): void
	disable(): void
	enable(): void
	next(): Waypoint | null
	previous(): Waypoint | null
	static destroyAll(): void
	static disableAll(): void
	static enableAll(): void
	static refreshAll(): void
	static viewportHeight(): number
	static viewportWidth(): number
}

declare global {
	interface Window {
		Waypoint: typeof Waypoint
	}
}

// 国风配色
const COLORS = {
	zhusha: "#c83c3c",      // 朱砂
	songyan: "#8b4513",     // 松烟墨
	xuanzhi: "#faf8f5",     // 宣纸白
	daiqing: "#4a6741",     // 黛青
	zhushi: "#d4a574",      // 赭石
	moshi: "#2c2c2c",       // 墨石
	cangshan: "#5c6b73",    // 苍山
	yunhui: "#8b8680",      // 云灰
}

function WaypointsDemo() {
	const [activeDemo, setActiveDemo] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const [isWaypointsLoaded, setIsWaypointsLoaded] = useState(false)
	const demoAreaRef = useRef<HTMLDivElement>(null)
	const waypointsRef = useRef<Waypoint[]>([])
	const styleRef = useRef<HTMLStyleElement | null>(null)

	const demoTabs = [
		{ name: "基础触发", key: "basic" },
		{ name: "偏移控制", key: "offset" },
		{ name: "进度追踪", key: "progress" },
		{ name: "水墨动画", key: "animation" },
	]

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	// 加载 Waypoints.js 库
	useEffect(() => {
		if (typeof window === "undefined") return
		if (window.Waypoint) {
			setIsWaypointsLoaded(true)
			return
		}
		const script = document.createElement("script")
		script.src = "https://cdn.jsdelivr.net/npm/waypoints@4.0.1/lib/noframework.waypoints.min.js"
		script.async = true
		script.onload = () => setIsWaypointsLoaded(true)
		document.head.appendChild(script)
		return () => { document.head.removeChild(script) }
	}, [])

	const cleanupWaypoints = () => {
		waypointsRef.current.forEach((wp) => wp.destroy())
		waypointsRef.current = []
	}

	const cleanupStyles = () => {
		if (styleRef.current && document.head.contains(styleRef.current)) {
			document.head.removeChild(styleRef.current)
			styleRef.current = null
		}
	}

	const runDemo = (index: number) => {
		if (!isWaypointsLoaded || !demoAreaRef.current || !window.Waypoint) return
		cleanupWaypoints()
		cleanupStyles()
		const container = demoAreaRef.current
		container.innerHTML = ""
		switch (demoTabs[index].key) {
			case "basic": mountBasicDemo(container); break
			case "offset": mountOffsetDemo(container); break
			case "progress": mountProgressDemo(container); break
			case "animation": mountAnimationDemo(container); break
		}
	}

	// 基础触发演示 - 国风山水版
	const mountBasicDemo = (container: HTMLDivElement) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col"
		wrapper.style.cssText = `
			background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%);
			font-family: "Noto Serif SC", "STSong", serif;
		`

		// 标题栏 - 卷轴风格
		const header = document.createElement("div")
		header.style.cssText = `
			padding: 12px 20px;
			background: linear-gradient(90deg, ${COLORS.songyan}, ${COLORS.zhushi});
			color: ${COLORS.xuanzhi};
			text-align: center;
			border-bottom: 3px double ${COLORS.zhusha};
			position: relative;
		`
		header.innerHTML = `
			<div style="font-size: 16px; letter-spacing: 8px; font-weight: bold;">🎯 触发计数</div>
			<div style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); 
				background: ${COLORS.zhusha}; padding: 4px 12px; border-radius: 4px; font-size: 14px;">
				<span id="trigger-count" style="color: #ffd700; font-weight: bold;">0</span> 次
			</div>
		`
		wrapper.appendChild(header)

		const scrollArea = document.createElement("div")
		scrollArea.className = "scroll-area flex-1 overflow-y-auto p-5 relative"

		// 触发线 - 朱砂红线
		const triggerLine = document.createElement("div")
		triggerLine.style.cssText = `
			position: fixed; left: 0; right: 0; height: 2px;
			background: linear-gradient(90deg, transparent, ${COLORS.zhusha}, transparent);
			top: 50%; z-index: 100; pointer-events: none;
		`
		triggerLine.innerHTML = `
			<span style="position: absolute; right: 30px; top: -10px; background: ${COLORS.zhusha}; 
				color: #fff; padding: 2px 10px; border-radius: 2px; font-size: 11px; letter-spacing: 2px;">
				触发线
			</span>
		`
		scrollArea.appendChild(triggerLine)

		// 山水元素
		const elements = [
			{ name: "远山", icon: "⛰️", color: COLORS.cangshan, desc: "远山如黛" },
			{ name: "流水", icon: "🌊", color: COLORS.daiqing, desc: "流水潺潺" },
			{ name: "竹林", icon: "🎋", color: COLORS.daiqing, desc: "竹影婆娑" },
			{ name: "云雾", icon: "☁️", color: COLORS.yunhui, desc: "云雾缭绕" },
			{ name: "落日", icon: "🌅", color: COLORS.zhusha, desc: "夕阳西下" },
		]

		elements.forEach((el, i) => {
			const section = document.createElement("div")
			section.className = `waypoint-section section-${i}`
			section.style.cssText = `
				height: 140px; margin-bottom: 16px;
				background: linear-gradient(135deg, ${COLORS.xuanzhi}, #f0ebe3);
				border: 2px solid ${COLORS.zhushi}60;
				border-radius: 8px;
				display: flex; flex-direction: column;
				align-items: center; justify-content: center;
				transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
				position: relative; overflow: hidden;
				box-shadow: 0 2px 8px rgba(139, 69, 19, 0.08);
			`

			// 水墨晕染背景
			const inkBg = document.createElement("div")
			inkBg.className = "ink-bg"
			inkBg.style.cssText = `
				position: absolute; top: 50%; left: 50%;
				width: 0; height: 0;
				background: radial-gradient(circle, ${el.color}30 0%, transparent 70%);
				border-radius: 50%; transform: translate(-50%, -50%);
				transition: all 0.8s ease;
				pointer-events: none;
			`
			section.appendChild(inkBg)

			const icon = document.createElement("div")
			icon.textContent = el.icon
			icon.style.cssText = `font-size: 36px; margin-bottom: 6px; transition: transform 0.5s; z-index: 1;`

			const name = document.createElement("div")
			name.textContent = el.name
			name.style.cssText = `
				font-size: 18px; font-weight: bold; color: ${el.color};
				letter-spacing: 6px; z-index: 1;
			`

			const desc = document.createElement("div")
			desc.textContent = el.desc
			desc.style.cssText = `
				font-size: 12px; color: ${COLORS.yunhui}; margin-top: 4px;
				letter-spacing: 2px; z-index: 1;
			`

			const status = document.createElement("div")
			status.className = "status"
			status.style.cssText = `
				margin-top: 8px; padding: 4px 14px;
				background: ${COLORS.zhushi}30; border-radius: 12px;
				font-size: 11px; color: ${COLORS.songyan};
				transition: all 0.3s; letter-spacing: 1px; z-index: 1;
			`
			status.textContent = "待触发"

			section.appendChild(icon)
			section.appendChild(name)
			section.appendChild(desc)
			section.appendChild(status)
			scrollArea.appendChild(section)

			let count = 0
			const waypoint = new window.Waypoint({
				element: section,
				handler: function (direction: "up" | "down") {
					count++
					const countEl = document.getElementById("trigger-count")
					if (countEl) countEl.textContent = count.toString()

					if (direction === "down") {
						section.style.borderColor = el.color
						section.style.borderWidth = "3px"
						section.style.boxShadow = `0 8px 24px ${el.color}40`
						inkBg.style.width = "300px"
						inkBg.style.height = "300px"
						icon.style.transform = "scale(1.2)"
						status.textContent = "已触发 ↓"
						status.style.background = el.color
						status.style.color = "#fff"
					} else {
						section.style.borderColor = `${COLORS.zhushi}60`
						section.style.borderWidth = "2px"
						section.style.boxShadow = "0 2px 8px rgba(139, 69, 19, 0.08)"
						inkBg.style.width = "0"
						inkBg.style.height = "0"
						icon.style.transform = "scale(1)"
						status.textContent = "已触发 ↑"
						status.style.background = COLORS.daiqing
						status.style.color = "#fff"
					}
				},
				offset: "50%",
			})
			waypointsRef.current.push(waypoint)
		})

		wrapper.appendChild(scrollArea)
		container.appendChild(wrapper)
	}

	// 偏移控制演示 - 国风版
	const mountOffsetDemo = (container: HTMLDivElement) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col"
		wrapper.style.cssText = `background: ${COLORS.xuanzhi}; font-family: "Noto Serif SC", serif;`

		const header = document.createElement("div")
		header.style.cssText = `
			padding: 10px 20px; background: ${COLORS.daiqing};
			color: ${COLORS.xuanzhi}; text-align: center; font-size: 13px; letter-spacing: 3px;
			border-bottom: 2px solid ${COLORS.zhushi};
		`
		header.textContent = "🎋 不同偏移位置的触发效果"
		wrapper.appendChild(header)

		const scrollArea = document.createElement("div")
		scrollArea.className = "scroll-area flex-1 overflow-y-auto p-5"

		const offsets = [
			{ value: "0%", label: "顶部", desc: "元素顶部到达视口顶部", color: COLORS.zhusha },
			{ value: "25%", label: "上四分", desc: "元素顶部到达视口25%", color: COLORS.zhushi },
			{ value: "50%", label: "中间", desc: "元素顶部到达视口中间", color: COLORS.daiqing },
			{ value: "75%", label: "下四分", desc: "元素顶部到达视口75%", color: COLORS.cangshan },
			{ value: "100%", label: "底部", desc: "元素顶部到达视口底部", color: COLORS.songyan },
		]

		offsets.forEach((offset, i) => {
			const section = document.createElement("div")
			section.style.cssText = `
				height: 130px; margin-bottom: 12px;
				background: linear-gradient(135deg, ${COLORS.xuanzhi}, #f5f0e8);
				border: 2px solid ${offset.color}40;
				border-radius: 8px;
				display: flex; flex-direction: column;
				align-items: center; justify-content: center;
				transition: all 0.5s ease;
				position: relative;
			`

			const marker = document.createElement("div")
			marker.style.cssText = `
				position: absolute; top: 0; left: 0; right: 0; height: 3px;
				background: ${offset.color}; opacity: 0.3; transition: all 0.3s;
			`

			const label = document.createElement("div")
			label.textContent = offset.label
			label.style.cssText = `
				font-size: 20px; font-weight: bold; color: ${offset.color};
				letter-spacing: 4px;
			`

			const value = document.createElement("div")
			value.textContent = offset.value
			value.style.cssText = `
				font-size: 14px; color: ${offset.color}; margin-top: 4px;
				font-family: monospace;
			`

			const desc = document.createElement("div")
			desc.textContent = offset.desc
			desc.style.cssText = `
				font-size: 11px; color: ${COLORS.yunhui}; margin-top: 6px;
				letter-spacing: 1px;
			`

			const status = document.createElement("div")
			status.style.cssText = `
				margin-top: 8px; padding: 3px 10px;
				background: ${COLORS.zhushi}20; border-radius: 10px;
				font-size: 10px; color: ${COLORS.yunhui};
				transition: all 0.3s;
			`
			status.textContent = "未触发"

			section.appendChild(marker)
			section.appendChild(label)
			section.appendChild(value)
			section.appendChild(desc)
			section.appendChild(status)
			scrollArea.appendChild(section)

			const waypoint = new window.Waypoint({
				element: section,
				handler: function (direction: "up" | "down") {
					if (direction === "down") {
						section.style.borderColor = offset.color
						section.style.borderWidth = "3px"
						section.style.background = `${offset.color}10`
						marker.style.opacity = "1"
						marker.style.height = "4px"
						status.textContent = "已触发"
						status.style.background = offset.color
						status.style.color = "#fff"
					} else {
						section.style.borderColor = `${offset.color}40`
						section.style.borderWidth = "2px"
						section.style.background = `linear-gradient(135deg, ${COLORS.xuanzhi}, #f5f0e8)`
						marker.style.opacity = "0.3"
						marker.style.height = "3px"
						status.textContent = "未触发"
						status.style.background = `${COLORS.zhushi}20`
						status.style.color = COLORS.yunhui
					}
				},
				offset: offset.value,
			})
			waypointsRef.current.push(waypoint)
		})

		wrapper.appendChild(scrollArea)
		container.appendChild(wrapper)
	}

	// 进度追踪演示 - 国风卷轴版
	const mountProgressDemo = (container: HTMLDivElement) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col"
		wrapper.style.cssText = `background: ${COLORS.xuanzhi}; font-family: "Noto Serif SC", serif;`

		// 卷轴进度条
		const progressHeader = document.createElement("div")
		progressHeader.style.cssText = `
			padding: 14px 20px;
			background: linear-gradient(90deg, ${COLORS.songyan}, ${COLORS.zhushi});
			border-bottom: 2px solid ${COLORS.zhusha};
		`

		const progressLabel = document.createElement("div")
		progressLabel.style.cssText = `
			display: flex; justify-content: space-between;
			font-size: 12px; color: ${COLORS.xuanzhi}; margin-bottom: 8px;
			letter-spacing: 2px;
		`
		progressLabel.innerHTML = `<span>📜 阅读进度</span><span id="progress-text" style="color: #ffd700; font-weight: bold;">0%</span>`

		const progressContainer = document.createElement("div")
		progressContainer.style.cssText = `
			height: 10px; background: rgba(255,255,255,0.15);
			border-radius: 5px; overflow: hidden;
			border: 1px solid ${COLORS.zhushi}60;
		`

		const progressBar = document.createElement("div")
		progressBar.id = "scroll-progress"
		progressBar.style.cssText = `
			height: 100%; width: 0%;
			background: linear-gradient(90deg, ${COLORS.zhusha}, ${COLORS.zhushi}, #ffd700);
			transition: width 0.1s linear; border-radius: 5px;
			box-shadow: 0 0 8px ${COLORS.zhusha}60;
		`

		progressContainer.appendChild(progressBar)
		progressHeader.appendChild(progressLabel)
		progressHeader.appendChild(progressContainer)
		wrapper.appendChild(progressHeader)

		const scrollArea = document.createElement("div")
		scrollArea.className = "scroll-area flex-1 overflow-y-auto p-5"

		// 卷轴内容
		const chapters = [
			{ name: "序章", icon: "📖", color: COLORS.zhusha },
			{ name: "起", icon: "🌅", color: COLORS.zhushi },
			{ name: "承", icon: "🎋", color: COLORS.daiqing },
			{ name: "转", icon: "🌊", color: COLORS.cangshan },
			{ name: "合", icon: "🏔️", color: COLORS.songyan },
		]

		for (let i = 0; i < 10; i++) {
			const chapter = chapters[i % chapters.length]
			const section = document.createElement("div")
			section.style.cssText = `
				height: 80px; margin-bottom: 10px;
				background: linear-gradient(90deg, ${chapter.color}10, transparent);
				border-left: 4px solid ${chapter.color};
				border-radius: 0 8px 8px 0;
				display: flex; align-items: center;
				padding-left: 16px;
				transition: all 0.4s ease;
			`
			section.innerHTML = `
				<span style="font-size: 20px; margin-right: 12px;">${chapter.icon}</span>
				<span style="color: ${chapter.color}; font-weight: bold; letter-spacing: 3px;">
					${chapter.name} · 第${i + 1}节
				</span>
			`
			scrollArea.appendChild(section)

			const waypoint = new window.Waypoint({
				element: section,
				handler: function (direction: "up" | "down") {
					if (direction === "down") {
						section.style.background = `${chapter.color}25`
						section.style.transform = "translateX(8px)"
					} else {
						section.style.background = `linear-gradient(90deg, ${chapter.color}10, transparent)`
						section.style.transform = "translateX(0)"
					}
				},
				offset: "50%",
			})
			waypointsRef.current.push(waypoint)
		}

		// 滚动进度更新
		scrollArea.addEventListener("scroll", () => {
			const scrollTop = scrollArea.scrollTop
			const scrollHeight = scrollArea.scrollHeight - scrollArea.clientHeight
			const progress = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0
			progressBar.style.width = progress + "%"
			const textEl = document.getElementById("progress-text")
			if (textEl) textEl.textContent = progress + "%"
		})

		wrapper.appendChild(scrollArea)
		container.appendChild(wrapper)
	}

	// 水墨动画演示 - 国风核心
	const mountAnimationDemo = (container: HTMLDivElement) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col"
		wrapper.style.cssText = `
			background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%);
			font-family: "Noto Serif SC", "STSong", serif;
		`

		// 添加水墨动画样式
		const style = document.createElement("style")
		style.textContent = `
			@keyframes inkSpread {
				0% { transform: scale(0); opacity: 0; }
				50% { opacity: 1; }
				100% { transform: scale(1.5); opacity: 0; }
			}
			@keyframes inkDrop {
				0% { transform: scale(0) translateY(-20px); opacity: 0; }
				30% { transform: scale(1) translateY(0); opacity: 1; }
				100% { transform: scale(1.2); opacity: 0.8; }
			}
			@keyframes brushStroke {
				0% { clip-path: inset(0 100% 0 0); }
				100% { clip-path: inset(0 0 0 0); }
			}
			@keyframes fadeInUp {
				from { opacity: 0; transform: translateY(30px); }
				to { opacity: 1; transform: translateY(0); }
			}
			@keyframes float {
				0%, 100% { transform: translateY(0); }
				50% { transform: translateY(-8px); }
			}
			.ink-spread {
				animation: inkSpread 1.2s ease-out forwards;
			}
			.ink-drop {
				animation: inkDrop 0.8s ease-out forwards;
			}
			.brush-stroke {
				animation: brushStroke 1s ease-out forwards;
			}
			.fade-in-up {
				animation: fadeInUp 0.6s ease-out forwards;
			}
			.float-anim {
				animation: float 3s ease-in-out infinite;
			}
			.ink-dot {
				position: absolute;
				border-radius: 50%;
				background: radial-gradient(circle, currentColor 0%, transparent 70%);
				pointer-events: none;
			}
		`
		document.head.appendChild(style)
		styleRef.current = style

		// 标题
		const header = document.createElement("div")
		header.style.cssText = `
			padding: 14px 20px;
			background: linear-gradient(90deg, ${COLORS.zhusha}, ${COLORS.zhushi});
			color: ${COLORS.xuanzhi};
			text-align: center;
			border-bottom: 3px double ${COLORS.songyan};
		`
		header.innerHTML = `
			<div style="font-size: 16px; letter-spacing: 6px; font-weight: bold;">
				🎨 水墨动画 · 国风韵律
			</div>
		`
		wrapper.appendChild(header)

		const scrollArea = document.createElement("div")
		scrollArea.className = "scroll-area flex-1 overflow-y-auto p-5"

		// 水墨动画元素
		const inkElements = [
			{ 
				name: "墨滴", 
				char: "墨", 
				color: COLORS.moshi,
				desc: "一点墨香",
				anim: "ink-drop"
			},
			{ 
				name: "朱砂", 
				char: "朱", 
				color: COLORS.zhusha,
				desc: "朱砂印记",
				anim: "ink-spread"
			},
			{ 
				name: "青竹", 
				char: "竹", 
				color: COLORS.daiqing,
				desc: "竹影清风",
				anim: "fade-in-up"
			},
			{ 
				name: "山水", 
				char: "山", 
				color: COLORS.cangshan,
				desc: "山水意境",
				anim: "brush-stroke"
			},
			{ 
				name: "云纹", 
				char: "云", 
				color: COLORS.yunhui,
				desc: "云卷云舒",
				anim: "float-anim"
			},
		]

		inkElements.forEach((el, i) => {
			const section = document.createElement("div")
			section.className = `ink-section section-${i}`
			section.style.cssText = `
				height: 120px; margin-bottom: 16px;
				background: linear-gradient(135deg, ${COLORS.xuanzhi}, #f5f0e8);
				border: 2px solid ${el.color}30;
				border-radius: 12px;
				display: flex; align-items: center; justify-content: center;
				position: relative; overflow: hidden;
				transition: all 0.4s ease;
			`

			// 水墨容器
			const content = document.createElement("div")
			content.className = "ink-content"
			content.style.cssText = `
				display: flex; flex-direction: column;
				align-items: center; gap: 6px;
				position: relative; z-index: 2;
				opacity: 0.4; transform: scale(0.9);
				transition: all 0.5s ease;
			`

			// 大字
			const char = document.createElement("div")
			char.textContent = el.char
			char.style.cssText = `
				font-size: 48px; font-weight: bold;
				color: ${el.color}; font-family: "STKaiti", "KaiTi", serif;
				text-shadow: 2px 2px 4px ${el.color}30;
			`

			// 名称
			const name = document.createElement("div")
			name.textContent = el.name
			name.style.cssText = `
				font-size: 14px; color: ${el.color};
				letter-spacing: 4px;
			`

			// 描述
			const desc = document.createElement("div")
			desc.textContent = el.desc
			desc.style.cssText = `
				font-size: 11px; color: ${COLORS.yunhui};
				letter-spacing: 2px;
			`

			// 状态
			const status = document.createElement("div")
			status.className = "ink-status"
			status.style.cssText = `
				margin-top: 4px; padding: 3px 10px;
				background: ${COLORS.zhushi}20; border-radius: 10px;
				font-size: 10px; color: ${COLORS.yunhui};
				transition: all 0.3s;
			`
			status.textContent = "待触发"

			content.appendChild(char)
			content.appendChild(name)
			content.appendChild(desc)
			content.appendChild(status)
			section.appendChild(content)
			scrollArea.appendChild(section)

			const waypoint = new window.Waypoint({
				element: section,
				handler: function (direction: "up" | "down") {
					if (direction === "down") {
						// 触发进入
						section.style.borderColor = el.color
						section.style.borderWidth = "3px"
						section.style.boxShadow = `0 8px 24px ${el.color}30`
						
						// 内容动画
						content.style.opacity = "1"
						content.style.transform = "scale(1)"
						content.classList.add(el.anim)
						
						// 状态更新
						status.textContent = "已触发"
						status.style.background = el.color
						status.style.color = "#fff"

						// 添加水墨晕染效果
						const ink = document.createElement("div")
						ink.className = "ink-effect ink-spread"
						ink.style.cssText = `
							position: absolute; top: 50%; left: 50%;
							width: 200px; height: 200px;
							background: radial-gradient(circle, ${el.color}20 0%, transparent 70%);
							border-radius: 50%; transform: translate(-50%, -50%);
							pointer-events: none; z-index: 1;
						`
						section.appendChild(ink)
						
						// 动画结束后移除
						setTimeout(() => {
							if (ink.parentNode) ink.remove()
						}, 1200)

					} else {
						// 向上滚动重置
						section.style.borderColor = `${el.color}30`
						section.style.borderWidth = "2px"
						section.style.boxShadow = "none"
						
						content.style.opacity = "0.4"
						content.style.transform = "scale(0.9)"
						content.classList.remove(el.anim)
						
						status.textContent = "待触发"
						status.style.background = `${COLORS.zhushi}20`
						status.style.color = COLORS.yunhui
					}
				},
				offset: "70%",
			})
			waypointsRef.current.push(waypoint)
		})

		wrapper.appendChild(scrollArea)
		container.appendChild(wrapper)
	}

	useEffect(() => {
		if (isWaypointsLoaded) runDemo(activeDemo)
		return () => {
			cleanupWaypoints()
			cleanupStyles()
		}
	}, [activeDemo, isWaypointsLoaded])

	return (
		<div className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden">
			{/* 装饰背景 - 山水轮廓 */}
			<div className="absolute top-0 right-0 w-56 h-40 opacity-[0.04] pointer-events-none">
				<svg viewBox="0 0 200 150" className="w-full h-full" fill="currentColor">
					<path d="M0,120 Q50,60 100,100 T200,80 L200,150 L0,150 Z" />
				</svg>
			</div>
			<div className="absolute bottom-0 left-0 w-48 h-32 opacity-[0.03] pointer-events-none">
				<svg viewBox="0 0 200 150" className="w-full h-full" fill="currentColor">
					<path d="M0,100 Q60,40 120,90 T200,70 L200,150 L0,150 Z" />
				</svg>
			</div>

			{/* 印章装饰 */}
			<div className="absolute bottom-6 right-6 w-12 h-12 opacity-20 pointer-events-none">
				<div className="w-full h-full border-2 border-zhusha rounded-sm flex items-center justify-center rotate-12">
					<span className="text-zhusha text-xs font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>控</span>
				</div>
			</div>

			<div className={`transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
				{/* 标题区域 */}
				<div className="mb-6 text-center pb-4 border-b-2 border-ink/10 relative">
					<div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-0.5 bg-gradient-to-r from-transparent via-zhusha/50 to-transparent" />
					
					<h2 className="text-2xl font-semibold text-ink-deep mb-2 tracking-[0.3em]" style={{ fontFamily: "'Noto Serif SC', 'STSong', serif" }}>
						Waypoints.js
					</h2>
					<p className="text-ink-medium text-sm tracking-[0.2em] mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						精准控制滚动节奏的指挥官
					</p>
					<div className="flex justify-center">
						<a href="http://imakewebthings.com/waypoints/" target="_blank" rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300">
							<span>imakewebthings.com/waypoints</span>
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
								className={`px-5 py-2.5 text-sm tracking-[0.2em] rounded-lg transition-all duration-300 ${
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
					{!isWaypointsLoaded && (
						<div className="absolute inset-0 flex items-center justify-center bg-paper/80">
							<div className="flex items-center gap-3 text-ink-medium">
								<div className="w-5 h-5 border-2 border-ink/20 border-t-zhusha rounded-full animate-spin" />
								<span className="text-sm" style={{ fontFamily: "'Noto Serif SC', serif" }}>加载中...</span>
							</div>
						</div>
					)}
				</div>

				{/* 参数说明 */}
				<div className="mt-5 p-5 rounded-xl border border-ink/10" style={{ background: `linear-gradient(135deg, ${COLORS.xuanzhi}, #f5f0e8)` }}>
					<div className="text-xs text-ink-medium space-y-2">
						<p className="font-semibold text-ink-deep mb-3 text-sm tracking-[0.15em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
							📜 核心参数
						</p>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
							{[
								{ name: "element", desc: "目标元素", color: COLORS.zhusha },
								{ name: "handler", desc: "触发回调", color: COLORS.daiqing },
								{ name: "offset", desc: "触发偏移", color: COLORS.zhushi },
								{ name: "direction", desc: "滚动方向", color: COLORS.cangshan },
							].map((param) => (
								<div key={param.name} className="p-2 bg-paper/60 rounded border border-ink/5">
									<span style={{ color: param.color }} className="font-bold">{param.name}</span>
									<span className="text-ink-light block text-[10px]">{param.desc}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* 特性统计 */}
				<div className="mt-6 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						{[
							{ icon: "🎯", name: "基础触发", desc: "滚动到元素时触发" },
							{ icon: "📏", name: "偏移控制", desc: "精确控制触发位置" },
							{ icon: "📊", name: "进度追踪", desc: "实时滚动进度" },
							{ icon: "🎨", name: "水墨动画", desc: "国风滚动驱动动画" },
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
						Waypoints.js 让滚动交互变得简单，是构建滚动驱动动画的理想选择
					</p>
				</div>
			</div>
		</div>
	)
}

export default WaypointsDemo
