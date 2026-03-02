import React, { useState } from "react"
import Button from "../../components/base/Button"
import Card from "../../components/base/Card"
import Divider from "../../components/base/Divider"

// 模拟动画库组件
const InkWashAnimation = ({
	children,
	type = "fade",
	duration = 300,
	delay = 0,
	easing = "ease-in-out",
	className = "",
}) => {
	const [isVisible, setIsVisible] = useState(false)

	const animationClasses = {
		fade: isVisible ? "opacity-100" : "opacity-0",
		"brush-stroke": isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4",
		ripple: isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0",
		zoom: isVisible ? "scale-100" : "scale-90",
	}

	const animationStyle = {
		transition: `all ${duration}ms ${easing} ${delay}ms`,
	}

	return (
		<div
			className={`transition-all duration-${duration} ease-${easing.replace("-", "")} ${
				animationClasses[type as keyof typeof animationClasses]
			} ${className}`}
			style={animationStyle}>
			{children}
		</div>
	)
}

function AnimationDemo() {
	const [animationType, setAnimationType] = useState<"fade" | "brush-stroke" | "ripple" | "zoom">("fade")
	const [shouldAnimate, setShouldAnimate] = useState(false)

	const handleAnimate = () => {
		setShouldAnimate(false)
		// 触发重绘以重新启动动画
		setTimeout(() => setShouldAnimate(true), 10)
	}

	return (
		<div className='space-y-10'>
			{/* 动画类型选择 */}
			<section className='p-6 bg-paper-warm/30 rounded-xl border border-ink/8'>
				<div className='flex items-center gap-2 mb-1'>
					<h3 className='text-base font-semibold text-ink-deep'>动画类型</h3>
					<span className='text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full'>4种</span>
				</div>
				<p className='text-sm text-ink-medium mb-5'>选择不同的水墨风格动画效果</p>
				<div className='flex flex-wrap gap-3'>
					<Button
						variant={animationType === "fade" ? "primary" : "secondary"}
						size='sm'
						onClick={() => setAnimationType("fade")}>
						淡入淡出
					</Button>
					<Button
						variant={animationType === "brush-stroke" ? "primary" : "secondary"}
						size='sm'
						onClick={() => setAnimationType("brush-stroke")}>
						笔触显现
					</Button>
					<Button
						variant={animationType === "ripple" ? "primary" : "secondary"}
						size='sm'
						onClick={() => setAnimationType("ripple")}>
						涟漪扩散
					</Button>
					<Button
						variant={animationType === "zoom" ? "primary" : "secondary"}
						size='sm'
						onClick={() => setAnimationType("zoom")}>
						缩放显现
					</Button>
				</div>
			</section>

			{/* 动画预览 */}
			<section className='p-6 bg-paper-warm/30 rounded-xl border border-ink/8'>
				<div className='flex items-center gap-2 mb-1'>
					<h3 className='text-base font-semibold text-ink-deep'>动画预览</h3>
				</div>
				<p className='text-sm text-ink-medium mb-5'>点击按钮触发所选类型的水墨动画效果</p>

				<div className='flex flex-col items-center justify-center py-10 space-y-8'>
					<div className='w-64 h-48 flex items-center justify-center'>
						<InkWashAnimation
							type={animationType}
							duration={500}
							className='w-full h-full flex items-center justify-center'>
							<Card variant='ink' className='w-48 h-32 flex items-center justify-center text-center'>
								<div className='text-ink-thick font-medium'>
									{animationType === "fade" && "淡入淡出效果"}
									{animationType === "brush-stroke" && "笔触显现效果"}
									{animationType === "ripple" && "涟漪扩散效果"}
									{animationType === "zoom" && "缩放显现效果"}
								</div>
							</Card>
						</InkWashAnimation>
					</div>

					<Button variant='primary' onClick={handleAnimate}>
						触发动画
					</Button>
				</div>
			</section>

			<Divider variant='brush' />

			{/* 参数配置 */}
			<section className='p-6 bg-paper-warm/30 rounded-xl border border-ink/8'>
				<div className='flex items-center gap-2 mb-1'>
					<h3 className='text-base font-semibold text-ink-deep'>参数配置</h3>
				</div>
				<p className='text-sm text-ink-medium mb-5'>调整动画参数以获得最佳效果</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-sm text-ink-medium mb-2'>持续时间: 500ms</label>
						<input
							type='range'
							min='100'
							max='2000'
							defaultValue='500'
							className='w-full'
							onChange={(e) => console.log(`Duration changed to: ${e.target.value}`)}
						/>
					</div>
					<div>
						<label className='block text-sm text-ink-medium mb-2'>延迟时间: 0ms</label>
						<input
							type='range'
							min='0'
							max='1000'
							defaultValue='0'
							className='w-full'
							onChange={(e) => console.log(`Delay changed to: ${e.target.value}`)}
						/>
					</div>
				</div>
			</section>

			{/* 适用场景 */}
			<section className='p-6 bg-paper-warm/30 rounded-xl border border-ink/8'>
				<div className='flex items-center gap-2 mb-1'>
					<h3 className='text-base font-semibold text-ink-deep'>适用场景</h3>
				</div>
				<p className='text-sm text-ink-medium mb-5'>水墨动画在不同场景下的应用示例</p>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					<Card variant='default' className='p-4'>
						<h4 className='font-medium text-ink-thick mb-2'>页面切换</h4>
						<p className='text-sm text-ink-medium'>在页面间切换时使用淡入淡出效果，营造平和的浏览体验</p>
					</Card>
					<Card variant='default' className='p-4'>
						<h4 className='font-medium text-ink-thick mb-2'>组件出现</h4>
						<p className='text-sm text-ink-medium'>使用笔触显现效果，模拟毛笔在宣纸上作画的过程</p>
					</Card>
					<Card variant='default' className='p-4'>
						<h4 className='font-medium text-ink-thick mb-2'>交互反馈</h4>
						<p className='text-sm text-ink-medium'>点击按钮时使用涟漪扩散效果，体现水滴石阶的意境</p>
					</Card>
				</div>
			</section>
		</div>
	)
}

export default AnimationDemo
