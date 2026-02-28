import Loading from "../../components/base/Loading"
import Button from "../../components/base/Button"
import Divider from "../../components/base/Divider"
import { useState } from "react"

function LoadingDemo() {
	const [showOverlay, setShowOverlay] = useState(false)

	return (
		<div className="space-y-10">
			{/* 尺寸展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">尺寸 Sizes</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">3种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">三种尺寸的加载指示器</p>
				<div className="flex items-center gap-10">
					<div className="flex flex-col items-center gap-3">
						<Loading size="sm" />
						<span className="text-xs text-ink-light">small</span>
					</div>
					<div className="flex flex-col items-center gap-3">
						<Loading size="md" />
						<span className="text-xs text-ink-light">medium</span>
					</div>
					<div className="flex flex-col items-center gap-3">
						<Loading size="lg" />
						<span className="text-xs text-ink-light">large</span>
					</div>
				</div>
			</section>

			{/* 带文字 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">带提示文字</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">显示加载状态说明</p>
				<div className="flex items-center gap-10">
					<Loading text="加载中..." />
					<Loading size="lg" text="正在保存" />
				</div>
			</section>

			<Divider variant="brush" />

			{/* 遮罩模式 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">全屏遮罩</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">点击按钮体验遮罩加载效果</p>
				<div className="relative h-48 bg-paper rounded-xl border border-ink/10 flex items-center justify-center">
					<Button onClick={() => setShowOverlay(true)}>显示遮罩加载</Button>
					{showOverlay && (
						<div className="absolute inset-0 rounded-xl overflow-hidden" onClick={() => setShowOverlay(false)}>
							<Loading overlay text="处理中..." />
						</div>
					)}
				</div>
				{showOverlay && (
					<p className="text-xs text-ink-light mt-2">点击遮罩区域关闭</p>
				)}
			</section>

			{/* 使用场景 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">使用场景</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">内联加载状态展示</p>
				<div className="max-w-sm p-5 bg-paper rounded-xl border border-ink/10">
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
