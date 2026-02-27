interface SkeletonProps {
	variant?: "text" | "circle" | "rect"
	width?: string | number
	height?: string | number
	rows?: number
	className?: string
}

const variantStyles = {
	text: "h-4 rounded-[4px]",
	circle: "rounded-full",
	rect: "rounded-lg",
}

/**
 * 骨架屏组件
 *
 * 水墨风格内容占位骨架屏，用于加载状态展示。
 * 采用微妙的闪烁动画，提升用户体验。
 *
 * @param variant - 骨架屏变体：text（文本）、circle（圆形）、rect（矩形）
 * @param width - 宽度（支持字符串或数字，数字默认单位为 px）
 * @param height - 高度（支持字符串或数字，数字默认单位为 px）
 * @param rows - 文本行数（仅 variant 为 text 时有效）
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" />
 * <Skeleton variant="circle" width={40} height={40} />
 * <Skeleton variant="rect" width="100%" height={120} />
 * <Skeleton variant="text" rows={3} />
 * ```
 */
function Skeleton({ variant = "text", width, height, rows, className = "" }: SkeletonProps) {
	const style: React.CSSProperties = {}
	if (width !== undefined) {
		style.width = typeof width === "number" ? `${width}px` : width
	}
	if (height !== undefined) {
		style.height = typeof height === "number" ? `${height}px` : height
	}

	if (variant === "text" && rows && rows > 1) {
		return (
			<div className={`flex flex-col gap-2 ${className}`}>
				{Array.from({ length: rows }).map((_, i) => (
					<div
						key={i}
						className={`
              relative overflow-hidden
              bg-ink-200/60
              ${variantStyles[variant]}
              ${i === rows - 1 ? "w-3/4" : "w-full"}
            `}
						style={i === rows - 1 ? { ...style, width: style.width || "75%" } : style}
						aria-hidden="true">
						<div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
					</div>
				))}
			</div>
		)
	}

	if (variant === "circle" && !height && width) {
		style.height = style.width
	}

	return (
		<div
			className={`
        relative overflow-hidden
        bg-ink-200/60
        ${variantStyles[variant]}
        ${className}
      `}
			style={style}
			aria-hidden="true">
			<div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
		</div>
	)
}

export default Skeleton
