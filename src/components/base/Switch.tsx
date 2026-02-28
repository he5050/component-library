interface SwitchProps {
	label: string
	checked: boolean
	onChange: (checked: boolean) => void
	disabled?: boolean
	className?: string
}

/**
 * 开关组件
 *
 * 水墨风格开关切换组件，支持选中状态和禁用状态。
 * 选中时呈现墨色背景，滑块向右滑动。
 *
 * @param label - 开关标签文本
 * @param checked - 是否选中
 * @param onChange - 状态变化回调函数
 * @param disabled - 是否禁用
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * const [enabled, setEnabled] = useState(false)
 * <Switch label="开启通知" checked={enabled} onChange={setEnabled} />
 * ```
 */
function Switch({ label, checked, onChange, disabled = false, className = "" }: SwitchProps) {
	return (
		<label className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${disabled ? "opacity-45 cursor-not-allowed" : ""} ${className}`}>
			<button
				type="button"
				role="switch"
				aria-checked={checked}
				aria-label={label}
				disabled={disabled}
				onClick={() => !disabled && onChange(!checked)}
				className={`
          w-10 h-5.5 rounded-full transition-all duration-200 relative
          focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper
          ${checked ? "bg-ink-deep" : "bg-ink-300"}
        `}>
				<span className={`
          absolute top-0.5 w-4.5 h-4.5 rounded-full bg-paper shadow-sm
          transition-transform duration-200
          ${checked ? "translate-x-[18px]" : "translate-x-0.5"}
        `} />
			</button>
			<span className="text-sm text-ink-thick">{label}</span>
		</label>
	)
}

export default Switch
