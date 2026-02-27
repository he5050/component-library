import React from "react"

type CardVariant = "default" | "ink" | "featured"

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: CardVariant
  hoverable?: boolean
  onClick?: () => void
}

const variantStyles: Record<CardVariant, string> = {
  default: "rounded-lg",
  ink: "rounded-[8px_16px_12px_18px]", // 墨迹不规则圆角
  featured: "rounded-lg border-zhusha/15 shadow-[0_0_0_1px_rgba(192,72,81,0.1),0_4px_16px_rgba(192,72,81,0.08)]",
}

function Card({ children, className = "", variant = "default", hoverable = true, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-paper border border-ink/8
        shadow-ink-card transition-all duration-300
        relative overflow-hidden
        ${variantStyles[variant]}
        ${hoverable ? "hover:shadow-ink-card-hover hover:-translate-y-0.5 hover:border-zhusha/15 cursor-pointer" : ""}
        ${className}
      `}>
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
      />
      {children}
    </div>
  )
}

export default Card
