import React, { useState, useRef } from "react"
import { inkRipple } from "../utils/animations"

type InputVariant = "default" | "ghost" | "underline"
type InputSize = "sm" | "md" | "lg"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant
  size?: InputSize
  label?: string
  helperText?: string
  error?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  animateFocus?: boolean
}

const variantStyles: Record<InputVariant, string> = {
  default: `
    bg-paper-warm border-ink/10 rounded-ink
    hover:bg-paper hover:border-ink/15
    focus:bg-paper focus:border-vermilion focus:shadow-ink-input-focus
  `,
  ghost: `
    bg-transparent border-b-2 border-ink/10 rounded-none px-1
    hover:border-ink/20
    focus:border-vermilion focus:shadow-none
  `,
  underline: `
    bg-paper-warm/50 border-0 border-b border-ink/10 rounded-t-ink
    hover:bg-paper-warm hover:border-ink/15
    focus:bg-paper focus:border-vermilion
  `,
}

const sizeStyles: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-13 px-5 text-base",
}

/**
 * 水墨输入框组件
 * 融合传统笔墨意境与现代表单交互
 */
function Input({
  variant = "default",
  size = "md",
  label,
  helperText,
  error,
  prefix,
  suffix,
  className = "",
  disabled = false,
  animateFocus = true,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    rest.onFocus?.(e)
    
    // 聚焦时的水墨涟漪效果
    if (animateFocus && containerRef.current && variant === "default") {
      const rect = containerRef.current.getBoundingClientRect()
      inkRipple(containerRef.current, rect.width / 2, rect.height / 2)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    rest.onBlur?.(e)
  }

  return (
    <div className="w-full">
      {/* 标签 */}
      {label && (
        <label className="block mb-2 text-sm font-medium text-ink-thick">
          {label}
        </label>
      )}

      {/* 输入框容器 */}
      <div
        ref={containerRef}
        className={`
          relative flex items-center w-full
          transition-all duration-200 overflow-hidden
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${error ? "border-danger !shadow-none" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed bg-ink-pale/50" : ""}
          ${className}
        `}
      >
        {/* 前缀 */}
        {prefix && (
          <span className="flex-shrink-0 mr-3 text-ink-light">
            {prefix}
          </span>
        )}

        {/* 输入框 */}
        <input
          ref={inputRef}
          className="
            flex-1 w-full bg-transparent border-none outline-none
            text-ink-deep placeholder:text-ink-light
            disabled:cursor-not-allowed
          "
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {/* 后缀 */}
        {suffix && (
          <span className="flex-shrink-0 ml-3 text-ink-light">
            {suffix}
          </span>
        )}

        {/* 聚焦时的水墨晕染装饰 */}
        {isFocused && variant === "default" && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-vermilion/30 to-transparent" />
          </div>
        )}
      </div>

      {/* 辅助文字或错误信息 */}
      {(helperText || error) && (
        <div className="mt-1.5 text-xs">
          {error ? (
            <span className="text-vermilion">{error}</span>
          ) : (
            <span className="text-ink-light">{helperText}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default Input
