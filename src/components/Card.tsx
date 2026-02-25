import React, { useRef, useEffect } from "react"
import { cardEnter, useHoverAnimation } from "../utils/animations"

type CardVariant = "default" | "elevated" | "outlined" | "wash"
type CardSize = "sm" | "md" | "lg"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  size?: CardSize
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  hoverable?: boolean
  animate?: boolean
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-paper border-ink/8 shadow-ink-card",
  elevated: "bg-paper border-ink/6 shadow-ink-float",
  outlined: "bg-transparent border-ink/15 shadow-none",
  wash: "bg-gradient-to-br from-paper-warm to-paper border-ink/5 shadow-ink",
}

const sizeStyles: Record<CardSize, string> = {
  sm: "rounded-ink p-4",
  md: "rounded-ink-lg p-6",
  lg: "rounded-ink-xl p-8",
}

/**
 * 水墨卡片组件
 * 融合传统宣纸质感与现代卡片设计
 */
function Card({
  variant = "default",
  size = "md",
  header,
  footer,
  children,
  hoverable = true,
  animate: shouldAnimate = false,
  className = "",
  ...rest
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { handleMouseEnter, handleMouseLeave } = useHoverAnimation()

  useEffect(() => {
    if (shouldAnimate && cardRef.current) {
      cardEnter(cardRef.current)
    }
  }, [shouldAnimate])

  const hoverProps = hoverable
    ? {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }
    : {}

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${hoverable ? "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-ink-hover" : ""}
        ${className}
      `}
      {...hoverProps}
      {...rest}
    >
      {/* 顶部高光线条 */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

      {header && (
        <div className="mb-4 pb-4 border-b border-ink/5">
          {header}
        </div>
      )}

      <div className="relative z-10">{children}</div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-ink/5">
          {footer}
        </div>
      )}

      {/* 水墨晕染背景装饰 */}
      {variant === "wash" && (
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-radial from-ink/3 to-transparent rounded-full pointer-events-none" />
      )}
    </div>
  )
}

export default Card
