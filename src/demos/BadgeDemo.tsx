import Badge from "../components/Badge"

function BadgeDemo() {
	return (
		<div className="space-y-8">
			{/* 变体展示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">变体 Variants</h3>
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
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">使用场景</h3>
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<span className="text-sm text-ink-thick">状态标签：</span>
						<Badge variant="success">已完成</Badge>
						<Badge variant="warning">进行中</Badge>
						<Badge variant="danger">已取消</Badge>
					</div>
					<div className="flex items-center gap-3">
						<span className="text-sm text-ink-thick">优先级：</span>
						<Badge variant="danger">紧急</Badge>
						<Badge variant="warning">高</Badge>
						<Badge variant="info">中</Badge>
						<Badge>低</Badge>
					</div>
					<div className="flex items-center gap-3">
						<span className="text-sm text-ink-thick">类型标签：</span>
						<Badge variant="primary">特性</Badge>
						<Badge variant="info">修复</Badge>
						<Badge variant="success">优化</Badge>
					</div>
				</div>
			</section>

			{/* 组合展示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">列表中的应用</h3>
				<div className="max-w-md space-y-3">
					<div className="flex items-center justify-between p-3 bg-paper-warm rounded-lg border border-ink/10">
						<span className="text-sm text-ink-thick">用户注册功能</span>
						<Badge variant="success">已完成</Badge>
					</div>
					<div className="flex items-center justify-between p-3 bg-paper-warm rounded-lg border border-ink/10">
						<span className="text-sm text-ink-thick">支付接口对接</span>
						<Badge variant="warning">进行中</Badge>
					</div>
					<div className="flex items-center justify-between p-3 bg-paper-warm rounded-lg border border-ink/10">
						<span className="text-sm text-ink-thick">数据迁移任务</span>
						<Badge variant="danger">失败</Badge>
					</div>
					<div className="flex items-center justify-between p-3 bg-paper-warm rounded-lg border border-ink/10">
						<span className="text-sm text-ink-thick">文档更新</span>
						<Badge>待处理</Badge>
					</div>
				</div>
			</section>
		</div>
	)
}

export default BadgeDemo
