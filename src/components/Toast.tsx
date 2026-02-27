import { useEffect, useState } from "react"

type ToastType = "info" | "success" | "warning" | "danger"

interface ToastProps {
  type?: ToastType
  message: string
  duration?: number
  onClose?: () => void
  className?: string
}

const toastIcons: Record<ToastType, string> = {
  info: "\u2139",
  success: "\u2713",
  warning: "\u26A0",
  danger: "\u2715",
}

const toastStyles: Record<ToastType, string> = {
  info: "border-info/20 bg-paper",
  success: "border-success/20 bg-paper",
  warning: "border-warning/20 bg-paper",
  danger: "border-danger/20 bg-paper",
}

const toastIconStyles: Record<ToastType, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
}

function Toast({ type = "info", message, duration = 3000, onClose, className = "" }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (duration <= 0) return
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        fixed top-6 right-6 z-[var(--z-toast,600)]
        flex items-center gap-3 px-4 py-3
        rounded-lg border shadow-lg
        text-sm text-ink-thick font-body
        ${toastStyles[type]}
        ${className}
      `}>
      <span className={`text-base ${toastIconStyles[type]}`}>{toastIcons[type]}</span>
      <span>{message}</span>
      <button
        onClick={() => { setVisible(false); onClose?.() }}
        aria-label="关闭提示"
        className="ml-2 p-0.5 text-ink-light hover:text-ink-medium transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default Toast
