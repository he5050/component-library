import React from "react"

type LoadingVariant = "spinner" | "dots" | "ink" | "seal"
type LoadingSize = "sm" | "md" | "lg"

interface LoadingProps {
  variant?: LoadingVariant
  size?: LoadingSize
  text?: string
  className?: string
}

/**
 * 水墨加载动画组件
 * 融合传统笔墨动态美学与现代加载指示器
 */
function Loading({
  variant = "spinner",
  size = "md",
  text,
  className = "",
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  // 旋转加载器 - 水墨晕染风格
  if (variant === "spinner") {
    return (
      <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
        <div className={`relative ${sizeClasses[size]}`}>
          {/* 外圈 - 淡墨 */}
          <svg
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "2s" }}
            viewBox="0 0 40 40"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="60 120"
              className="text-ink-light/30"
            />
          </svg>
          {/* 中圈 - 浓墨 */}
          <svg
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
            viewBox="0 0 40 40"
          >
            <circle
              cx="20"
              cy="20"
              r="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="40 88"
              className="text-ink-medium/50"
            />
          </svg>
          {/* 内圈 - 焦墨 */}
          <svg
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "1s" }}
            viewBox="0 0 40 40"
          >
            <circle
              cx="20"
              cy="20"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="25 63"
              className="text-ink-deep"
            />
          </svg>
        </div>
        {text && (
          <span className={`text-ink-medium font-display ${textSizeClasses[size]}`}>
            {text}
          </span>
        )}
      </div>
    )
  }

  // 墨点跳动 - 如墨滴落入水中
  if (variant === "dots") {
    return (
      <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`${size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-3 h-3"} 
                rounded-full bg-ink-deep animate-bounce`}
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.8s",
              }}
            />
          ))}
        </div>
        {text && (
          <span className={`text-ink-medium font-display ${textSizeClasses[size]}`}>
            {text}
          </span>
        )}
      </div>
    )
  }

  // 水墨晕染效果
  if (variant === "ink") {
    return (
      <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
        <div className={`relative ${sizeClasses[size]}`}>
          {/* 晕染层 */}
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(26,26,26,0.4) 0%, transparent 70%)",
              animationDuration: "2s",
            }}
          />
          {/* 核心 */}
          <span
            className="absolute inset-2 rounded-full animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0.2) 100%)",
              animationDuration: "1.5s",
            }}
          />
          {/* 墨点 */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-1/3 h-1/3 rounded-full bg-ink-deep animate-pulse" style={{ animationDuration: "1s" }} />
          </span>
        </div>
        {text && (
          <span className={`text-ink-medium font-display ${textSizeClasses[size]}`}>
            {text}
          </span>
        )}
      </div>
    )
  }

  // 印章旋转 - 传统印章风格
  if (variant === "seal") {
    return (
      <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
        <div className={`relative ${sizeClasses[size]}`}>
          <div
            className="w-full h-full rounded animate-spin"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, rgba(192, 72, 81, 0.1) 60deg, rgba(192, 72, 81, 0.3) 120deg, rgba(192, 72, 81, 0.1) 180deg, transparent 360deg)`,
              animationDuration: "1.5s",
            }}
          />
          <div className="absolute inset-1 bg-paper rounded flex items-center justify-center">
            <span
              className={`${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"} 
                font-display font-bold text-vermilion`}
            >
              墨
            </span>
          </div>
        </div>
        {text && (
          <span className={`text-ink-medium font-display ${textSizeClasses[size]}`}>
            {text}
          </span>
        )}
      </div>
    )
  }

  return null
}

export default Loading
