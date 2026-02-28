import Divider from "../../components/base/Divider"

function DividerDemo() {
	return (
		<div className="space-y-10">
			{/* 变体展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">变体 Variants</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">4种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">四种分割线样式</p>
				<div className="space-y-8">
					<div>
						<p className="text-xs text-ink-light mb-3">default - 默认渐变</p>
						<Divider />
					</div>
					<div>
						<p className="text-xs text-ink-light mb-3">brush - 笔触风格</p>
						<Divider variant="brush" />
					</div>
					<div>
						<p className="text-xs text-ink-light mb-3">dashed - 虚线风格</p>
						<Divider variant="dashed" />
					</div>
					<div>
						<p className="text-xs text-ink-light mb-3">gradient - 朱砂渐变</p>
						<Divider variant="gradient" />
					</div>
				</div>
			</section>

			{/* 使用场景 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">使用场景</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">在内容中分隔不同区块</p>
				<div className="max-w-lg p-5 bg-paper rounded-xl border border-ink/10">
					<h4 className="font-medium text-ink-deep mb-2">文章标题</h4>
					<p className="text-sm text-ink-medium mb-4">
						这里是文章的简介内容，介绍文章的主要观点。
					</p>
					<Divider variant="brush" />
					<div className="py-4">
						<p className="text-sm text-ink-thick leading-relaxed">
							这是文章的正文内容。水墨设计理念强调"计白当黑"，
							通过留白和墨色的对比来传达意境。
						</p>
					</div>
					<Divider variant="dashed" />
					<p className="text-xs text-ink-light mt-4">
						发布于 2024年1月15日 · 阅读 1,234 次
					</p>
				</div>
			</section>
		</div>
	)
}

export default DividerDemo
