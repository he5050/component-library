import React from "react"

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info"

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-ink-pale/60 text-ink-medium border-ink/10",
  primary: "bg-zhusha/10 text-zhusha border-zhusha/20",
  success: "bg-zhu/10 text-zhu border-zhu/20",
  warning: "bg-amber/10 text-amber border-amber/20",
  danger: "bg-danger/10 text-danger border-danger/20",
  info: "bg-dian/10 text-dian border-dian/20",
}

function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 
        text-xs font-medium rounded-full border 
        transition-colors duration-200
        ${variantStyles[variant]}
        ${className}
      `}>
      {children}
    </span>
  )
}

export default Badge
