import React from "react"

type DividerVariant = "default" | "brush" | "dashed" | "gradient"

interface DividerProps {
  variant?: DividerVariant
  className?: string
}

const variantStyles: Record<DividerVariant, string> = {
  default: "h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent",
  brush: "h-0.5 bg-gradient-to-r from-transparent via-ink-medium to-transparent opacity-60",
  dashed: "h-px border-t border-dashed border-ink/20",
  gradient: "h-px bg-gradient-to-r from-transparent via-zhusha/30 to-transparent",
}

function Divider({ variant = "default", className = "" }: DividerProps) {
  return <div className={`my-6 ${variantStyles[variant]} ${className}`} />
}

export default Divider
