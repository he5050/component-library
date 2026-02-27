import Tooltip from "../components/Tooltip"
import Button from "../components/Button"

function TooltipDemo() {
	return (
		<div className="space-y-8">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<div className="flex gap-4">
					<Tooltip content="这是一个提示">
						<Button variant="secondary" size="sm">悬停查看</Button>
					</Tooltip>
				</div>
			</section>

			{/* 四个方向 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">提示位置</h3>
				<div className="flex flex-wrap gap-4">
					<Tooltip content="上方提示" position="top">
						<Button variant="secondary" size="sm">上方</Button>
					</Tooltip>
					<Tooltip content="下方提示" position="bottom">
						<Button variant="secondary" size="sm">下方</Button>
					</Tooltip>
					<Tooltip content="左侧提示" position="left">
						<Button variant="secondary" size="sm">左侧</Button>
					</Tooltip>
					<Tooltip content="右侧提示" position="right">
						<Button variant="secondary" size="sm">右侧</Button>
					</Tooltip>
				</div>
			</section>

			{/* 长文本提示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">长文本提示</h3>
				<div className="flex gap-4">
					<Tooltip content="这是一个比较长的提示文本，用于展示 Tooltip 组件对长文本的处理能力">
						<Button variant="secondary" size="sm">长文本提示</Button>
					</Tooltip>
				</div>
			</section>

			{/* 图标提示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">图标提示</h3>
				<div className="flex items-center gap-2">
					<span className="text-sm text-ink-thick">需要帮助？</span>
					<Tooltip content="点击这里获取更多帮助信息">
						<svg className="w-4 h-4 text-ink-medium cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</Tooltip>
				</div>
			</section>
		</div>
	)
}

export default TooltipDemo
