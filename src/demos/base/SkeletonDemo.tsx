import Skeleton from "../../components/base/Skeleton"
import Card from "../../components/base/Card"
import Divider from "../../components/base/Divider"

function SkeletonDemo() {
	return (
		<div className="space-y-10">
			{/* 变体展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">变体 Variants</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">3种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">三种骨架屏变体</p>
				<div className="flex items-end gap-8">
					<div className="flex flex-col items-center gap-3">
						<Skeleton variant="text" width={160} />
						<span className="text-xs text-ink-light">text</span>
					</div>
					<div className="flex flex-col items-center gap-3">
						<Skeleton variant="circle" width={48} height={48} />
						<span className="text-xs text-ink-light">circle</span>
					</div>
					<div className="flex flex-col items-center gap-3">
						<Skeleton variant="rect" width={120} height={80} />
						<span className="text-xs text-ink-light">rect</span>
					</div>
				</div>
			</section>

			{/* 多行文本 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">多行文本</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">使用 rows 属性显示多行骨架</p>
				<div className="max-w-sm">
					<Skeleton variant="text" rows={3} />
				</div>
			</section>

			<Divider variant="brush" />

			{/* 卡片骨架 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">卡片骨架</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">组合使用构建复杂的加载占位</p>
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
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">自定义尺寸</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">通过 width 和 height 自定义尺寸</p>
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
