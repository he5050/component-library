import React from "react"

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
	label?: string
	error?: string
	options: { value: string; label: string }[]
	size?: "sm" | "md" | "lg"
}

const sizeStyles = {
	sm: "h-8 px-3 pr-8 text-sm rounded-[8px]",
	md: "h-10 px-4 pr-10 text-sm rounded-[10px]",
	lg: "h-12 px-5 pr-12 text-base rounded-[12px]",
}

/**
 * 选择器组件
 *
 * 水墨风格下拉选择框，支持标签、错误提示和多种尺寸。
 * 采用自定义下拉箭头，保持整体视觉一致性。
 *
 * @param label - 选择器标签
 * @param error - 错误提示信息
 * @param options - 选项数组，每项包含 value 和 label
 * @param size - 选择器尺寸：sm（小）、md（中）、lg（大）
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Select
 *   label="城市"
 *   options={[
 *     { value: "beijing", label: "北京" },
 *     { value: "shanghai", label: "上海" },
 *   ]}
 * />
 * ```
 */
function Select({ label, error, options, size = "md", className = "", id, ...rest }: SelectProps) {
	const selectId = id || label?.toLowerCase().replace(/\s/g, "-")
	return (
		<div className="flex flex-col gap-1.5">
			{label && (
				<label htmlFor={selectId} className="text-sm text-ink-thick font-medium tracking-wide">
					{label}
				</label>
			)}
			<div className="relative">
				<select
					id={selectId}
					className={`
            w-full appearance-none
            bg-paper-warm border border-ink/10 font-body text-ink-deep
            transition-all duration-200 outline-none
            hover:bg-paper hover:border-ink/15
            focus:border-focus focus:shadow-ink-input-focus focus:bg-paper
            disabled:opacity-45 disabled:cursor-not-allowed
            ${error ? "border-danger focus:border-danger" : ""}
            ${sizeStyles[size]}
            ${className}
          `}
					aria-invalid={error ? true : undefined}
					{...rest}>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value}>{opt.label}</option>
					))}
				</select>
				<svg
					className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-medium pointer-events-none"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
				</svg>
			</div>
			{error && (
				<span className="text-xs text-danger flex items-center gap-1" role="alert">
					✕ {error}
				</span>
			)}
		</div>
	)
}

export default Select
