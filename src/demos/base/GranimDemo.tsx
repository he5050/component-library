import { useState, useRef, useEffect } from "react"

interface GranimDemoProps {
	variant?: "linear" | "radial" | "diagonal"
}

type GranimInstance = any

type Direction = "left-right" | "right-left" | "top-bottom" | "bottom-top" | "diagonal" | "radial" | "radial-symmetric"

interface GradientState {
	name: string
	label: string
	colors: string[][]
}

const gradientStates: GradientState[] = [
	{
		name: "热情红",
		label: "warm",
		colors: [
			["#FF416C", "#FF4B2B"],
			["#F64F59", "#C75B39"],
		],
	},
	{
		name: "海洋蓝",
		label: "ocean",
		colors: [
			["#00C6FF", "#0072FF"],
			["#667eea", "#764ba2"],
		],
	},
	{
		name: "森林绿",
		label: "forest",
		colors: [
			["#56AB2F", "#A8E063"],
			["#11998E", "#38EF7D"],
		],
	},
	{
		name: "梦幻紫",
		label: "dream",
		colors: [
			["#A18CD1", "#FBC2EB"],
			["#E0C3FC", "#8EC5FC"],
		],
	},
	{
		name: "日落橙",
		label: "sunset",
		colors: [
			["#F7971E", "#FFD200"],
			["#FF6A00", "#EE0979"],
		],
	},
]

function GranimDemo({ variant = "linear" }: GranimDemoProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const granimRef = useRef<GranimInstance | null>(null)
	const [direction, setDirection] = useState<Direction>("left-right")
	const [activeState, setActiveState] = useState(0)
	const [isPlaying, setIsPlaying] = useState(true)
	const [transitionSpeed, setTransitionSpeed] = useState(800)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	// 初始化 Granim
	useEffect(() => {
		let mounted = true
		let granimInstance: any = null

		// 动态导入 Granim（仅在客户端）
		const initGranim = async () => {
			const canvas = canvasRef.current
			if (!canvas) return

			try {
				// 动态导入 granim
				const GranimModule = await import("granim")
				const GranimClass = GranimModule.default || GranimModule

				if (!mounted) return

				// 创建新实例 - 让 Granim 自己处理 canvas 尺寸
				granimInstance = new GranimClass({
					element: canvas,
					direction: direction,
					opacity: [1, 1],
					stateTransitionSpeed: transitionSpeed,
					states: {
						"default-state": {
							gradients: gradientStates[activeState].colors,
						},
					},
				})

				if (mounted) {
					granimRef.current = granimInstance
					setIsPlaying(true)
					console.log("Granim 初始化成功")
				}
			} catch (error) {
				console.error("Granim 初始化失败:", error)
			}
		}

		initGranim()

		return () => {
			mounted = false
			if (granimInstance) {
				granimInstance.destroy()
			}
		}
		// 只在挂载时初始化一次
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// 重建 Granim 实例
	const recreateGranim = async (newDirection?: Direction, newStateIndex?: number, newSpeed?: number) => {
		if (granimRef.current) {
			granimRef.current.destroy()
		}

		const dir = newDirection ?? direction
		const stateIdx = newStateIndex ?? activeState
		const speed = newSpeed ?? transitionSpeed

		try {
			const GranimModule = await import("granim")
			const GranimClass = GranimModule.default || GranimModule

			const granimInstance = new GranimClass({
				element: canvasRef.current!,
				direction: dir,
				opacity: [1, 1],
				stateTransitionSpeed: speed,
				states: {
					"default-state": {
						gradients: gradientStates[stateIdx].colors,
					},
				},
			})

			granimRef.current = granimInstance
			if (!isPlaying) {
				granimInstance.pause()
			}
		} catch (error) {
			console.error("Granim 初始化失败:", error)
		}
	}

	const handleDirectionChange = (newDirection: Direction) => {
		recreateGranim(newDirection, undefined)
		setDirection(newDirection)
	}

	const handleStateChange = (index: number) => {
		recreateGranim(undefined, index)
		setActiveState(index)
	}

	const handlePlayPause = () => {
		if (!granimRef.current) return

		if (isPlaying) {
			granimRef.current.pause()
		} else {
			granimRef.current.play()
		}
		setIsPlaying(!isPlaying)
	}

	const handleReset = () => {
		recreateGranim("left-right", 0, 800)
		setActiveState(0)
		setDirection("left-right")
		setTransitionSpeed(800)
		setIsPlaying(true)
	}

	return (
		<div className='relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden'>
			<div className='absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none'>
				<svg viewBox='0 0 100 100' className='w-full h-full'>
					<circle
						cx='80'
						cy='20'
						r='60'
						fill='none'
						stroke='currentColor'
						strokeWidth='0.5'
						className='text-ink-deep'
					/>
					<circle
						cx='80'
						cy='20'
						r='40'
						fill='none'
						stroke='currentColor'
						strokeWidth='0.3'
						className='text-ink-deep'
					/>
				</svg>
			</div>

			<div
				className={`transition-all duration-700 ease-out ${
					isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
				}`}>
				<div className='mb-8 text-center pb-6 border-b border-ink/10 relative'>
					<div className='absolute left-1/2 -translate-x-1/2 top-0 w-12 h-0.5 bg-gradient-to-r from-transparent via-zhusha/40 to-transparent' />

					<h2 className='text-xl font-display font-semibold text-ink-deep mb-1.5 tracking-wide'>Granim.js</h2>
					<p className='text-ink-medium text-sm'>渐变动画从未如此绚丽的色彩魔法师!</p>
					<a
						href='https://granim.js.org'
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center gap-1.5 mt-3 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300 group'>
						<span>granim.js.org</span>
					</a>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div>
						<div className='mb-6'>
							<h3 className='text-xs font-medium text-ink-medium mb-3'>渐变方向</h3>
							<div className='grid grid-cols-3 gap-2'>
								{(
									[
										{ value: "left-right", label: "左→右" },
										{ value: "top-bottom", label: "上→下" },
										{ value: "diagonal", label: "对角线" },
										{ value: "radial", label: "径向" },
										{ value: "radial-symmetric", label: "径向对称" },
									] as const
								).map((item) => (
									<button
										key={item.value}
										onClick={() => handleDirectionChange(item.value)}
										className={`px-2 py-2 text-xs rounded-lg border transition-all duration-300 ${
											direction === item.value
												? "bg-zhusha/10 border-zhusha/30 text-zhusha font-medium"
												: "bg-paper-warm/50 border-ink/10 text-ink-medium hover:border-ink/20"
										}`}>
										{item.label}
									</button>
								))}
							</div>
						</div>

						<div className='mb-6'>
							<h3 className='text-xs font-medium text-ink-medium mb-3'>颜色主题</h3>
							<div className='grid grid-cols-1 gap-2'>
								{gradientStates.map((state, index) => (
									<button
										key={state.label}
										onClick={() => handleStateChange(index)}
										className={`px-3 py-2.5 text-xs rounded-lg border transition-all duration-300 flex items-center gap-3 ${
											activeState === index
												? "bg-zhusha/10 border-zhusha/30 text-zhusha font-medium"
												: "bg-paper-warm/50 border-ink/10 text-ink-medium hover:border-ink/20"
										}`}>
										<div
											className='w-8 h-4 rounded bg-gradient-to-r'
											style={{
												backgroundImage: `linear-gradient(to right, ${state.colors[0][0]}, ${state.colors[0][1] || state.colors[0][0]})`,
											}}
										/>
										<span>{state.name}</span>
									</button>
								))}
							</div>
						</div>

						<div className='mb-6'>
							<div className='flex justify-between text-xs mb-2'>
								<span className='text-ink-light'>切换速度</span>
								<span className='text-ink-medium font-mono'>{transitionSpeed}ms</span>
							</div>
							<input
								type='range'
								min='200'
								max='5000'
								step='100'
								value={transitionSpeed}
								onChange={(e) => {
									const newSpeed = Number(e.target.value)
									setTransitionSpeed(newSpeed)
									recreateGranim(undefined, undefined, newSpeed)
								}}
								className='w-full h-1.5 bg-ink/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zhusha [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125'
							/>
						</div>

						<div className='flex gap-3'>
							<button
								onClick={handlePlayPause}
								className='flex-1 px-4 py-2.5 bg-gradient-to-r from-zhusha to-zhusha/80 text-white text-sm font-medium rounded-lg shadow-lg shadow-zhusha/20 hover:shadow-xl hover:shadow-zhusha/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5'>
								{isPlaying ? "暂停" : "播放"}
							</button>
							<button
								onClick={handleReset}
								className='px-4 py-2.5 bg-paper-warm border border-ink/10 text-ink-medium text-sm rounded-lg hover:border-ink/20 transition-all duration-300'>
								重置
							</button>
						</div>
					</div>

					<div className='relative'>
						<div className='relative h-[400px] bg-gradient-to-br from-paper-warm to-paper border border-ink/10 rounded-xl overflow-hidden'>
							<canvas ref={canvasRef} className='absolute inset-0 w-full h-full' style={{ borderRadius: "0.75rem" }} />

							<div className='absolute top-4 left-4 text-xs text-white/90 font-mono z-10 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg'>
								<div className='flex items-center gap-2 mb-1'>
									<div className='w-2 h-2 rounded-full bg-white animate-pulse' />
									<span>{direction.toUpperCase()}</span>
								</div>
								<div className='text-white/70'>{gradientStates[activeState].name}</div>
							</div>

							{!isPlaying && (
								<div className='absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-10'>
									<div className='text-white text-sm font-medium'>已暂停</div>
								</div>
							)}
						</div>

						<div className='mt-4 p-3 bg-paper-warm/50 border border-ink/10 rounded-lg'>
							<div className='text-xs text-ink-light space-y-1'>
								<div className='flex justify-between'>
									<span>方向:</span>
									<span className='text-ink-medium font-mono'>{direction}</span>
								</div>
								<div className='flex justify-between'>
									<span>主题:</span>
									<span className='text-ink-medium font-mono'>{gradientStates[activeState].name}</span>
								</div>
								<div className='flex justify-between'>
									<span>速度:</span>
									<span className='text-ink-medium font-mono'>{transitionSpeed}ms</span>
								</div>
								<div className='flex justify-between'>
									<span>状态:</span>
									<span className={`text-ink-medium font-mono ${isPlaying ? "text-green-600" : "text-orange-600"}`}>
										{isPlaying ? "播放中" : "已暂停"}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-8 pt-5 border-t border-ink/10'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>&lt;10KB</div>
							<div className='text-xs text-ink-light'>压缩体积</div>
						</div>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>7 种</div>
							<div className='text-xs text-ink-light'>渐变方向</div>
						</div>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>16 种</div>
							<div className='text-xs text-ink-light'>混合模式</div>
						</div>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>Canvas</div>
							<div className='text-xs text-ink-light'>高性能渲染</div>
						</div>
					</div>
				</div>

				<div
					className={`mt-6 pt-5 border-t border-ink/10 text-center text-xs text-ink-light transition-all duration-500 delay-500 ${
						isLoaded ? "opacity-100" : "opacity-0"
					}`}>
					<p>基于 HTML5 Canvas 的流畅渐变动画，为网页增添无限色彩魅力</p>
				</div>
			</div>
		</div>
	)
}

export default GranimDemo
