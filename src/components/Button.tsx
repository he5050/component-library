import React from "react"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-ink-deep text-paper hover:bg-ink-thick shadow-ink hover:shadow-ink-hover active:shadow-ink",
  secondary: "bg-ink-pale text-ink-deep hover:bg-ink-200 border border-ink/10 hover:border-ink/20",
  outline: "bg-transparent text-ink-deep border-2 border-ink/20 hover:border-ink/40 hover:bg-ink-pale",
  ghost: "bg-transparent text-ink-thick hover:bg-ink-pale hover:text-ink-deep",
  danger: "bg-vermilion text-white hover:bg-vermilion-dark shadow-ink hover:shadow-ink-hover",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-sm gap-1.5 rounded-[6px]",
  md: "h-10 px-5 text-base gap-2 rounded-ink",
  lg: "h-12 px-7 text-lg gap-2.5 rounded-[10px]",
}

function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children = "按钮",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn-ink-base font-medium tracking-wide ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
