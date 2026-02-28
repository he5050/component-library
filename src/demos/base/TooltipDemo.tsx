import Tooltip from "../../components/base/Tooltip"
import Button from "../../components/base/Button"
import Divider from "../../components/base/Divider"

function TooltipDemo() {
	return (
		<div className="space-y-10">
			{/* 基础用法 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">基础用法</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">鼠标悬停时显示提示内容</p>
				<div className="flex gap-4">
					<Tooltip content="这是一个提示">
						<Button variant="secondary" size="sm">悬停查看</Button>
					</Tooltip>
				</div>
			</section>

			{/* 提示位置 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">提示位置</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">4方向</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">支持四个方向的提示位置</p>
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

			<Divider variant="brush" />

			{/* 使用场景 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">使用场景</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">图标提示和长文本提示</p>
				<div className="space-y-6">
					<div className="flex items-center gap-2">
						<span className="text-sm text-ink-thick">需要帮助？</span>
						<Tooltip content="点击这里获取更多帮助信息">
							<svg className="w-4 h-4 text-ink-medium cursor-help hover:text-ink-thick transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</Tooltip>
					</div>
					<div className="flex gap-4">
						<Tooltip content="这是一个比较长的提示文本，用于展示 Tooltip 对长文本的处理">
							<Button variant="secondary" size="sm">长文本提示</Button>
						</Tooltip>
					</div>
				</div>
			</section>
		</div>
	)
}

export default TooltipDemo
