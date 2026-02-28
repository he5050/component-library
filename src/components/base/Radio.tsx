interface RadioProps {
	label: string
	checked: boolean
	onChange: () => void
	disabled?: boolean
	name: string
	className?: string
}

/**
 * 单选框组件
 *
 * 水墨风格单选框，需配合相同的 name 属性实现单选组。
 * 选中时呈现墨色圆点，未选中时保持宣纸色背景。
 *
 * @param label - 单选框标签文本
 * @param checked - 是否选中
 * @param onChange - 选中回调函数
 * @param disabled - 是否禁用
 * @param name - 单选组名称（同组单选框需相同）
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState("option1")
 * <Radio name="options" label="选项一" checked={value === "option1"} onChange={() => setValue("option1")} />
 * <Radio name="options" label="选项二" checked={value === "option2"} onChange={() => setValue("option2")} />
 * ```
 */
function Radio({ label, checked, onChange, disabled = false, name, className = "" }: RadioProps) {
	return (
		<label
			className={`
        inline-flex items-center gap-2.5 cursor-pointer select-none
        ${disabled ? "opacity-45 cursor-not-allowed" : ""}
        ${className}
      `}>
			<input
				type='radio'
				name={name}
				checked={checked}
				onChange={() => !disabled && onChange()}
				disabled={disabled}
				className='peer sr-only'
			/>
			<span
				className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${checked ? "border-ink-deep" : "bg-paper border-ink/20 hover:border-ink/40"}
          peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2
        `}>
				{checked && <span className='w-2.5 h-2.5 rounded-full bg-ink-deep' />}
			</span>
			<span className='text-sm text-ink-thick'>{label}</span>
		</label>
	)
}

export default Radio
