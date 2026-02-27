import React from "react"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
	variant?: ButtonVariant
	size?: ButtonSize
	children?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
	primary:
		"border border-ink/20 bg-gradient-to-b from-ink-800 to-ink-deep text-paper shadow-[0_3px_12px_rgba(26,26,26,0.2)] hover:from-ink-700 hover:to-ink-thick hover:-translate-y-px active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.28)]",
	secondary:
		"border border-ink/15 bg-paper-warm text-ink-thick shadow-[0_2px_8px_rgba(26,26,26,0.08)] hover:bg-paper hover:border-ink/30 hover:-translate-y-px active:translate-y-0 active:bg-ink-pale",
	outline:
		"border border-zhusha/35 bg-transparent text-zhusha shadow-[0_0_0_1px_rgba(192,72,81,0.1)] hover:bg-zhusha/8 hover:border-zhusha/60 hover:-translate-y-px active:translate-y-0 active:bg-zhusha/12",
	ghost: "border border-transparent bg-transparent text-ink-medium hover:bg-ink-pale hover:text-ink-thick active:bg-ink-pale/80",
	danger:
		"border border-danger/70 bg-gradient-to-b from-danger to-danger-dark text-white shadow-[0_3px_12px_rgba(195,92,103,0.28)] hover:-translate-y-px hover:brightness-110 active:translate-y-0 active:brightness-95",
}

const sizeStyles: Record<ButtonSize, string> = {
	sm: "h-8 px-3.5 text-sm rounded-[8px]",
	md: "h-10 px-5 text-sm rounded-[10px]",
	lg: "h-12 px-7 text-base rounded-[12px]",
}

/**
 * 按钮组件
 *
 * 水墨风格按钮，支持多种变体和尺寸。
 * 遵循"计白当黑"的设计理念，通过留白和墨色对比传达禅意美学。
 *
 * @param variant - 按钮变体：primary（主要）、secondary（次要）、outline（描边）、ghost（幽灵）、danger（危险）
 * @param size - 按钮尺寸：sm（小）、md（中）、lg（大）
 * @param children - 按钮内容
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">主要按钮</Button>
 * <Button variant="outline">描边按钮</Button>
 * <Button variant="danger" onClick={handleDelete}>删除</Button>
 * ```
 */
function Button({ variant = "primary", size = "md", children, className = "", ...rest }: ButtonProps) {
	return (
		<button
			className={`btn-ink-base tracking-[0.08em] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
			{...rest}>
			{children}
		</button>
	)
}

export default Button
