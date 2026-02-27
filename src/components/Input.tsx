import React from "react"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
	label?: string
	error?: string
	hint?: string
	size?: "sm" | "md" | "lg"
}

const sizeStyles = {
	sm: "h-8 px-3 text-sm rounded-[8px]",
	md: "h-10 px-4 text-sm rounded-[10px]",
	lg: "h-12 px-5 text-base rounded-[12px]",
}

/**
 * 输入框组件
 *
 * 水墨风格文本输入框，支持标签、错误提示和帮助文本。
 * 采用宣纸色背景和墨色边框，聚焦时呈现青碧色高亮。
 *
 * @param label - 输入框标签
 * @param error - 错误提示信息
 * @param hint - 帮助提示信息
 * @param size - 输入框尺寸：sm（小）、md（中）、lg（大）
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Input label="用户名" placeholder="请输入用户名" />
 * <Input label="邮箱" error="邮箱格式不正确" />
 * <Input label="密码" type="password" hint="至少8位字符" />
 * ```
 */
function Input({ label, error, hint, size = "md", className = "", id, ...rest }: InputProps) {
	const inputId = id || label?.toLowerCase().replace(/\s/g, "-")
	return (
		<div className="flex flex-col gap-1.5">
			{label && (
				<label htmlFor={inputId} className="text-sm text-ink-thick font-medium tracking-wide">
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={`
          bg-paper-warm border border-ink/10 rounded-ink font-body text-ink-deep
          placeholder:text-ink-light transition-all duration-200 outline-none
          hover:bg-paper hover:border-ink/15
          focus:border-focus focus:shadow-ink-input-focus focus:bg-paper
          disabled:opacity-45 disabled:cursor-not-allowed disabled:bg-ink-pale/30
          ${error ? "border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(195,92,103,0.15)]" : ""}
          ${sizeStyles[size]}
          ${className}
        `}
				aria-invalid={error ? true : undefined}
				aria-describedby={
					error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
				}
				{...rest}
			/>
			{error && (
				<span id={`${inputId}-error`} className="text-xs text-danger flex items-center gap-1" role="alert">
					✕ {error}
				</span>
			)}
			{!error && hint && (
				<span id={`${inputId}-hint`} className="text-xs text-ink-light">
					{hint}
				</span>
			)}
		</div>
	)
}

export default Input
