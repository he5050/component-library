import React from "react"

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info"

interface BadgeProps {
	children: React.ReactNode
	variant?: BadgeVariant
	className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
	default: "bg-ink-pale/60 text-ink-medium border-ink/10",
	primary: "bg-zhusha/10 text-zhusha border-zhusha/20",
	success: "bg-zhu/10 text-zhu border-zhu/20",
	warning: "bg-amber/10 text-amber border-amber/20",
	danger: "bg-danger/10 text-danger border-danger/20",
	info: "bg-dian/10 text-dian border-dian/20",
}

/**
 * 徽章组件
 *
 * 水墨风格状态徽章标签，支持多种语义颜色。
 * 采用柔和的背景色和边框，适合标签和状态标识。
 *
 * @param children - 徽章内容
 * @param variant - 徽章变体：default（默认）、primary（主要）、success（成功）、warning（警告）、danger（危险）、info（信息）
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Badge>默认标签</Badge>
 * <Badge variant="success">已完成</Badge>
 * <Badge variant="danger">待处理</Badge>
 * <Badge variant="warning">进行中</Badge>
 * ```
 */
function Badge({ children, variant = "default", className = "" }: BadgeProps) {
	return (
		<span
			className={`
        inline-flex items-center px-2.5 py-0.5 
        text-xs font-medium rounded-full border 
        transition-colors duration-200
        ${variantStyles[variant]}
        ${className}
      `}>
			{children}
		</span>
	)
}

export default Badge
