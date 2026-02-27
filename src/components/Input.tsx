import React from "react"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  error?: string
  size?: "sm" | "md" | "lg"
}

const sizeStyles = {
  sm: "h-8 px-3 text-sm rounded-[8px]",
  md: "h-10 px-4 text-sm rounded-[10px]",
  lg: "h-12 px-5 text-base rounded-[12px]",
}

function Input({ label, error, size = "md", className = "", ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-ink-thick font-medium tracking-wide">
          {label}
        </label>
      )}
      <input
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
        {...rest}
      />
      {error && (
        <span className="text-xs text-danger mt-1">{error}</span>
      )}
    </div>
  )
}

export default Input
