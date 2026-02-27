import Divider from "../components/Divider"

function DividerDemo() {
	return (
		<div className="space-y-8 max-w-lg">
			{/* 默认分割线 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">默认分割线</h3>
				<div className="space-y-4">
					<p className="text-sm text-ink-medium">
						这是上方的内容区域，使用默认分割线进行分隔。
					</p>
					<Divider />
					<p className="text-sm text-ink-medium">
						这是下方的内容区域，默认分割线采用从透明到墨色再到透明的渐变效果。
					</p>
				</div>
			</section>

			{/* 笔触风格 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">笔触风格</h3>
				<div className="space-y-4">
					<p className="text-sm text-ink-medium">
						笔触风格分割线模拟毛笔在宣纸上留下的痕迹。
					</p>
					<Divider variant="brush" />
					<p className="text-sm text-ink-medium">
						较粗的线条配合透明度，营造出水墨画的意境。
					</p>
				</div>
			</section>

			{/* 虚线风格 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">虚线风格</h3>
				<div className="space-y-4">
					<p className="text-sm text-ink-medium">
						虚线分割线适合用于次要内容的区分。
					</p>
					<Divider variant="dashed" />
					<p className="text-sm text-ink-medium">
						采用虚线边框实现，简洁而不突兀。
					</p>
				</div>
			</section>

			{/* 朱砂渐变 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">朱砂渐变</h3>
				<div className="space-y-4">
					<p className="text-sm text-ink-medium">
						朱砂渐变分割线使用主题强调色，用于重要内容的分隔。
					</p>
					<Divider variant="gradient" />
					<p className="text-sm text-ink-medium">
						淡淡的朱砂色渐变，为页面增添一抹亮色。
					</p>
				</div>
			</section>

			{/* 组合使用 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">组合使用</h3>
				<div className="p-5 bg-paper-warm rounded-lg border border-ink/10">
					<h4 className="font-medium text-ink-deep mb-2">文章标题</h4>
					<p className="text-sm text-ink-medium mb-4">
						这里是文章的简介内容，介绍文章的主要内容和观点。
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
