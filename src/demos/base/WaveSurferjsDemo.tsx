import { useState, useRef, useEffect, useCallback } from "react"

interface WaveSurferDemoProps {
	variant?: "basic" | "regions" | "minimap"
}

type WaveSurferInstance = any

function generateSyntheticPeaks(length: number = 300): number[] {
	const peaks: number[] = []
	for (let i = 0; i < length; i++) {
		const t = i / length
		let value = 0.3 + Math.sin(t * Math.PI * 8) * 0.2
		value += Math.sin(t * Math.PI * 23) * 0.15
		value += Math.sin(t * Math.PI * 47) * 0.1
		value += Math.random() * 0.05
		value = Math.abs(value)
		value = Math.min(1, Math.max(0.15, value))
		peaks.push(value)
	}
	return peaks
}

function WaveSurferjsDemo({ variant = "basic" }: WaveSurferDemoProps) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration] = useState(30)
	const [volume, setVolume] = useState(0.8)
	const [playbackRate, setPlaybackRate] = useState(1)
	const [waveStyle, setWaveStyle] = useState<"bars" | "wave">("wave")
	const [syntheticPeaks] = useState<number[]>(() => generateSyntheticPeaks(300))
	const [progressWidth, setProgressWidth] = useState(0)
	const wavesurferRef = useRef<WaveSurferInstance | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const animationRef = useRef<number | null>(null)
	const startTimeRef = useRef<number>(0)
	const pausedTimeRef = useRef<number>(0)

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = Math.floor(seconds % 60)
		return `${mins}:${secs.toString().padStart(2, "0")}`
	}

	const initWaveSurfer = useCallback(async () => {
		if (!containerRef.current) return

		try {
			const WaveSurfer = (await import("wavesurfer.js")).default

			if (wavesurferRef.current) {
				wavesurferRef.current.destroy()
			}

			const waveColor = "#8B7355"
			const progressColor = "#4A4A4A"

			const options: any = {
				container: containerRef.current,
				height: 120,
				waveColor: waveColor,
				progressColor: progressColor,
				cursorColor: "#1A1A1A",
				cursorWidth: 2,
				barWidth: waveStyle === "bars" ? 3 : 0,
				barGap: waveStyle === "bars" ? 2 : 0,
				barRadius: waveStyle === "bars" ? 3 : 0,
				normalize: true,
				interact: true,
				dragToSeek: true,
				hideScrollbar: true,
				fillParent: true,
				peaks: [syntheticPeaks],
				duration: duration,
			}

			const wavesurfer = WaveSurfer.create(options)

			wavesurfer.on("ready", () => {
				setIsLoaded(true)
				console.log("WaveSurfer 初始化成功")
			})

			wavesurfer.on("interaction", () => {
				if (wavesurferRef.current) {
					const newTime = wavesurferRef.current.getCurrentTime()
					setCurrentTime(newTime)
					pausedTimeRef.current = newTime
					const elapsed = (Date.now() - startTimeRef.current) * playbackRate
					pausedTimeRef.current = newTime
				}
			})

			wavesurfer.on("error", (error: Error) => {
				console.error("WaveSurfer 错误:", error)
			})

			wavesurferRef.current = wavesurfer
			setIsLoaded(true)
		} catch (error) {
			console.error("WaveSurfer 初始化失败:", error)
		}
	}, [waveStyle, syntheticPeaks, duration])

	useEffect(() => {
		const timer = setTimeout(() => {
			initWaveSurfer()
		}, 100)

		return () => {
			clearTimeout(timer)
			if (wavesurferRef.current) {
				wavesurferRef.current.destroy()
				wavesurferRef.current = null
			}
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [initWaveSurfer])

	const updatePlayback = useCallback(() => {
		if (!isPlaying) return

		const elapsed = (Date.now() - startTimeRef.current) * playbackRate
		const newTime = pausedTimeRef.current + elapsed / 1000

		if (newTime >= duration) {
			setCurrentTime(0)
			setProgressWidth(0)
			pausedTimeRef.current = 0
			setIsPlaying(false)
			if (wavesurferRef.current) {
				wavesurferRef.current.seekTo(0)
			}
			return
		}

		setCurrentTime(newTime)
		setProgressWidth((newTime / duration) * 100)

		if (wavesurferRef.current) {
			wavesurferRef.current.seekTo(newTime / duration)
		}

		animationRef.current = requestAnimationFrame(updatePlayback)
	}, [isPlaying, playbackRate, duration])

	useEffect(() => {
		if (isPlaying) {
			startTimeRef.current = Date.now()
			animationRef.current = requestAnimationFrame(updatePlayback)
		} else if (animationRef.current) {
			cancelAnimationFrame(animationRef.current)
		}
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [isPlaying, updatePlayback])

	const handlePlayPause = useCallback(() => {
		if (isPlaying) {
			const elapsed = (Date.now() - startTimeRef.current) * playbackRate
			pausedTimeRef.current += elapsed / 1000
			setIsPlaying(false)
		} else {
			startTimeRef.current = Date.now()
			setIsPlaying(true)
		}
	}, [isPlaying, playbackRate])

	const handleVolumeChange = (newVolume: number) => {
		setVolume(newVolume)
	}

	const handlePlaybackRateChange = (rate: number) => {
		if (isPlaying) {
			const elapsed = (Date.now() - startTimeRef.current) * playbackRate
			pausedTimeRef.current += elapsed / 1000
			startTimeRef.current = Date.now()
		}
		setPlaybackRate(rate)
	}

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = parseFloat(e.target.value)
		setCurrentTime(newTime)
		setProgressWidth((newTime / duration) * 100)
		pausedTimeRef.current = newTime
		if (isPlaying) {
			startTimeRef.current = Date.now()
		}
		if (wavesurferRef.current) {
			wavesurferRef.current.seekTo(newTime / duration)
		}
	}

	const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2]

	return (
		<div className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden">
			<div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
				<svg viewBox="0 0 100 100" className="w-full h-full">
					<circle cx="80" cy="20" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink-deep" />
					<circle cx="80" cy="20" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-ink-deep" />
				</svg>
			</div>

			<div className={`transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
				<div className="mb-6 text-center pb-4 border-b border-ink/10 relative">
					<div className="absolute left-1/2 -translate-x-1/2 top-0 w-12 h-0.5 bg-gradient-to-r from-transparent via-zhusha/40 to-transparent" />

					<h2 className="text-xl font-display font-semibold text-ink-deep mb-1.5 tracking-wider">
						WaveSurfer.js
					</h2>
					<p className="text-ink-medium text-sm tracking-wide mb-3">让音频波形在指尖舞动</p>
					<a
						href="https://wavesurfer.xyz/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300"
					>
						<span>wavesurfer.xyz</span>
						<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				</div>

				<div className="mb-6">
					<div className="flex gap-2 flex-wrap justify-center">
						<button
							onClick={() => setWaveStyle("wave")}
							className={`px-4 py-2 text-sm tracking-widest rounded transition-all duration-300 ${
								waveStyle === "wave" ? "bg-ink-deep text-paper" : "bg-ink/5 text-ink-medium hover:bg-ink/10"
							}`}
							style={{ fontFamily: "serif" }}
						>
							波形
						</button>
						<button
							onClick={() => setWaveStyle("bars")}
							className={`px-4 py-2 text-sm tracking-widest rounded transition-all duration-300 ${
								waveStyle === "bars" ? "bg-ink-deep text-paper" : "bg-ink/5 text-ink-medium hover:bg-ink/10"
							}`}
							style={{ fontFamily: "serif" }}
						>
							柱状
						</button>
					</div>
				</div>

				<div className="relative border border-ink/10 rounded-xl bg-paper-warm/30 overflow-hidden mb-6">
					<div ref={containerRef} className="w-full relative">
						{isPlaying && (
							<div
								className="absolute top-0 left-0 h-full bg-ink-deep/5 transition-all duration-100"
								style={{ width: `${progressWidth}%` }}
							/>
						)}
					</div>

					<div className="absolute bottom-2 right-2 text-xs text-ink-light/50 font-mono">
						{waveStyle === "wave" ? "波形渲染" : "柱状渲染"} · 合成数据
					</div>
				</div>

				<div className="mb-6">
					<div className="flex justify-between text-xs text-ink-medium mb-2">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
					<input
						type="range"
						min="0"
						max={duration}
						step="0.1"
						value={currentTime}
						onChange={handleSeek}
						className="w-full h-1.5 bg-ink/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zhusha [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
						disabled={!isLoaded}
					/>
				</div>

				<div className="flex items-center justify-center gap-4 mb-6">
					<button
						onClick={handlePlayPause}
						disabled={!isLoaded}
						className="w-14 h-14 rounded-full bg-ink-deep text-paper flex items-center justify-center shadow-lg shadow-ink/20 hover:shadow-xl hover:shadow-ink/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5"
					>
						{isPlaying ? (
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
							</svg>
						) : (
							<svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z" />
							</svg>
						)}
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div>
						<label className="block text-xs font-medium text-ink-medium mb-2">音量</label>
						<div className="flex items-center gap-3">
							<button
								onClick={() => handleVolumeChange(volume > 0 ? 0 : 0.8)}
								className="text-ink-medium hover:text-ink-deep transition-colors"
							>
								{volume === 0 ? (
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
									</svg>
								) : (
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
									</svg>
								)}
							</button>
							<input
								type="range"
								min="0"
								max="1"
								step="0.05"
								value={volume}
								onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
								className="flex-1 h-1.5 bg-ink/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zhusha"
							/>
							<span className="text-xs text-ink-medium w-8">{Math.round(volume * 100)}%</span>
						</div>
					</div>

					<div>
						<label className="block text-xs font-medium text-ink-medium mb-2">播放速度</label>
						<div className="flex items-center gap-2 flex-wrap">
							{playbackRates.map((rate) => (
								<button
									key={rate}
									onClick={() => handlePlaybackRateChange(rate)}
									className={`px-2 py-1 text-xs rounded transition-all duration-300 ${
										playbackRate === rate ? "bg-zhusha/10 border border-zhusha/30 text-zhusha" : "bg-ink/5 text-ink-medium hover:bg-ink/10"
									}`}
								>
									{rate}x
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="mt-6 pt-5 border-t border-ink/10">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Canvas</div>
							<div className="text-xs text-ink-light">高性能渲染</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">Peaks</div>
							<div className="text-xs text-ink-light">合成波形</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">零依赖</div>
							<div className="text-xs text-ink-light">轻量安装</div>
						</div>
						<div className="p-3 bg-paper-warm/50 rounded-lg border border-ink/5">
							<div className="text-lg font-display font-semibold text-zhusha mb-1">插件</div>
							<div className="text-xs text-ink-light">可扩展</div>
						</div>
					</div>
				</div>

				<div className="mt-6 text-center text-xs text-ink-light">
					<p className="tracking-wide">使用合成音频数据演示波形渲染 · 点击播放按钮开始</p>
				</div>
			</div>
		</div>
	)
}

export default WaveSurferjsDemo
