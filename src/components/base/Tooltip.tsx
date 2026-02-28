import React, { useState, useRef } from "react"

interface TooltipProps {
	content: string
	children: React.ReactNode
	position?: "top" | "bottom" | "left" | "right"
	className?: string
}

/**
 * 提示组件
 *
 * 水墨风格悬浮提示组件，鼠标悬停时显示提示内容。
 * 支持四个方向的定位，采用墨色背景和白色文字。
 *
 * @param content - 提示内容
 * @param children - 触发提示的元素
 * @param position - 提示位置：top（上）、bottom（下）、left（左）、right（右）
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Tooltip content="这是一个提示">
 *   <Button>悬停查看</Button>
 * </Tooltip>
 *
 * <Tooltip content="底部提示" position="bottom">
 *   <span>信息图标</span>
 * </Tooltip>
 * ```
 */
function Tooltip({ content, children, position = "top", className = "" }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false)
	const tooltipRef = useRef<HTMLDivElement>(null)

	const positionStyles = {
		top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
		bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
		left: "right-full top-1/2 -translate-y-1/2 mr-2",
		right: "left-full top-1/2 -translate-y-1/2 ml-2",
	}

	const arrowStyles = {
		top: "top-full left-1/2 -translate-x-1/2 border-t-ink-deep",
		bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-ink-deep",
		left: "left-full top-1/2 -translate-y-1/2 border-l-ink-deep",
		right: "right-full top-1/2 -translate-y-1/2 border-r-ink-deep",
	}

	return (
		<div
			className="relative inline-flex"
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}>
			{children}
			{isVisible && (
				<div
					ref={tooltipRef}
					role="tooltip"
					className={`
            absolute z-[var(--z-popover,500)] px-2.5 py-1.5
            bg-ink-deep text-paper text-xs rounded-md
            whitespace-nowrap pointer-events-none
            opacity-0 animate-[fade-in_0.15s_ease_forwards]
            ${positionStyles[position]}
            ${className}
          `}>
					{content}
					<div
						className={`
              absolute w-0 h-0
              border-4 border-transparent
              ${arrowStyles[position]}
            `}
					/>
				</div>
			)}
		</div>
	)
}

export default Tooltip
