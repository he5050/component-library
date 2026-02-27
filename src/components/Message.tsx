import React from "react"

type MessageType = "info" | "success" | "warning" | "danger"

interface MessageProps {
  type?: MessageType
  title?: string
  children: React.ReactNode
  closable?: boolean
  onClose?: () => void
  className?: string
}

const messageIcons: Record<MessageType, string> = {
  info: "\u2139",
  success: "\u2713",
  warning: "\u26A0",
  danger: "\u2715",
}

const messageStyles: Record<MessageType, string> = {
  info: "border-info/20 bg-dian/5 text-ink-thick",
  success: "border-success/20 bg-zhu/5 text-ink-thick",
  warning: "border-warning/20 bg-amber/5 text-ink-thick",
  danger: "border-danger/20 bg-danger/5 text-ink-thick",
}

const messageIconStyles: Record<MessageType, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
}

function Message({ type = "info", title, children, closable = false, onClose, className = "" }: MessageProps) {
  return (
    <div
      role={type === "danger" ? "alert" : "status"}
      aria-live={type === "danger" ? "assertive" : "polite"}
      className={`
        flex gap-3 px-4 py-3 rounded-lg border
        font-body text-sm leading-relaxed
        ${messageStyles[type]}
        ${className}
      `}>
      <span className={`text-base flex-shrink-0 mt-0.5 ${messageIconStyles[type]}`}>
        {messageIcons[type]}
      </span>
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold text-ink-deep mb-1">{title}</div>
        )}
        <div>{children}</div>
      </div>
      {closable && (
        <button
          onClick={onClose}
          aria-label="关闭消息"
          className="flex-shrink-0 p-0.5 rounded-md text-ink-light hover:text-ink-medium hover:bg-ink/5 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default Message
