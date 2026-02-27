import Avatar from "../components/Avatar"

function AvatarDemo() {
	return (
		<div className="space-y-8">
			{/* 尺寸展示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">尺寸 Sizes</h3>
				<div className="flex items-center gap-6">
					<div className="flex flex-col items-center gap-2">
						<Avatar name="张三" size="sm" />
						<span className="text-xs text-ink-light">small</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Avatar name="张三" size="md" />
						<span className="text-xs text-ink-light">medium</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Avatar name="张三" size="lg" />
						<span className="text-xs text-ink-light">large</span>
					</div>
				</div>
			</section>

			{/* 图片头像 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">图片头像</h3>
				<div className="flex items-center gap-4">
					<Avatar 
						src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
						name="Felix" 
						size="md" 
					/>
					<Avatar 
						src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" 
						name="Aneka" 
						size="lg" 
					/>
				</div>
			</section>

			{/* 文字头像 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">文字头像</h3>
				<div className="flex items-center gap-4">
					<Avatar name="张三" />
					<Avatar name="李四" />
					<Avatar name="王五" />
					<Avatar name="John Doe" />
				</div>
			</section>

			{/* 失败回退 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">图片加载失败回退</h3>
				<div className="flex items-center gap-4">
					<Avatar 
						src="https://invalid-url.com/avatar.jpg" 
						name="回退示例" 
						size="lg" 
					/>
					<p className="text-sm text-ink-medium">当图片加载失败时，自动显示姓名首字母</p>
				</div>
			</section>

			{/* 无名称 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">无名称</h3>
				<div className="flex items-center gap-4">
					<Avatar size="md" />
					<p className="text-sm text-ink-medium">未提供名称时显示 "?"</p>
				</div>
			</section>

			{/* 组合使用 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">组合使用</h3>
				<div className="flex -space-x-2">
					<Avatar name="张三" size="md" className="border-2 border-paper" />
					<Avatar name="李四" size="md" className="border-2 border-paper" />
					<Avatar name="王五" size="md" className="border-2 border-paper" />
					<Avatar name="赵六" size="md" className="border-2 border-paper" />
					<div className="w-10 h-10 rounded-full bg-ink-pale border-2 border-paper flex items-center justify-center text-xs text-ink-medium">
						+3
					</div>
				</div>
			</section>
		</div>
	)
}

export default AvatarDemo
