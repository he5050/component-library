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
  primary: "bg-primary text-white hover:bg-primary-700 focus:ring-primary shadow-sm hover:shadow-md",
  secondary: "bg-primary-50 text-primary-700 hover:bg-primary-100 focus:ring-primary border border-primary-200",
  outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary-50 focus:ring-primary",
  ghost: "bg-transparent text-primary-700 hover:bg-primary-50 focus:ring-primary",
  danger: "bg-danger text-white hover:bg-red-700 focus:ring-danger shadow-sm hover:shadow-md",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-base gap-2",
  lg: "h-12 px-7 text-lg gap-2.5",
}

function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children = "Button",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn-base ${variantStyles[variant]} ${sizeStyles[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
