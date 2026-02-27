import Loading from "../components/Loading"
import Button from "../components/Button"
import { useState } from "react"

function LoadingDemo() {
	const [showOverlay, setShowOverlay] = useState(false)

	return (
		<div className="space-y-8">
			{/* 尺寸展示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">尺寸 Sizes</h3>
				<div className="flex items-center gap-8">
					<div className="flex flex-col items-center gap-2">
						<Loading size="sm" />
						<span className="text-xs text-ink-light">small</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Loading size="md" />
						<span className="text-xs text-ink-light">medium</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Loading size="lg" />
						<span className="text-xs text-ink-light">large</span>
					</div>
				</div>
			</section>

			{/* 带文字 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">带提示文字</h3>
				<div className="flex items-center gap-8">
					<Loading text="加载中..." />
					<Loading size="lg" text="正在保存" />
				</div>
			</section>

			{/* 遮罩模式 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">全屏遮罩</h3>
				<div className="relative h-40 bg-paper-warm rounded-lg border border-ink/10 flex items-center justify-center">
					<Button onClick={() => setShowOverlay(true)}>显示遮罩加载</Button>
					{showOverlay && (
						<div className="absolute inset-0 rounded-lg overflow-hidden">
							<Loading overlay text="处理中..." />
						</div>
					)}
				</div>
				{showOverlay && (
					<button 
						onClick={() => setShowOverlay(false)}
						className="mt-2 text-sm text-link hover:underline"
					>
						点击关闭遮罩
					</button>
				)}
			</section>

			{/* 使用场景 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">使用场景</h3>
				<div className="max-w-sm p-5 bg-paper-warm rounded-lg border border-ink/10">
					<div className="flex items-center gap-3">
						<Loading size="sm" />
						<span className="text-sm text-ink-medium">正在加载数据...</span>
					</div>
				</div>
			</section>
		</div>
	)
}

export default LoadingDemo
