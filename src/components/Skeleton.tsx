interface SkeletonProps {
  variant?: "text" | "circle" | "rect"
  className?: string
}

const variantStyles = {
  text: "h-4 w-full rounded-[4px]",
  circle: "w-10 h-10 rounded-full",
  rect: "w-full h-24 rounded-lg",
}

function Skeleton({ variant = "text", className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-ink-200 ${variantStyles[variant]} ${className}`}
      aria-hidden="true"
    />
  )
}

export default Skeleton
