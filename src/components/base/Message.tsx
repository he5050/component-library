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

/**
 * 消息组件
 *
 * 水墨风格静态消息提示组件，支持多种类型和可关闭功能。
 * 适合页面内嵌的消息提示，与 Toast 不同的是不会自动消失。
 *
 * @param type - 消息类型：info（信息）、success（成功）、warning（警告）、danger（错误）
 * @param title - 消息标题（可选）
 * @param children - 消息内容
 * @param closable - 是否可关闭
 * @param onClose - 关闭回调函数
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Message type="info">这是一条信息提示</Message>
 * <Message type="success" title="操作成功">数据已保存</Message>
 * <Message type="warning" closable onClose={() => console.log("closed")}>
 *   请注意检查数据
 * </Message>
 * ```
 */
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
