import { useState } from "react"
import Toast from "../../components/base/Toast"
import Button from "../../components/base/Button"
import Divider from "../../components/base/Divider"

type ToastType = "info" | "success" | "warning" | "danger"

function ToastDemo() {
	const [toasts, setToasts] = useState<Array<{ id: number; type: ToastType; message: string }>>([])

	const showToast = (type: ToastType, message: string) => {
		const id = Date.now()
		setToasts(prev => [...prev, { id, type, message }])
	}

	const removeToast = (id: number) => {
		setToasts(prev => prev.filter(t => t.id !== id))
	}

	return (
		<div className="space-y-10">
			{/* 消息类型 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">消息类型</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">4种</span>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">点击按钮显示不同类型的 Toast</p>
				<div className="flex flex-wrap gap-3">
					<Button onClick={() => showToast("info", "这是一条信息提示")}>信息</Button>
					<Button variant="secondary" onClick={() => showToast("success", "操作成功完成")}>成功</Button>
					<Button variant="outline" onClick={() => showToast("warning", "请注意检查")}>警告</Button>
					<Button variant="danger" onClick={() => showToast("danger", "操作失败，请重试")}>错误</Button>
				</div>
			</section>

			<Divider variant="brush" />

			{/* 使用场景 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">使用场景</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">Toast 适合短暂的操作反馈提示</p>
				<div className="space-y-4">
					<Button 
						variant="secondary" 
						onClick={() => showToast("info", "这是一条比较长的提示消息，用于展示 Toast 对长文本的处理效果")}
					>
						长文本提示
					</Button>
					<Button 
						onClick={() => {
							showToast("info", "第一个提示消息")
							setTimeout(() => showToast("success", "第二个提示消息"), 500)
							setTimeout(() => showToast("warning", "第三个提示消息"), 1000)
						}}
					>
						连续显示多个
					</Button>
				</div>
			</section>

			{/* 渲染所有 Toast */}
			{toasts.map((toast, index) => (
				<div
					key={toast.id}
					style={{ top: `${24 + index * 64}px` }}
					className="fixed right-6 z-[600]"
				>
					<Toast
						type={toast.type}
						message={toast.message}
						onClose={() => removeToast(toast.id)}
					/>
				</div>
			))}
		</div>
	)
}

export default ToastDemo
