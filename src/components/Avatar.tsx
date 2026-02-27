import React from "react"

type AvatarSize = "sm" | "md" | "lg"

interface AvatarProps {
	src?: string
	alt?: string
	name?: string
	size?: AvatarSize
	className?: string
}

const sizeStyles: Record<AvatarSize, string> = {
	sm: "w-8 h-8 text-xs",
	md: "w-10 h-10 text-sm",
	lg: "w-12 h-12 text-base",
}

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2)
}

/**
 * 头像组件
 *
 * 水墨风格用户头像组件，支持图片和文字头像。
 * 当图片加载失败或未提供时，显示姓名首字母。
 *
 * @param src - 头像图片地址
 * @param alt - 图片替代文本
 * @param name - 用户名称（用于显示首字母）
 * @param size - 头像尺寸：sm（小）、md（中）、lg（大）
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" name="张三" />
 * <Avatar name="李四" size="lg" />
 * <Avatar src="/user.png" alt="用户头像" size="sm" />
 * ```
 */
function Avatar({ src, alt, name, size = "md", className = "" }: AvatarProps) {
	const [imgError, setImgError] = React.useState(false)

	if (src && !imgError) {
		return (
			<img
				src={src}
				alt={alt || name || "Avatar"}
				onError={() => setImgError(true)}
				className={`
          ${sizeStyles[size]}
        rounded-full object-cover border border-ink/10
        bg-paper-warm
        ${className}
      `}
			/>
		)
	}

	return (
		<div
			className={`
        ${sizeStyles[size]}
        rounded-full flex items-center justify-center
        bg-ink-pale text-ink-medium font-medium
        border border-ink/10
        ${className}
      `}
			aria-label={name || "Avatar"}>
			{name ? getInitials(name) : "?"}
		</div>
	)
}

export default Avatar
