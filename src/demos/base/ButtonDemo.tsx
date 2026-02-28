import { useState } from "react"
import Button from "../../components/base/Button"
import Divider from "../../components/base/Divider"

function ButtonDemo() {
	const [loading, setLoading] = useState(false)

	const handleClick = () => {
		setLoading(true)
		setTimeout(() => setLoading(false), 1000)
	}

	return (
		<div className="space-y-10">
			{/* 变体展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">变体 Variants</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">5种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">按钮支持五种变体，适用于不同的操作场景</p>
				<div className="flex flex-wrap gap-4">
					<Button variant="primary">主要按钮</Button>
					<Button variant="secondary">次要按钮</Button>
					<Button variant="outline">描边按钮</Button>
					<Button variant="ghost">幽灵按钮</Button>
					<Button variant="danger">危险按钮</Button>
				</div>
			</section>

			{/* 尺寸展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">尺寸 Sizes</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">3种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">三种尺寸满足不同布局需求</p>
				<div className="flex flex-wrap items-end gap-4">
					<div className="flex flex-col items-center gap-2">
						<Button size="sm">小按钮</Button>
						<span className="text-xs text-ink-light">sm</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Button size="md">中按钮</Button>
						<span className="text-xs text-ink-light">md</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Button size="lg">大按钮</Button>
						<span className="text-xs text-ink-light">lg</span>
					</div>
				</div>
			</section>

			{/* 禁用状态 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">禁用状态 Disabled</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">禁用状态下按钮不可交互</p>
				<div className="flex flex-wrap gap-4">
					<Button disabled>禁用主要</Button>
					<Button variant="secondary" disabled>禁用次要</Button>
					<Button variant="outline" disabled>禁用描边</Button>
					<Button variant="danger" disabled>禁用危险</Button>
				</div>
			</section>

			{/* 交互示例 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">交互示例</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可点击</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">点击按钮体验交互效果</p>
				<div className="flex flex-wrap gap-4">
					<Button onClick={handleClick} disabled={loading}>
						{loading ? "加载中..." : "点击加载"}
					</Button>
					<Button variant="outline" onClick={() => alert("点击了描边按钮")}>
						点击提示
					</Button>
				</div>
			</section>

			<Divider variant="brush" />

			{/* 按钮组合 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">按钮组合</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">常见的按钮组合场景</p>
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<Button variant="secondary">取消</Button>
						<Button>确认</Button>
					</div>
					<div className="flex items-center gap-3">
						<Button variant="ghost">返回</Button>
						<Button variant="secondary">保存草稿</Button>
						<Button>提交</Button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default ButtonDemo
