import React, { useEffect, useRef } from "react"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

function Modal({ open, onClose, title, children, footer, className = "" }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  /* 焦点陷阱 + Escape 关闭 */
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
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-ink-deep/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      {/* 弹窗主体 */}
      <div
        ref={modalRef}
        className={`
          relative z-[var(--z-modal,400)] w-full max-w-md mx-4
          bg-paper rounded-xl border border-ink/10 shadow-xl overflow-hidden
          ${className}
        `}>
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/8">
          <h2 id="modal-title" className="text-lg font-display font-semibold text-ink-deep">{title}</h2>
          <button
            onClick={onClose}
            aria-label="关闭弹窗"
            className="p-1 rounded-md text-ink-medium hover:bg-ink-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* 内容区 */}
        <div className="px-6 py-5 text-sm text-ink-thick leading-relaxed">
          {children}
        </div>
        {/* 底部操作 */}
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
