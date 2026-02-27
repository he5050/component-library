type LoadingSize = "sm" | "md" | "lg"

interface LoadingProps {
  size?: LoadingSize
  className?: string
}

const sizeStyles: Record<LoadingSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
}

function Loading({ size = "md", className = "" }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeStyles[size]}
          border-2 border-ink-pale border-t-ink-medium
          rounded-full animate-spin
        `}
      />
    </div>
  )
}

export default Loading
