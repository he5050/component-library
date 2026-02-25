import React from "react"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant
  size?: ButtonSize
  children?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "relative overflow-hidden border border-ink/20 bg-gradient-to-b from-ink-800 to-ink-deep text-paper shadow-[0_3px_12px_rgba(26,26,26,0.2)] hover:from-ink-700 hover:to-ink-thick hover:-translate-y-px active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.28)]",
  secondary: "border border-ink/15 bg-paper-warm text-ink-thick shadow-[0_2px_8px_rgba(26,26,26,0.08)] hover:bg-paper hover:border-ink/30 hover:-translate-y-px active:translate-y-0 active:bg-ink-pale",
  outline: "border border-zhusha/35 bg-transparent text-zhusha shadow-[0_0_0_1px_rgba(192,72,81,0.1)] hover:bg-zhusha/8 hover:border-zhusha/60 hover:-translate-y-px active:translate-y-0 active:bg-zhusha/12",
  ghost: "border border-transparent bg-transparent text-ink-medium hover:bg-ink-pale hover:text-ink-thick",
  danger: "border border-vermilion-dark/70 bg-gradient-to-b from-vermilion to-vermilion-dark text-white shadow-[0_3px_12px_rgba(160,58,66,0.28)] hover:-translate-y-px hover:brightness-110 active:translate-y-0 active:brightness-95",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-sm gap-1.5 rounded-[8px]",
  md: "h-10 px-5 text-sm gap-2 rounded-[10px]",
  lg: "h-12 px-7 text-base gap-2.5 rounded-[12px]",
}

// 统一按钮视觉骨架：纸感底、朱砂焦点、按压反馈
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children = "按钮",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn-ink-base font-medium tracking-[0.08em] focus-visible:ring-2 focus-visible:ring-zhusha/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:duration-75 ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-45 cursor-not-allowed !translate-y-0 !shadow-none" : ""} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
