type LoadingSize = "sm" | "md" | "lg"

interface LoadingProps {
	size?: LoadingSize
	text?: string
	overlay?: boolean
	className?: string
}

const sizeStyles: Record<LoadingSize, string> = {
	sm: "w-4 h-4",
	md: "w-6 h-6",
	lg: "w-8 h-8",
}

/**
 * 加载组件
 *
 * 水墨风格加载状态指示器，支持多种尺寸和遮罩模式。
 * 采用墨色旋转动画，简洁优雅。
 *
 * @param size - 加载器尺寸：sm（小）、md（中）、lg（大）
 * @param text - 加载提示文本
 * @param overlay - 是否显示全屏遮罩
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Loading />
 * <Loading size="lg" text="加载中..." />
 * <Loading overlay />
 * ```
 */
function Loading({ size = "md", text, overlay = false, className = "" }: LoadingProps) {
	const spinner = (
		<div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
			<div
				className={`
          ${sizeStyles[size]}
          border-2 border-ink-pale border-t-ink-medium
          rounded-full animate-spin
        `}
			/>
			{text && <span className="text-sm text-ink-medium">{text}</span>}
		</div>
	)

	if (overlay) {
		return (
			<div className="fixed inset-0 z-[var(--z-overlay,300)] flex items-center justify-center bg-paper/80 backdrop-blur-sm">
				{spinner}
			</div>
		)
	}

	return spinner
}

export default Loading
