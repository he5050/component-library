import { useState, useRef, useEffect } from "react"
import dynamics from "dynamics.js"

interface DynamicsDemoProps {
	variant?: "spring" | "gravity" | "bounce" | "force"
}

function DynamicsDemo({ variant = "spring" }: DynamicsDemoProps) {
	const [animationType, setAnimationType] = useState<"spring" | "gravity" | "bounce" | "force">(variant)
	const [isAnimating, setIsAnimating] = useState(false)
	const [config, setConfig] = useState({
		frequency: 10,
		friction: 200,
		mass: 1,
		bounciness: 600,
		duration: 1000,
		deceleration: 0.92,
	})
	const boxRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	// 动画类型映射：修复 dynamics.js 中没有 force 的问题
	const getAnimationType = () => {
		switch (animationType) {
			case "spring":
				return dynamics.spring
			case "gravity":
				return dynamics.gravity
			case "bounce":
				return dynamics.bounce
			case "force":
				// dynamics.js 中没有 force，使用 forceWithGravity 代替
				return dynamics.forceWithGravity
			default:
				return dynamics.spring
		}
	}

	const handleAnimate = () => {
		if (!boxRef.current || !dynamics) return

		dynamics.stop(boxRef.current)
		setIsAnimating(true)

		const options: any = {
			type: getAnimationType(),
		}

		switch (animationType) {
			case "spring":
				options.frequency = config.frequency
				options.friction = config.friction
				options.mass = config.mass
				options.duration = config.duration
				break
			case "gravity":
				options.duration = config.duration
				options.bounciness = config.bounciness
				break
			case "bounce":
				options.duration = config.duration
				options.bounciness = config.bounciness
				break
			case "force":
				// forceWithGravity 使用 bounciness 和 elasticity
				options.duration = config.duration
				options.bounciness = config.bounciness
				options.elasticity = config.deceleration * 1000
				break
		}

		dynamics
			.animate(
				boxRef.current,
				{
					translateX: animationType === "gravity" ? 0 : 250,
					translateY: animationType === "gravity" ? 200 : 0,
					rotate: animationType === "spring" ? 360 : 180,
				},
				options,
			)
			.then(() => {
				setIsAnimating(false)
			})
	}

	const handleReset = () => {
		if (!boxRef.current || !dynamics) return

		dynamics.stop(boxRef.current)
		dynamics.animate(
			boxRef.current,
			{
				translateX: 0,
				translateY: 0,
				rotate: 0,
			},
			{
				type: dynamics.spring,
				duration: 500,
				friction: 300,
			},
		)
	}

	const presetConfigs = {
		spring: { frequency: 10, friction: 200, mass: 1, duration: 1000 },
		gravity: { bounciness: 700, duration: 1500 },
		bounce: { bounciness: 500, duration: 1200 },
		// force 使用 forceWithGravity，需要 bounciness 和 elasticity
		force: { bounciness: 400, deceleration: 0.8, duration: 1000 },
	}

	const loadPreset = (type: typeof animationType) => {
		// 切换类型时先停止当前动画
		if (boxRef.current && dynamics) {
			dynamics.stop(boxRef.current)
		}
		setIsAnimating(false)
		setAnimationType(type)
		setConfig((prev) => ({
			...prev,
			...(presetConfigs[type] || {}),
		}))
	}

	return (
		<div
			ref={containerRef}
			className='relative p-8 bg-paper border border-ink/10 rounded-ink max-w-4xl mx-auto overflow-hidden'>
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

					<h2 className='text-xl font-display font-semibold text-ink-deep mb-1.5 tracking-wide'>Dynamics.js</h2>
					<p className='text-ink-medium text-sm'>基于物理原理的 JavaScript 动画库</p>
					<a
						href='http://dynamicsjs.com'
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center gap-1.5 mt-3 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300 group'>
						<span>dynamicsjs.com</span>
					</a>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div>
						<div className='mb-6'>
							<h3 className='text-xs font-medium text-ink-medium mb-3'>动画类型</h3>
							<div className='grid grid-cols-2 gap-2'>
								{(["spring", "gravity", "bounce", "force"] as const).map((type) => (
									<button
										key={type}
										onClick={() => loadPreset(type)}
										className={`px-3 py-2.5 text-xs rounded-lg border transition-all duration-300 ${
											animationType === type
												? "bg-zhusha/10 border-zhusha/30 text-zhusha font-medium"
												: "bg-paper-warm/50 border-ink/10 text-ink-medium hover:border-ink/20"
										}`}>
										{type === "spring" && "弹簧"}
										{type === "gravity" && "重力"}
										{type === "bounce" && "弹跳"}
										{type === "force" && "力"}
									</button>
								))}
							</div>
						</div>

						<div className='mb-6 space-y-4'>
							<h3 className='text-xs font-medium text-ink-medium'>参数配置</h3>

							{animationType === "spring" && (
								<>
									<div>
										<div className='flex justify-between text-xs mb-2'>
											<span className='text-ink-light'>频率 (Frequency)</span>
											<span className='text-ink-medium font-mono'>{config.frequency}</span>
										</div>
										<input
											type='range'
											min='0'
											max='20'
											value={config.frequency}
											onChange={(e) => setConfig({ ...config, frequency: Number(e.target.value) })}
											className='w-full h-1.5 bg-ink/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zhusha [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125'
										/>
									</div>
									<div>
										<div className='flex justify-between text-xs mb-2'>
											<span className='text-ink-light'>摩擦 (Friction)</span>
											<span className='text-ink-medium font-mono'>{config.friction}</span>
										</div>
										<input
											type='range'
											min='0'
											max='1000'
											value={config.friction}
											onChange={(e) => setConfig({ ...config, friction: Number(e.target.value) })}
											className='w-full h-1.5 bg-ink/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zhusha [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125'
										/>
									</div>
									<div>
										<div className='flex justify-between text-xs mb-2'>
											<span className='text-ink-light'>质量 (Mass)</span>
											<span className='text-ink-medium font-mono'>{config.mass}</span>
										</div>
										<input
											type='range'
											min='0.1'
											max='20'
											step='0.1'
											value={config.mass}
											onChange={(e) => setConfig({ ...config, mass: Number(e.target.value) })}
											className='w-full h-1.5 bg-ink/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zhusha [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125'
										/>
									</div>
								</>
							)}

							{(animationType === "gravity" || animationType === "bounce") && (
								<>
									<div>
										<div className='flex justify-between text-xs mb-2'>
											<span className='text-ink-light'>弹跳 (Bounciness)</span>
											<span className='text-ink-medium font-mono'>{config.bounciness}</span>
										</div>
										<input
											type='range'
											min='0'
											max='1000'
											value={config.bounciness}
											onChange={(e) => setConfig({ ...config, bounciness: Number(e.target.value) })}
											className='w-full h-1.5 bg-ink/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zhusha [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125'
										/>
									</div>
								</>
							)}

							{animationType === "force" && (
								<>
									<div>
										<div className='flex justify-between text-xs mb-2'>
											<span className='text-ink-light'>减速度 (Deceleration)</span>
											<span className='text-ink-medium font-mono'>{config.deceleration}</span>
										</div>
										<input
											type='range'
											min='0'
											max='1'
											step='0.01'
											value={config.deceleration}
											onChange={(e) => setConfig({ ...config, deceleration: Number(e.target.value) })}
											className='w-full h-1.5 bg-ink/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zhusha [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125'
										/>
									</div>
								</>
							)}

							<div>
								<div className='flex justify-between text-xs mb-2'>
									<span className='text-ink-light'>持续时间 (Duration)</span>
									<span className='text-ink-medium font-mono'>{config.duration}ms</span>
								</div>
								<input
									type='range'
									min='100'
									max='3000'
									step='100'
									value={config.duration}
									onChange={(e) => setConfig({ ...config, duration: Number(e.target.value) })}
									className='w-full h-1.5 bg-ink/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zhusha [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125'
								/>
							</div>
						</div>

						<div className='flex gap-3'>
							<button
								onClick={handleAnimate}
								disabled={isAnimating}
								className='flex-1 px-4 py-2.5 bg-gradient-to-r from-zhusha to-zhusha/80 text-white text-sm font-medium rounded-lg shadow-lg shadow-zhusha/20 hover:shadow-xl hover:shadow-zhusha/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5'>
								{isAnimating ? "动画中..." : "播放动画"}
							</button>
							<button
								onClick={handleReset}
								className='px-4 py-2.5 bg-paper-warm border border-ink/10 text-ink-medium text-sm rounded-lg hover:border-ink/20 transition-all duration-300'>
								重置
							</button>
						</div>
					</div>

					<div className='relative'>
						<div className='h-[400px] bg-gradient-to-br from-paper-warm to-paper border border-ink/10 rounded-xl overflow-hidden relative'>
							<div className='absolute inset-0 opacity-[0.02]'>
								<svg className='w-full h-full'>
									<defs>
										<pattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'>
											<path
												d='M 20 0 L 0 0 0 20'
												fill='none'
												stroke='currentColor'
												strokeWidth='0.5'
												className='text-ink'
											/>
										</pattern>
									</defs>
									<rect width='100%' height='100%' fill='url(#grid)' />
								</svg>
							</div>

							<div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zhusha/20 to-transparent' />

							<div className='absolute inset-0 flex items-center justify-center'>
								<div
									ref={boxRef}
									className='w-20 h-20 bg-gradient-to-br from-zhusha to-zhusha/80 rounded-xl shadow-lg shadow-zhusha/30 flex items-center justify-center cursor-pointer will-change-transform'
									style={{ transform: "translateZ(0)" }}>
									<div className='w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm' />
								</div>
							</div>

							<div className='absolute top-4 left-4 text-xs text-ink-light font-mono'>
								<div className='flex items-center gap-2 mb-1'>
									<div className='w-2 h-2 rounded-full bg-zhusha animate-pulse' />
									<span>{animationType.toUpperCase()} MODE</span>
								</div>
							</div>
						</div>

						<div className='mt-4 p-3 bg-paper-warm/50 border border-ink/10 rounded-lg'>
							<div className='text-xs text-ink-light space-y-1'>
								<div className='flex justify-between'>
									<span>类型:</span>
									<span className='text-ink-medium font-mono'>{animationType}</span>
								</div>
								{animationType === "spring" && (
									<>
										<div className='flex justify-between'>
											<span>频率:</span>
											<span className='text-ink-medium font-mono'>{config.frequency}</span>
										</div>
										<div className='flex justify-between'>
											<span>摩擦:</span>
											<span className='text-ink-medium font-mono'>{config.friction}</span>
										</div>
										<div className='flex justify-between'>
											<span>质量:</span>
											<span className='text-ink-medium font-mono'>{config.mass}</span>
										</div>
									</>
								)}
								{(animationType === "gravity" || animationType === "bounce") && (
									<div className='flex justify-between'>
										<span>弹跳:</span>
										<span className='text-ink-medium font-mono'>{config.bounciness}</span>
									</div>
								)}
								{animationType === "force" && (
									<div className='flex justify-between'>
										<span>减速:</span>
										<span className='text-ink-medium font-mono'>{config.deceleration}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className='mt-8 pt-5 border-t border-ink/10'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>~8KB</div>
							<div className='text-xs text-ink-light'>压缩体积</div>
						</div>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>4 种</div>
							<div className='text-xs text-ink-light'>物理模型</div>
						</div>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>0</div>
							<div className='text-xs text-ink-light'>外部依赖</div>
						</div>
						<div className='p-3 bg-paper-warm/50 rounded-lg border border-ink/5'>
							<div className='text-lg font-display font-semibold text-zhusha mb-1'>100%</div>
							<div className='text-xs text-ink-light'>物理模拟</div>
						</div>
					</div>
				</div>

				<div
					className={`mt-6 pt-5 border-t border-ink/10 text-center text-xs text-ink-light transition-all duration-500 delay-500 ${
						isLoaded ? "opacity-100" : "opacity-0"
					}`}>
					<p>基于真实物理公式计算动画效果，让 UI 动画更加自然流畅</p>
				</div>
			</div>
		</div>
	)
}

export default DynamicsDemo
