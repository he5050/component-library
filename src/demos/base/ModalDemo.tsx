import { useState } from "react"
import Modal from "../../components/base/Modal"
import Button from "../../components/base/Button"
import Divider from "../../components/base/Divider"

function ModalDemo() {
	const [basicOpen, setBasicOpen] = useState(false)
	const [confirmOpen, setConfirmOpen] = useState(false)
	const [formOpen, setFormOpen] = useState(false)

	return (
		<div className="space-y-10">
			{/* 基础弹窗 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">基础弹窗</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">点击按钮打开弹窗</p>
				<Button onClick={() => setBasicOpen(true)}>打开基础弹窗</Button>
				<Modal
					open={basicOpen}
					onClose={() => setBasicOpen(false)}
					title="提示"
				>
					<p className="text-ink-thick">这是一个基础的弹窗示例，点击遮罩或右上角按钮可以关闭。</p>
				</Modal>
			</section>

			{/* 确认弹窗 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">确认弹窗</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">带有操作按钮的确认弹窗</p>
				<Button variant="outline" onClick={() => setConfirmOpen(true)}>删除项目</Button>
				<Modal
					open={confirmOpen}
					onClose={() => setConfirmOpen(false)}
					title="确认删除"
					footer={
						<>
							<Button variant="ghost" onClick={() => setConfirmOpen(false)}>取消</Button>
							<Button variant="danger" onClick={() => setConfirmOpen(false)}>确认删除</Button>
						</>
					}
				>
					<p className="text-ink-thick">确定要删除这个项目吗？删除后将无法恢复。</p>
				</Modal>
			</section>

			<Divider variant="brush" />

			{/* 表单弹窗 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">表单弹窗</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">包含表单内容的弹窗</p>
				<Button variant="secondary" onClick={() => setFormOpen(true)}>编辑信息</Button>
				<Modal
					open={formOpen}
					onClose={() => setFormOpen(false)}
					title="编辑个人信息"
					footer={
						<>
							<Button variant="ghost" onClick={() => setFormOpen(false)}>取消</Button>
							<Button onClick={() => setFormOpen(false)}>保存</Button>
						</>
					}
				>
					<div className="space-y-4">
						<div>
							<label className="block text-sm text-ink-thick mb-1.5">姓名</label>
							<input 
								type="text" 
								className="w-full px-3 py-2 bg-paper-warm border border-ink/10 rounded-lg text-sm focus:border-focus focus:outline-none"
								placeholder="请输入姓名"
							/>
						</div>
						<div>
							<label className="block text-sm text-ink-thick mb-1.5">邮箱</label>
							<input 
								type="email" 
								className="w-full px-3 py-2 bg-paper-warm border border-ink/10 rounded-lg text-sm focus:border-focus focus:outline-none"
								placeholder="请输入邮箱"
							/>
						</div>
					</div>
				</Modal>
			</section>
		</div>
	)
}

export default ModalDemo
