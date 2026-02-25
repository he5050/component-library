import React from "react"

type DividerVariant = "default" | "brush" | "elegant" | "dashed"
type DividerOrientation = "horizontal" | "vertical"

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant
  orientation?: DividerOrientation
  text?: React.ReactNode
  textPosition?: "left" | "center" | "right"
  className?: string
}

/**
 * 水墨分割线组件
 * 融合传统书画装裱美学与现代分隔设计
 */
function Divider({
  variant = "default",
  orientation = "horizontal",
  text,
  textPosition = "center",
  className = "",
  ...rest
}: DividerProps) {
  // 垂直分割线
  if (orientation === "vertical") {
    return (
      <div
        className={`
          inline-block h-full mx-4
          ${variant === "brush" ? "w-0.5 bg-gradient-to-b from-transparent via-ink-medium to-transparent opacity-60" : ""}
          ${variant === "default" ? "w-px bg-ink/10" : ""}
          ${variant === "dashed" ? "w-px border-l border-dashed border-ink/20" : ""}
          ${className}
        `}
        {...rest}
      />
    )
  }

  // 带文字的分割线
  if (text) {
    const positionClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }

    return (
      <div
        className={`
          flex items-center gap-4 my-6
          ${positionClasses[textPosition]}
          ${className}
        `}
        {...rest}
      >
        {textPosition !== "left" && (
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ink/10 to-ink/10" />
        )}
        <span className="text-sm text-ink-medium font-display whitespace-nowrap">
          {text}
        </span>
        {textPosition !== "right" && (
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-ink/10 to-ink/10" />
        )}
      </div>
    )
  }

  // 水平分割线变体
  const variantClasses = {
    default: `
      h-px my-6
      bg-gradient-to-r from-transparent via-ink-light/50 to-transparent
      relative
      after:content-[''] after:absolute after:top-1/2 after:left-1/2 
      after:-translate-x-1/2 after:-translate-y-1/2
      after:w-1.5 after:h-1.5 after:bg-ink-light/50 after:rounded-full
    `,
    brush: `
      h-0.5 my-8
      bg-gradient-to-r from-transparent via-ink-medium to-transparent
      opacity-60
      relative
      before:content-[''] before:absolute before:top-1/2 before:left-0
      before:-translate-y-1/2 before:w-10 before:h-px
      before:bg-gradient-to-r before:from-transparent before:to-ink-light
      after:content-[''] after:absolute after:top-1/2 after:right-0
      after:-translate-y-1/2 after:w-10 after:h-px
      after:bg-gradient-to-l after:from-transparent after:to-ink-light
    `,
    elegant: `
      h-px my-8
      bg-gradient-to-r from-ink/5 via-ink/20 to-ink/5
      relative
      before:content-[''] before:absolute before:top-1/2 before:left-1/2
      before:-translate-x-1/2 before:-translate-y-1/2
      before:w-20 before:h-px
      before:bg-gradient-to-r before:from-transparent before:via-ink-medium before:to-transparent
    `,
    dashed: `
      my-6
      border-t border-dashed border-ink/15
    `,
  }

  return (
    <div
      className={`${variantClasses[variant]} ${className}`}
      {...rest}
    />
  )
}

export default Divider
