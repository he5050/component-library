import React from "react"

interface CheckboxProps {
	label: string
	checked: boolean
	onChange: (checked: boolean) => void
	disabled?: boolean
	className?: string
}

/**
 * 复选框组件
 *
 * 水墨风格复选框，支持选中状态和禁用状态。
 * 选中时呈现墨色填充，未选中时保持宣纸色背景。
 *
 * @param label - 复选框标签文本
 * @param checked - 是否选中
 * @param onChange - 状态变化回调函数
 * @param disabled - 是否禁用
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * const [checked, setChecked] = useState(false)
 * <Checkbox label="同意用户协议" checked={checked} onChange={setChecked} />
 * ```
 */
function Checkbox({ label, checked, onChange, disabled = false, className = "" }: CheckboxProps) {
	return (
		<label
			className={`
        inline-flex items-center gap-2.5 cursor-pointer select-none
        ${disabled ? "opacity-45 cursor-not-allowed" : ""}
        ${className}
      `}>
			<input
				type='checkbox'
				checked={checked}
				onChange={(e) => !disabled && onChange(e.target.checked)}
				disabled={disabled}
				className='sr-only'
			/>
			<span
				className={`
          w-5 h-5 rounded border-2 flex items-center justify-center
          transition-all duration-200
          ${checked ? "bg-ink-deep border-ink-deep" : "bg-paper border-ink/20 hover:border-ink/40"}
          focus-within:ring-2 focus-within:ring-focus focus-within:ring-offset-2
        `}>
				{checked && (
					<svg className='w-3 h-3 text-paper' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
					</svg>
				)}
			</span>
			<span className='text-sm text-ink-thick'>{label}</span>
		</label>
	)
}

export default Checkbox
