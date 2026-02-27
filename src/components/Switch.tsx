/* ==================== Switch ==================== */

interface SwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

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
