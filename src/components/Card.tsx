import React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

function Card({ children, className = "", hoverable = true, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-paper rounded-lg border border-ink/8 
        shadow-ink-card transition-all duration-300 
        relative overflow-hidden
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
