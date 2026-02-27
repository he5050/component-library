import { useState } from "react"
import Button from "../components/Button"

function ButtonDemo() {
	const [loading, setLoading] = useState(false)

	const handleClick = () => {
		setLoading(true)
		setTimeout(() => setLoading(false), 1000)
	}

	return (
		<div className="space-y-8">
			{/* 变体展示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">变体 Variants</h3>
				<div className="flex flex-wrap gap-4">
					<Button variant="primary">主要按钮</Button>
					<Button variant="secondary">次要按钮</Button>
					<Button variant="outline">描边按钮</Button>
					<Button variant="ghost">幽灵按钮</Button>
					<Button variant="danger">危险按钮</Button>
				</div>
			</section>

			{/* 尺寸展示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">尺寸 Sizes</h3>
				<div className="flex flex-wrap items-center gap-4">
					<Button size="sm">小按钮</Button>
					<Button size="md">中按钮</Button>
					<Button size="lg">大按钮</Button>
				</div>
			</section>

			{/* 禁用状态 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">禁用状态 Disabled</h3>
				<div className="flex flex-wrap gap-4">
					<Button disabled>禁用按钮</Button>
					<Button variant="secondary" disabled>
						禁用次要
					</Button>
					<Button variant="outline" disabled>
						禁用描边
					</Button>
				</div>
			</section>

			{/* 交互示例 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">交互示例</h3>
				<div className="flex flex-wrap gap-4">
					<Button onClick={handleClick} disabled={loading}>
						{loading ? "加载中..." : "点击加载"}
					</Button>
					<Button variant="outline" onClick={() => alert("点击了描边按钮")}>
						点击提示
					</Button>
				</div>
			</section>

			{/* 按钮组合 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">按钮组合</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="secondary">取消</Button>
					<Button>确认</Button>
				</div>
			</section>
		</div>
	)
}

export default ButtonDemo
