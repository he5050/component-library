import { useEffect, useRef, useState } from "react"

// jQuery 和 Lettering.js 类型声明
declare global {
	interface Window {
		$: any
		jQuery: any
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
}

function LetteringDemo() {
	const [activeDemo, setActiveDemo] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const [isLibsLoaded, setIsLibsLoaded] = useState(false)
	const demoAreaRef = useRef<HTMLDivElement>(null)
	const styleRef = useRef<HTMLStyleElement | null>(null)

	const demoTabs = [
		{ name: "字符拆分", key: "chars" },
		{ name: "单词拆分", key: "words" },
		{ name: "行拆分", key: "lines" },
		{ name: "国风动画", key: "animation" },
	]

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	// 加载 jQuery 和 Lettering.js
	useEffect(() => {
		if (typeof window === "undefined") return

		const loadScript = (src: string): Promise<void> => {
			return new Promise((resolve, reject) => {
				if (document.querySelector(`script[src="${src}"]`)) {
					resolve()
					return
				}
				const script = document.createElement("script")
				script.src = src
				script.async = true
				script.onload = () => resolve()
				script.onerror = () => reject()
				document.head.appendChild(script)
			})
		}

		const loadLibs = async () => {
			try {
				// 先加载 jQuery
				if (!window.jQuery) {
					await loadScript("https://code.jquery.com/jquery-3.6.0.min.js")
				}
				// 再加载 Lettering.js
				if (!window.jQuery?.fn?.lettering) {
					await loadScript("https://cdnjs.cloudflare.com/ajax/libs/lettering.js/0.7.0/jquery.lettering.min.js")
				}
				setIsLibsLoaded(true)
			} catch (error) {
				console.error("Failed to load libraries:", error)
			}
		}

		loadLibs()
	}, [])

	const cleanupStyles = () => {
		if (styleRef.current && document.head.contains(styleRef.current)) {
			document.head.removeChild(styleRef.current)
			styleRef.current = null
		}
	}

	const runDemo = (index: number) => {
		if (!isLibsLoaded || !demoAreaRef.current || !window.$) return
		cleanupStyles()
		const container = demoAreaRef.current
		container.innerHTML = ""
		const $ = window.$

		switch (demoTabs[index].key) {
			case "chars": mountCharsDemo(container, $); break
			case "words": mountWordsDemo(container, $); break
			case "lines": mountLinesDemo(container, $); break
			case "animation": mountAnimationDemo(container, $); break
		}
	}

	// 字符拆分演示
	const mountCharsDemo = (container: HTMLDivElement, $: any) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col items-center justify-center p-8"
		wrapper.style.cssText = `background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%);`

		const title = document.createElement("h2")
		title.className = "demo-title"
		title.textContent = "水墨禅意"
		title.style.cssText = `
			font-size: 64px;
			font-family: "STKaiti", "KaiTi", "Noto Serif SC", serif;
			color: ${COLORS.moshi};
			margin-bottom: 40px;
			letter-spacing: 16px;
		`

		const desc = document.createElement("p")
		desc.textContent = "每个字符都被拆分为独立的 span 元素，可单独控制样式"
		desc.style.cssText = `
			font-size: 14px;
			color: ${COLORS.yunhui};
			margin-top: 20px;
			font-family: "Noto Serif SC", serif;
		`

		wrapper.appendChild(title)
		wrapper.appendChild(desc)
		container.appendChild(wrapper)

		// 应用 lettering
		$(title).lettering()

		// 添加悬停效果
		const chars = wrapper.querySelectorAll("[class^='char']")
		chars.forEach((char: HTMLElement, index: number) => {
			char.style.cssText += `
				display: inline-block;
				transition: all 0.3s ease;
				cursor: pointer;
			`
			char.addEventListener("mouseenter", () => {
				char.style.color = COLORS.zhusha
				char.style.transform = "scale(1.2) translateY(-5px)"
				char.style.textShadow = `0 4px 12px ${COLORS.zhusha}40`
			})
			char.addEventListener("mouseleave", () => {
				char.style.color = COLORS.moshi
				char.style.transform = "scale(1) translateY(0)"
				char.style.textShadow = "none"
			})
		})
	}

	// 单词拆分演示
	const mountWordsDemo = (container: HTMLDivElement, $: any) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col items-center justify-center p-8"
		wrapper.style.cssText = `background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%);`

		const sentence = document.createElement("div")
		sentence.className = "demo-sentence"
		sentence.textContent = "山水有清音 云雾绕林间"
		sentence.style.cssText = `
			font-size: 36px;
			font-family: "STKaiti", "KaiTi", "Noto Serif SC", serif;
			color: ${COLORS.moshi};
			line-height: 2;
			text-align: center;
		`

		const desc = document.createElement("p")
		desc.textContent = "按单词（以空格分隔）拆分，每个词可独立控制"
		desc.style.cssText = `
			font-size: 14px;
			color: ${COLORS.yunhui};
			margin-top: 30px;
			font-family: "Noto Serif SC", serif;
		`

		wrapper.appendChild(sentence)
		wrapper.appendChild(desc)
		container.appendChild(wrapper)

		// 应用 lettering words
		$(sentence).lettering('words')

		// 添加样式和动画
		const words = wrapper.querySelectorAll("[class^='word']")
		const wordColors = [COLORS.zhusha, COLORS.daiqing, COLORS.zhushi, COLORS.cangshan]
		words.forEach((word: HTMLElement, index: number) => {
			word.style.cssText += `
				display: inline-block;
				margin: 0 8px;
				padding: 8px 16px;
				border: 2px solid ${COLORS.zhushi}40;
				border-radius: 8px;
				transition: all 0.4s ease;
				cursor: pointer;
				background: ${COLORS.xuanzhi};
			`
			word.addEventListener("mouseenter", () => {
				const color = wordColors[index % wordColors.length]
				word.style.borderColor = color
				word.style.color = color
				word.style.transform = "scale(1.05)"
				word.style.boxShadow = `0 4px 12px ${color}30`
			})
			word.addEventListener("mouseleave", () => {
				word.style.borderColor = `${COLORS.zhushi}40`
				word.style.color = COLORS.moshi
				word.style.transform = "scale(1)"
				word.style.boxShadow = "none"
			})
		})
	}

	// 行拆分演示
	const mountLinesDemo = (container: HTMLDivElement, $: any) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col items-center justify-center p-8"
		wrapper.style.cssText = `background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%);`

		const poem = document.createElement("div")
		poem.className = "demo-poem"
		poem.innerHTML = `
			<p>远上寒山石径斜</p>
			<p>白云生处有人家</p>
			<p>停车坐爱枫林晚</p>
			<p>霜叶红于二月花</p>
		`
		poem.style.cssText = `
			font-size: 28px;
			font-family: "STKaiti", "KaiTi", "Noto Serif SC", serif;
			color: ${COLORS.moshi};
			line-height: 2.2;
			text-align: center;
			letter-spacing: 4px;
		`

		const desc = document.createElement("p")
		desc.textContent = "按行拆分，每行可独立控制样式和动画"
		desc.style.cssText = `
			font-size: 14px;
			color: ${COLORS.yunhui};
			margin-top: 30px;
			font-family: "Noto Serif SC", serif;
		`

		wrapper.appendChild(poem)
		wrapper.appendChild(desc)
		container.appendChild(wrapper)

		// 应用 lettering lines
		$(poem).lettering('lines')

		// 添加样式和动画
		const lines = wrapper.querySelectorAll("[class^='line']")
		lines.forEach((line: HTMLElement, index: number) => {
			line.style.cssText += `
				display: block;
				transition: all 0.5s ease;
				cursor: pointer;
				padding: 8px 24px;
				border-left: 3px solid transparent;
			`
			line.addEventListener("mouseenter", () => {
				line.style.borderLeftColor = COLORS.zhusha
				line.style.paddingLeft = "32px"
				line.style.color = COLORS.zhusha
				line.style.background = `${COLORS.zhusha}10`
			})
			line.addEventListener("mouseleave", () => {
				line.style.borderLeftColor = "transparent"
				line.style.paddingLeft = "24px"
				line.style.color = COLORS.moshi
				line.style.background = "transparent"
			})
		})
	}

	// 国风动画演示
	const mountAnimationDemo = (container: HTMLDivElement, $: any) => {
		const wrapper = document.createElement("div")
		wrapper.className = "h-full flex flex-col items-center justify-center p-8"
		wrapper.style.cssText = `background: linear-gradient(180deg, ${COLORS.xuanzhi} 0%, #f5f0e8 100%);`

		// 添加动画样式
		const style = document.createElement("style")
		style.textContent = `
			@keyframes inkFadeIn {
				from { opacity: 0; transform: translateY(20px); }
				to { opacity: 1; transform: translateY(0); }
			}
			@keyframes inkSpread {
				0% { transform: scale(0); opacity: 0; }
				50% { opacity: 1; }
				100% { transform: scale(1.5); opacity: 0; }
			}
			@keyframes float {
				0%, 100% { transform: translateY(0); }
				50% { transform: translateY(-10px); }
			}
			.char-anim {
				opacity: 0;
				animation: inkFadeIn 0.6s ease forwards;
			}
			.ink-bg {
				position: absolute;
				border-radius: 50%;
				background: radial-gradient(circle, var(--ink-color, ${COLORS.moshi})20 0%, transparent 70%);
				pointer-events: none;
				animation: inkSpread 1s ease-out forwards;
			}
		`
		document.head.appendChild(style)
		styleRef.current = style

		const title = document.createElement("h2")
		title.className = "animated-title"
		title.textContent = "禅意人生"
		title.style.cssText = `
			font-size: 72px;
			font-family: "STKaiti", "KaiTi", "Noto Serif SC", serif;
			color: ${COLORS.moshi};
			letter-spacing: 20px;
			position: relative;
		`

		const desc = document.createElement("p")
		desc.textContent = "点击文字触发动画效果"
		desc.style.cssText = `
			font-size: 14px;
			color: ${COLORS.yunhui};
			margin-top: 40px;
			font-family: "Noto Serif SC", serif;
		`

		wrapper.appendChild(title)
		wrapper.appendChild(desc)
		container.appendChild(wrapper)

		// 应用 lettering
		$(title).lettering()

		// 添加动画效果
		const chars = wrapper.querySelectorAll("[class^='char']")
		const charColors = [COLORS.zhusha, COLORS.daiqing, COLORS.zhushi, COLORS.cangshan]

		chars.forEach((char: HTMLElement, index: number) => {
			char.style.cssText += `
				display: inline-block;
				cursor: pointer;
				position: relative;
				transition: all 0.3s ease;
			`

			// 初始动画
			setTimeout(() => {
				char.classList.add('char-anim')
				char.style.animationDelay = `${index * 0.15}s`
			}, 100)

			// 点击效果
			char.addEventListener("click", () => {
				const color = charColors[index % charColors.length]

				// 创建水墨晕染效果
				const ink = document.createElement("div")
				ink.className = "ink-bg"
				ink.style.cssText = `
					position: absolute;
					top: 50%;
					left: 50%;
					width: 100px;
					height: 100px;
					transform: translate(-50%, -50%);
					--ink-color: ${color};
				`
				char.appendChild(ink)

				// 字符动画
				char.style.color = color
				char.style.transform = "scale(1.3)"
				char.style.textShadow = `0 0 20px ${color}60`

				setTimeout(() => {
					char.style.color = COLORS.moshi
					char.style.transform = "scale(1)"
					char.style.textShadow = "none"
					if (ink.parentNode) ink.remove()
				}, 1000)
			})

			// 悬停效果
			char.addEventListener("mouseenter", () => {
				char.style.transform = "scale(1.1)"
			})
			char.addEventListener("mouseleave", () => {
				char.style.transform = "scale(1)"
			})
		})
	}

	useEffect(() => {
		if (isLibsLoaded) runDemo(activeDemo)
		return () => cleanupStyles()
	}, [activeDemo, isLibsLoaded])

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
					<span className="text-zhusha text-xs font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>字</span>
				</div>
			</div>

			<div className={`transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
				{/* 标题区域 */}
				<div className="mb-6 text-center pb-4 border-b-2 border-ink/10 relative">
					<div className="absolute left-1/2 -translate-x-1/2 top-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-zhusha/50 to-transparent" />
					<h2 className="text-2xl font-semibold text-ink-deep mb-2 tracking-[0.3em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						Lettering.js
					</h2>
					<p className="text-ink-medium text-sm tracking-[0.2em] mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						玩转文字排版的造字大师
					</p>
					<div className="flex justify-center">
						<a href="http://letteringjs.com/" target="_blank" rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300">
							<span>letteringjs.com</span>
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
					{!isLibsLoaded && (
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
								<code className="text-zhusha font-bold">lettering()</code>
								<span className="text-ink-light block text-[10px] mt-1">按字符拆分，生成 char1, char2...</span>
							</div>
							<div className="p-3 bg-paper/60 rounded border border-ink/5">
								<code className="text-daiqing font-bold">lettering('words')</code>
								<span className="text-ink-light block text-[10px] mt-1">按单词拆分，生成 word1, word2...</span>
							</div>
							<div className="p-3 bg-paper/60 rounded border border-ink/5">
								<code className="text-zhushi font-bold">lettering('lines')</code>
								<span className="text-ink-light block text-[10px] mt-1">按行拆分，生成 line1, line2...</span>
							</div>
						</div>
					</div>
				</div>

				{/* 特性统计 */}
				<div className="mt-6 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						{[
							{ icon: "🔤", name: "字符拆分", desc: "精确到每个字符" },
							{ icon: "📝", name: "单词拆分", desc: "按空格分隔" },
							{ icon: "📃", name: "行拆分", desc: "按换行符分隔" },
							{ icon: "🎨", name: "国风动画", desc: "水墨文字效果" },
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
						Lettering.js 让每一个字符都成为艺术的主角
					</p>
				</div>
			</div>
		</div>
	)
}

export default LetteringDemo
