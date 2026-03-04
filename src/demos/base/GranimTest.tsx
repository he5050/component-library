import { useState, useRef, useEffect } from "react"

// 最小测试版本 - 验证 Granim 核心功能
function GranimTest() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [status, setStatus] = useState<string>("初始化中...")
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let granimInstance: any = null

		const init = async () => {
			try {
				setStatus("1. 等待 DOM 渲染...")
				await new Promise((r) => setTimeout(r, 500))

				const canvas = canvasRef.current
				if (!canvas) {
					setError("Canvas 元素未找到")
					return
				}

				setStatus("2. Canvas 尺寸: " + canvas.getBoundingClientRect().width + "x" + canvas.getBoundingClientRect().height)

				// 等待下一帧
				await new Promise((r) => requestAnimationFrame(r))

				const rect = canvas.getBoundingClientRect()
				canvas.width = rect.width
				canvas.height = rect.height

				setStatus("3. 动态导入 Granim...")

				const GranimModule = await import("granim")
				const GranimClass = GranimModule.default || GranimModule

				setStatus("4. 创建 Granim 实例...")

				granimInstance = new GranimClass({
					element: canvas,
					direction: "left-right",
					opacity: [1, 1],
					speed: 50,
					gradients: [
						["#ff9a9e", "#fecfef"],
						["#a18cd1", "#fbc2eb"],
					],
				})

				setStatus("5. 实例创建成功! 动画应该正在播放")

				// 测试播放
				setTimeout(() => {
					setStatus("6. 测试暂停...")
					granimInstance.pause()
					setStatus("已暂停")
				}, 3000)

			} catch (err: any) {
				setError(err.message || String(err))
			}
		}

		init()

		return () => {
			if (granimInstance) {
				granimInstance.destroy()
			}
		}
	}, [])

	return (
		<div className='p-8 bg-paper'>
			<h1 className='text-xl font-bold mb-4'>Granim 最小测试</h1>

			<div className='mb-4 p-3 bg-yellow-100 rounded'>
				<p className='text-sm'>状态: {status}</p>
				{error && <p className='text-sm text-red-600'>错误: {error}</p>}
			</div>

			<div className='relative h-[400px] w-[600px] border border-gray-300 rounded overflow-hidden'>
				<canvas
					ref={canvasRef}
					className='absolute inset-0 w-full h-full'
				/>
			</div>
		</div>
	)
}

export default GranimTest