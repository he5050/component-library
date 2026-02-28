import Avatar from "../../components/base/Avatar"
import Divider from "../../components/base/Divider"

function AvatarDemo() {
	return (
		<div className="space-y-10">
			{/* 尺寸展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">尺寸 Sizes</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">3种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">三种尺寸的头像组件</p>
				<div className="flex items-center gap-8">
					<div className="flex flex-col items-center gap-3">
						<Avatar name="张三" size="sm" />
						<span className="text-xs text-ink-light">small</span>
					</div>
					<div className="flex flex-col items-center gap-3">
						<Avatar name="张三" size="md" />
						<span className="text-xs text-ink-light">medium</span>
					</div>
					<div className="flex flex-col items-center gap-3">
						<Avatar name="张三" size="lg" />
						<span className="text-xs text-ink-light">large</span>
					</div>
				</div>
			</section>

			{/* 图片头像 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">图片头像</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">使用图片 URL 显示头像</p>
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
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">文字头像</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">未提供图片时显示姓名首字母</p>
				<div className="flex items-center gap-4">
					<Avatar name="张三" />
					<Avatar name="李四" />
					<Avatar name="王五" />
					<Avatar name="John Doe" />
				</div>
			</section>

			<Divider variant="brush" />

			{/* 失败回退 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">加载失败回退</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">图片加载失败时自动显示姓名首字母</p>
				<div className="flex items-center gap-4">
					<Avatar 
						src="https://invalid-url.com/avatar.jpg" 
						name="回退示例" 
						size="lg" 
					/>
					<p className="text-sm text-ink-medium">图片 URL 无效，自动回退到文字头像</p>
				</div>
			</section>

			{/* 组合使用 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">组合使用</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">头像堆叠展示</p>
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
