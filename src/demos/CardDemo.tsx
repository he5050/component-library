import Card from "../components/Card"
import Badge from "../components/Badge"

function CardDemo() {
	return (
		<div className="space-y-8">
			{/* 默认卡片 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">默认卡片</h3>
				<div className="max-w-sm">
					<Card className="p-5">
						<h4 className="font-medium text-ink-deep mb-2">卡片标题</h4>
						<p className="text-sm text-ink-medium leading-relaxed">
							这是一张基础卡片，采用宣纸色背景和墨色边框，体现水墨设计的留白美学。
						</p>
					</Card>
				</div>
			</section>

			{/* 墨迹风格卡片 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">墨迹风格</h3>
				<div className="max-w-sm">
					<Card variant="ink" className="p-5">
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 rounded-full bg-ink-pale flex items-center justify-center text-ink-medium font-medium">
								墨
							</div>
							<div>
								<h4 className="font-medium text-ink-deep">水墨风格</h4>
								<p className="text-xs text-ink-light">不规则圆角设计</p>
							</div>
						</div>
						<p className="text-sm text-ink-medium leading-relaxed">
							采用不规则圆角，模拟墨迹在宣纸上晕染的自然形态。
						</p>
					</Card>
				</div>
			</section>

			{/* 特色卡片 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">特色高亮</h3>
				<div className="max-w-sm">
					<Card variant="featured" className="p-5">
						<div className="flex items-start justify-between mb-3">
							<h4 className="font-medium text-ink-deep">重要通知</h4>
							<Badge variant="primary">New</Badge>
						</div>
						<p className="text-sm text-ink-medium leading-relaxed">
							特色卡片使用朱砂色边框和阴影，用于突出显示重要内容。
						</p>
					</Card>
				</div>
			</section>

			{/* 不可悬浮卡片 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">静态卡片</h3>
				<div className="max-w-sm">
					<Card hoverable={false} className="p-5">
						<h4 className="font-medium text-ink-deep mb-2">静态展示</h4>
						<p className="text-sm text-ink-medium leading-relaxed">
							设置 hoverable=false 可禁用悬浮效果，适用于纯展示场景。
						</p>
					</Card>
				</div>
			</section>

			{/* 可点击卡片 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">可点击卡片</h3>
				<div className="max-w-sm">
					<Card
						onClick={() => alert("点击了卡片")}
						className="p-5 cursor-pointer"
					>
						<h4 className="font-medium text-ink-deep mb-2">点击我</h4>
						<p className="text-sm text-ink-medium leading-relaxed">
							添加 onClick 属性后，卡片变为可点击状态，带有悬浮反馈。
						</p>
					</Card>
				</div>
			</section>
		</div>
	)
}

export default CardDemo
