import { useState } from "react"
import Toast from "../components/Toast"
import Button from "../components/Button"

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
		<div className="space-y-8">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<div className="flex flex-wrap gap-3">
					<Button onClick={() => showToast("info", "这是一条信息提示")}>信息</Button>
					<Button variant="secondary" onClick={() => showToast("success", "操作成功完成")}>成功</Button>
					<Button variant="outline" onClick={() => showToast("warning", "请注意检查")}>警告</Button>
					<Button variant="danger" onClick={() => showToast("danger", "操作失败，请重试")}>错误</Button>
				</div>
			</section>

			{/* 长文本提示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">长文本提示</h3>
				<Button 
					variant="secondary" 
					onClick={() => showToast("info", "这是一条比较长的提示消息，用于展示 Toast 组件对长文本的处理效果")}
				>
					显示长文本提示
				</Button>
			</section>

			{/* 多个提示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">多个提示</h3>
				<Button 
					onClick={() => {
						showToast("info", "第一个提示消息")
						setTimeout(() => showToast("success", "第二个提示消息"), 500)
						setTimeout(() => showToast("warning", "第三个提示消息"), 1000)
					}}
				>
					连续显示多个
				</Button>
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
