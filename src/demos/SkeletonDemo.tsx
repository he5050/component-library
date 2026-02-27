import Skeleton from "../components/Skeleton"
import Card from "../components/Card"

function SkeletonDemo() {
	return (
		<div className="space-y-8">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<div className="space-y-3 max-w-sm">
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			</section>

			{/* 变体展示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">变体 Variants</h3>
				<div className="flex items-center gap-6">
					<div className="space-y-2">
						<Skeleton variant="text" width={200} />
						<span className="text-xs text-ink-light">text</span>
					</div>
					<div className="space-y-2">
						<Skeleton variant="circle" width={48} height={48} />
						<span className="text-xs text-ink-light">circle</span>
					</div>
					<div className="space-y-2">
						<Skeleton variant="rect" width={120} height={80} />
						<span className="text-xs text-ink-light">rect</span>
					</div>
				</div>
			</section>

			{/* 多行文本 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">多行文本</h3>
				<div className="max-w-sm">
					<Skeleton variant="text" rows={3} />
				</div>
			</section>

			{/* 卡片骨架 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">卡片骨架</h3>
				<div className="max-w-sm">
					<Card className="p-4" hoverable={false}>
						<div className="flex gap-4">
							<Skeleton variant="circle" width={48} height={48} />
							<div className="flex-1 space-y-2">
								<Skeleton variant="text" width="60%" />
								<Skeleton variant="text" width="40%" />
							</div>
						</div>
						<div className="mt-4 space-y-2">
							<Skeleton variant="text" />
							<Skeleton variant="text" />
							<Skeleton variant="text" width="80%" />
						</div>
					</Card>
				</div>
			</section>

			{/* 自定义尺寸 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">自定义尺寸</h3>
				<div className="flex flex-wrap gap-4">
					<Skeleton variant="rect" width={100} height={100} />
					<Skeleton variant="rect" width={150} height={80} />
					<Skeleton variant="rect" width={200} height={60} />
				</div>
			</section>
		</div>
	)
}

export default SkeletonDemo
