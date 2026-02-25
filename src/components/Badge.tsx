import React, { useEffect, useRef } from "react"
import { sealStamp } from "../utils/animations"

type BadgeVariant = "seal" | "outline" | "subtle" | "dot"
type BadgeSize = "sm" | "md" | "lg"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  children: React.ReactNode
  animate?: boolean
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  seal: `
    bg-gradient-to-br from-seal-red to-vermilion text-white
    shadow-ink-seal
    before:absolute before:inset-0.5 before:border before:border-white/30 before:rounded-sm
  `,
  outline: `
    bg-transparent text-seal-red border-1.5 border-seal-red
  `,
  subtle: `
    bg-vermilion/10 text-vermilion-dark border border-vermilion/20
  `,
  dot: `
    bg-ink-pale text-ink-thick border border-ink/10
    pl-2
  `,
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5 rounded",
  md: "text-xs px-2.5 py-1 rounded",
  lg: "text-sm px-3 py-1.5 rounded-md",
}

/**
 * 印章标签组件
 * 融合传统印章美学与现代标签设计
 */
function Badge({
  variant = "subtle",
  size = "md",
  children,
  animate = false,
  dot = false,
  className = "",
  ...rest
}: BadgeProps) {
  const badgeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (animate && badgeRef.current && variant === "seal") {
      sealStamp(badgeRef.current)
    }
  }, [animate, variant])

  return (
    <span
      ref={badgeRef}
      className={`
        inline-flex items-center justify-center
        font-display font-semibold tracking-wider
        relative overflow-hidden
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...rest}
    >
      {/* 圆点指示器 */}
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-vermilion mr-1.5" />
      )}

      {/* 内容 */}
      <span className="relative z-10">{children}</span>

      {/* 印章纹理效果 */}
      {variant === "seal" && (
        <>
          {/* 噪点纹理 */}
          <span
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "50px 50px",
            }}
          />
          {/* 边缘磨损效果 */}
          <span className="absolute inset-0 border border-white/10 rounded pointer-events-none" />
        </>
      )}
    </span>
  )
}

export default Badge
