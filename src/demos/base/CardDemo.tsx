import Card from "../../components/base/Card"
import Badge from "../../components/base/Badge"
import Divider from "../../components/base/Divider"

function CardDemo() {
	return (
		<div className="space-y-10">
			{/* 变体展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">变体 Variants</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">3种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">三种卡片变体，满足不同的视觉层次需求</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="p-4">
						<h4 className="font-medium text-ink-deep mb-2">默认卡片</h4>
						<p className="text-sm text-ink-medium">标准圆角设计，适用于大多数场景</p>
					</Card>
					<Card variant="ink" className="p-4">
						<h4 className="font-medium text-ink-deep mb-2">墨迹风格</h4>
						<p className="text-sm text-ink-medium">不规则圆角，模拟水墨晕染效果</p>
					</Card>
					<Card variant="featured" className="p-4">
						<h4 className="font-medium text-ink-deep mb-2">特色高亮</h4>
						<p className="text-sm text-ink-medium">朱砂边框，突出重要内容</p>
					</Card>
				</div>
			</section>

			{/* 内容示例 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">内容示例</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">丰富的卡片内容布局示例</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="p-5">
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 rounded-full bg-ink-pale flex items-center justify-center text-ink-medium font-medium">
								墨
							</div>
							<div>
								<h4 className="font-medium text-ink-deep">水墨风格</h4>
								<p className="text-xs text-ink-light">计白当黑</p>
							</div>
						</div>
						<p className="text-sm text-ink-medium leading-relaxed">
							采用宣纸色背景和墨色边框，通过留白和墨色对比传达禅意美学。
						</p>
					</Card>
					<Card variant="featured" className="p-5">
						<div className="flex items-start justify-between mb-3">
							<h4 className="font-medium text-ink-deep">重要通知</h4>
							<Badge variant="primary">New</Badge>
						</div>
						<p className="text-sm text-ink-medium leading-relaxed mb-3">
							特色卡片使用朱砂色边框和阴影，用于突出显示重要内容。
						</p>
						<div className="text-xs text-ink-light">2024年1月15日</div>
					</Card>
				</div>
			</section>

			<Divider variant="brush" />

			{/* 交互状态 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">交互状态</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">悬浮效果和点击交互</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card hoverable={false} className="p-5">
						<h4 className="font-medium text-ink-deep mb-2">静态卡片</h4>
						<p className="text-sm text-ink-medium">设置 hoverable=false 禁用悬浮效果</p>
					</Card>
					<Card onClick={() => alert("点击了卡片")} className="p-5 cursor-pointer">
						<h4 className="font-medium text-ink-deep mb-2">可点击卡片</h4>
						<p className="text-sm text-ink-medium">添加 onClick 属性，点击试试</p>
					</Card>
				</div>
			</section>
		</div>
	)
}

export default CardDemo
