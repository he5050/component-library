import React from "react"

type CardVariant = "default" | "ink" | "featured"

interface CardProps {
	children: React.ReactNode
	className?: string
	variant?: CardVariant
	hoverable?: boolean
	onClick?: () => void
}

const variantStyles: Record<CardVariant, string> = {
	default: "rounded-lg",
	ink: "rounded-[8px_16px_12px_18px]",
	featured: "rounded-lg border-zhusha/15 shadow-[0_0_0_1px_rgba(192,72,81,0.1),0_4px_16px_rgba(192,72,81,0.08)]",
}

/**
 * 卡片组件
 *
 * 水墨风格内容卡片容器，支持多种变体和悬浮效果。
 * 采用宣纸色背景和墨色边框，体现"计白当黑"的设计理念。
 *
 * @param children - 卡片内容
 * @param variant - 卡片变体：default（默认）、ink（墨迹不规则圆角）、featured（特色高亮）
 * @param hoverable - 是否启用悬浮效果
 * @param onClick - 点击回调函数
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Card>
 *   <h3>卡片标题</h3>
 *   <p>卡片内容</p>
 * </Card>
 *
 * <Card variant="ink" hoverable>
 *   <p>墨迹风格卡片</p>
 * </Card>
 *
 * <Card variant="featured" onClick={() => console.log("clicked")}>
 *   <p>可点击的特色卡片</p>
 * </Card>
 * ```
 */
function Card({ children, className = "", variant = "default", hoverable = true, onClick }: CardProps) {
	return (
		<div
			onClick={onClick}
			className={`
        bg-paper border border-ink/8
        shadow-ink-card transition-all duration-300
        relative overflow-hidden
        ${variantStyles[variant]}
        ${hoverable ? "hover:shadow-ink-card-hover hover:-translate-y-0.5 hover:border-zhusha/15 cursor-pointer" : ""}
        ${className}
      `}>
			<div
				className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
			/>
			{children}
		</div>
	)
}

export default Card
