import React, { useEffect, useRef } from "react"

interface ModalProps {
	open: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
	footer?: React.ReactNode
	className?: string
}

/**
 * 模态对话框组件
 *
 * 水墨风格模态对话框，支持标题、内容和底部操作区。
 * 内置焦点陷阱和 Escape 键关闭功能，符合无障碍访问标准。
 *
 * @param open - 是否显示弹窗
 * @param onClose - 关闭回调函数
 * @param title - 弹窗标题
 * @param children - 弹窗内容
 * @param footer - 底部操作区内容（通常放置按钮）
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false)
 * <Modal open={open} onClose={() => setOpen(false)} title="确认删除" footer={
 *   <>
 *     <Button variant="ghost" onClick={() => setOpen(false)}>取消</Button>
 *     <Button variant="danger" onClick={handleDelete}>确认</Button>
 *   </>
 * }>
 *   <p>删除后数据将无法恢复，确定要删除吗？</p>
 * </Modal>
 * ```
 */
function Modal({ open, onClose, title, children, footer, className = "" }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) return

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
				return
			}
			if (e.key !== "Tab" || !modalRef.current) return

			const focusable = modalRef.current.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
			const first = focusable[0]
			const last = focusable[focusable.length - 1]

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault()
				last?.focus()
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault()
				first?.focus()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		document.body.style.overflow = "hidden"
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
			document.body.style.overflow = ""
		}
	}, [open, onClose])

	if (!open) return null

	return (
		<div
			className="fixed inset-0 z-[var(--z-overlay,300)] flex items-center justify-center"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title">
			<div
				className="absolute inset-0 bg-ink-deep/40 backdrop-blur-[2px]"
				onClick={onClose}
			/>
			<div
				ref={modalRef}
				className={`
          relative z-[var(--z-modal,400)] w-full max-w-md mx-4
          bg-paper rounded-xl border border-ink/10 shadow-xl overflow-hidden
          ${className}
        `}>
				<div className="flex items-center justify-between px-6 py-4 border-b border-ink/8">
					<h2 id="modal-title" className="text-lg font-display font-semibold text-ink-deep">{title}</h2>
					<button
						onClick={onClose}
						aria-label="关闭弹窗"
						className="p-1 rounded-md text-ink-medium hover:bg-ink-pale focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 transition-colors">
						<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div className="px-6 py-5 text-sm text-ink-thick leading-relaxed">
					{children}
				</div>
				{footer && (
					<div className="flex justify-end gap-3 px-6 py-4 border-t border-ink/8 bg-paper-warm/50">
						{footer}
					</div>
				)}
			</div>
		</div>
	)
}

export default Modal
