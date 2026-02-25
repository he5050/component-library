import React, { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { inkWashEnter } from "../utils/animations"

type TooltipPlacement = "top" | "bottom" | "left" | "right"
type TooltipVariant = "default" | "ink" | "seal"

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  placement?: TooltipPlacement
  variant?: TooltipVariant
  delay?: number
  className?: string
}

/**
 * 水墨提示框组件
 * 融合传统书画题跋美学与现代提示设计
 */
function Tooltip({
  content,
  children,
  placement = "top",
  variant = "default",
  delay = 200,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const calculatePosition = () => {
    if (!triggerRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current?.getBoundingClientRect()
    const tooltipWidth = tooltipRect?.width || 0
    const tooltipHeight = tooltipRect?.height || 0

    let x = 0
    let y = 0

    switch (placement) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2
        y = triggerRect.top - tooltipHeight - 8
        break
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2
        y = triggerRect.bottom + 8
        break
      case "left":
        x = triggerRect.left - tooltipWidth - 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipHeight / 2
        break
      case "right":
        x = triggerRect.right + 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipHeight / 2
        break
    }

    // 边界检查
    x = Math.max(8, Math.min(x, window.innerWidth - tooltipWidth - 8))
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipHeight - 8))

    setPosition({ x, y })
  }

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsVisible(false)
  }

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      calculatePosition()
      inkWashEnter(tooltipRef.current)
    }
  }, [isVisible])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const variantStyles = {
    default: "bg-ink-deep text-paper border-ink/20",
    ink: "bg-paper text-ink-deep border-ink/10 shadow-ink",
    seal: "bg-gradient-to-br from-seal-red to-vermilion text-white border-vermilion-dark/30",
  }

  const arrowStyles = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-ink-deep",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-ink-deep",
    left: "left-full top-1/2 -translate-y-1/2 border-l-ink-deep",
    right: "right-full top-1/2 -translate-y-1/2 border-r-ink-deep",
  }

  const arrowColorStyles = {
    default: {
      top: "border-t-ink-deep",
      bottom: "border-b-ink-deep",
      left: "border-l-ink-deep",
      right: "border-r-ink-deep",
    },
    ink: {
      top: "border-t-paper",
      bottom: "border-b-paper",
      left: "border-l-paper",
      right: "border-r-paper",
    },
    seal: {
      top: "border-t-vermilion",
      bottom: "border-b-vermilion",
      left: "border-l-vermilion",
      right: "border-r-vermilion",
    },
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`
              fixed z-50 px-3 py-2 rounded-lg text-sm
              font-body leading-relaxed max-w-xs
              border shadow-lg
              pointer-events-none
              ${variantStyles[variant]}
              ${className}
            `}
            style={{
              left: position.x,
              top: position.y,
              opacity: 0,
            }}
          >
            {content}

            {/* 箭头 */}
            <span
              className={`
                absolute w-0 h-0
                border-4 border-transparent
                ${arrowStyles[placement]}
                ${arrowColorStyles[variant][placement]}
              `}
            />
          </div>,
          document.body
        )}
    </>
  )
}

export default Tooltip
