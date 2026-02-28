import Badge from "../../components/base/Badge"
import Divider from "../../components/base/Divider"

function BadgeDemo() {
	return (
		<div className="space-y-10">
			{/* 变体展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">变体 Variants</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">6种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">六种语义颜色变体</p>
				<div className="flex flex-wrap gap-3">
					<Badge>默认</Badge>
					<Badge variant="primary">主要</Badge>
					<Badge variant="success">成功</Badge>
					<Badge variant="warning">警告</Badge>
					<Badge variant="danger">危险</Badge>
					<Badge variant="info">信息</Badge>
				</div>
			</section>

			{/* 使用场景 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">使用场景</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">常见的徽标应用场景</p>
				<div className="space-y-6">
					<div>
						<p className="text-xs text-ink-light mb-3">状态标签</p>
						<div className="flex items-center gap-3">
							<Badge variant="success">已完成</Badge>
							<Badge variant="warning">进行中</Badge>
							<Badge variant="danger">已取消</Badge>
							<Badge>待处理</Badge>
						</div>
					</div>
					<div>
						<p className="text-xs text-ink-light mb-3">优先级</p>
						<div className="flex items-center gap-3">
							<Badge variant="danger">紧急</Badge>
							<Badge variant="warning">高</Badge>
							<Badge variant="info">中</Badge>
							<Badge>低</Badge>
						</div>
					</div>
					<div>
						<p className="text-xs text-ink-light mb-3">类型标签</p>
						<div className="flex items-center gap-3">
							<Badge variant="primary">特性</Badge>
							<Badge variant="info">修复</Badge>
							<Badge variant="success">优化</Badge>
						</div>
					</div>
				</div>
			</section>

			<Divider variant="brush" />

			{/* 列表应用 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">列表应用</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">在列表中展示状态</p>
				<div className="max-w-md space-y-3">
					<div className="flex items-center justify-between p-4 bg-paper rounded-lg border border-ink/10">
						<span className="text-sm text-ink-thick">用户注册功能</span>
						<Badge variant="success">已完成</Badge>
					</div>
					<div className="flex items-center justify-between p-4 bg-paper rounded-lg border border-ink/10">
						<span className="text-sm text-ink-thick">支付接口对接</span>
						<Badge variant="warning">进行中</Badge>
					</div>
					<div className="flex items-center justify-between p-4 bg-paper rounded-lg border border-ink/10">
						<span className="text-sm text-ink-thick">数据迁移任务</span>
						<Badge variant="danger">失败</Badge>
					</div>
					<div className="flex items-center justify-between p-4 bg-paper rounded-lg border border-ink/10">
						<span className="text-sm text-ink-thick">文档更新</span>
						<Badge>待处理</Badge>
					</div>
				</div>
			</section>
		</div>
	)
}

export default BadgeDemo
