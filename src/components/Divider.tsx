type DividerVariant = "default" | "brush" | "dashed" | "gradient"

interface DividerProps {
	variant?: DividerVariant
	className?: string
}

const variantStyles: Record<DividerVariant, string> = {
	default: "h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent",
	brush: "h-0.5 bg-gradient-to-r from-transparent via-ink-medium to-transparent opacity-60",
	dashed: "h-px border-t border-dashed border-ink/20",
	gradient: "h-px bg-gradient-to-r from-transparent via-zhusha/30 to-transparent",
}

/**
 * 分割线组件
 *
 * 水墨风格内容分割线，支持多种样式变体。
 * 通过渐变和留白体现水墨画的意境。
 *
 * @param variant - 分割线变体：default（默认渐变）、brush（笔触风格）、dashed（虚线）、gradient（朱砂渐变）
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider variant="brush" />
 * <Divider variant="dashed" />
 * <Divider variant="gradient" />
 * ```
 */
function Divider({ variant = "default", className = "" }: DividerProps) {
	return <div className={`my-6 ${variantStyles[variant]} ${className}`} />
}

export default Divider
