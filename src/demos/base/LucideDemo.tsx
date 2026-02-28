import { useState, useMemo, useRef, useEffect } from "react"
import {
  Camera,
  Heart,
  Sun,
  Moon,
  Search,
  Settings,
  User,
  Home,
  Mail,
  Bell,
  Star,
  Trash2,
  Edit,
  Plus,
  Minus,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Download,
  Upload,
  Copy,
  Share2,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react"

interface LucideDemoProps {
  size?: number
  strokeWidth?: number
}

const iconGroups = [
  {
    title: "常用图标",
    icons: [
      { name: "Home", icon: Home },
      { name: "User", icon: User },
      { name: "Settings", icon: Settings },
      { name: "Search", icon: Search },
      { name: "Mail", icon: Mail },
      { name: "Bell", icon: Bell },
    ],
  },
  {
    title: "操作图标",
    icons: [
      { name: "Plus", icon: Plus },
      { name: "Minus", icon: Minus },
      { name: "Edit", icon: Edit },
      { name: "Trash2", icon: Trash2 },
      { name: "Copy", icon: Copy },
      { name: "Share2", icon: Share2 },
    ],
  },
  {
    title: "状态图标",
    icons: [
      { name: "Check", icon: Check },
      { name: "X", icon: X },
      { name: "Star", icon: Star },
      { name: "Heart", icon: Heart },
      { name: "Sun", icon: Sun },
      { name: "Moon", icon: Moon },
    ],
  },
  {
    title: "导航图标",
    icons: [
      { name: "ArrowLeft", icon: ArrowLeft },
      { name: "ArrowRight", icon: ArrowRight },
      { name: "ChevronLeft", icon: ChevronLeft },
      { name: "ChevronRight", icon: ChevronRight },
      { name: "Download", icon: Download },
      { name: "Upload", icon: Upload },
    ],
  },
  {
    title: "媒体图标",
    icons: [
      { name: "Camera", icon: Camera },
      { name: "ExternalLink", icon: ExternalLink },
      { name: "Github", icon: Github },
      { name: "Twitter", icon: Twitter },
      { name: "Linkedin", icon: Linkedin },
      { name: "Youtube", icon: Youtube },
    ],
  },
]

function LucideDemo({
  size: initialSize = 20,
  strokeWidth: initialStrokeWidth = 1.5,
}: LucideDemoProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [size, setSize] = useState(initialSize)
  const [strokeWidth, setStrokeWidth] = useState(initialStrokeWidth)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasSearchQuery = searchQuery.trim().length > 0

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return iconGroups
    
    const query = searchQuery.toLowerCase()
    return iconGroups.map(group => ({
      ...group,
      icons: group.icons.filter(icon => 
        icon.name.toLowerCase().includes(query)
      )
    })).filter(group => group.icons.length > 0)
  }, [searchQuery])

  const totalFilteredIcons = filteredGroups.reduce((acc, g) => acc + g.icons.length, 0)

  return (
    <div 
      ref={containerRef}
      className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-3xl mx-auto overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="80" cy="20" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink-deep" />
          <circle cx="80" cy="20" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-ink-deep" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-[0.02] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10 90 Q 30 60, 50 70 T 90 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink-deep" />
          <path d="M20 80 Q 40 50, 60 60 T 100 40" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-ink-deep" />
        </svg>
      </div>

      <div 
        className={`transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="mb-8 text-center pb-6 border-b border-ink/10 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-12 h-0.5 bg-gradient-to-r from-transparent via-zhusha/40 to-transparent" />
          
          <h2 className="text-xl font-display font-semibold text-ink-deep mb-1.5 tracking-wide">
            Lucide Icons
          </h2>
          <p className="text-ink-medium text-sm">
            开源、轻量、可定制的 SVG 图标库
          </p>
          <a
            href="https://lucide.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300 group"
          >
            <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>lucide.dev</span>
          </a>
        </div>

        <div 
          className={`mb-6 flex gap-3 items-center transition-all duration-500 delay-150 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-light transition-colors duration-300 group-focus-within:text-zhusha/60" />
            <input
              type="text"
              placeholder="搜索图标..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-sm bg-paper-warm/50 border border-ink/10 rounded text-ink-thick placeholder:text-ink-light focus:outline-none focus:border-zhusha/30 focus:bg-paper-warm transition-all duration-300"
            />
            {hasSearchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink-thick transition-colors duration-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-ink-medium">
            <div className="flex items-center gap-2">
              <span className="text-ink-light">尺寸</span>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="px-2.5 py-1.5 bg-paper-warm/50 border border-ink/10 rounded text-ink-thick cursor-pointer hover:border-ink/20 focus:outline-none focus:border-zhusha/30 transition-all duration-200"
              >
                {[16, 20, 24, 28, 32].map(s => (
                  <option key={s} value={s}>{s}px</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ink-light">线宽</span>
              <select
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="px-2.5 py-1.5 bg-paper-warm/50 border border-ink/10 rounded text-ink-thick cursor-pointer hover:border-ink/20 focus:outline-none focus:border-zhusha/30 transition-all duration-200"
              >
                {[1, 1.5, 2, 2.5].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {hasSearchQuery && (
          <p className="mb-5 text-xs text-ink-light animate-fade-in">
            找到 <span className="text-ink-medium font-medium">{totalFilteredIcons}</span> 个图标
          </p>
        )}

        <div className="space-y-7">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-12 text-ink-medium">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">未找到匹配的图标</p>
            </div>
          ) : (
            filteredGroups.map((group, groupIndex) => (
              <div 
                key={group.title}
                className={`transition-all duration-500 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${200 + groupIndex * 80}ms` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-1 rounded-full bg-zhusha/60" />
                  <h3 className="text-xs font-medium text-ink-medium tracking-wide">
                    {group.title}
                  </h3>
                  <span className="text-[10px] text-ink-light">
                    {group.icons.length}
                  </span>
                </div>
                
                <div className="grid grid-cols-6 gap-2">
                  {group.icons.map(({ name, icon: Icon }) => (
                    <div
                      key={name}
                      className="relative flex flex-col items-center p-3.5 rounded-lg bg-transparent border border-transparent hover:border-ink/10 hover:bg-paper-warm/40 cursor-pointer transition-all duration-300 group"
                      onMouseEnter={() => setHoveredIcon(name)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      title={name}
                    >
                      <div 
                        className={`absolute inset-0 rounded-lg bg-zhusha/[0.03] transition-opacity duration-300 ${
                          hoveredIcon === name ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      
                      <div className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-110">
                        <Icon
                          size={size}
                          strokeWidth={strokeWidth}
                          className="text-ink-thick group-hover:text-zhusha transition-colors duration-300"
                        />
                      </div>
                      
                      <span className={`relative z-10 text-[10px] mt-2.5 truncate w-full text-center font-mono transition-colors duration-300 ${
                        hoveredIcon === name ? 'text-ink-medium' : 'text-ink-light'
                      }`}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div 
          className={`mt-8 pt-5 border-t border-ink/10 text-center text-xs text-ink-light transition-all duration-500 delay-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <span>展示 {totalFilteredIcons} 个图标</span>
            <span className="text-ink/20">·</span>
            <span>Lucide 共有 1671+ 图标</span>
            <span className="text-ink/20">·</span>
            <a
              href="https://lucide.dev/icons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-medium hover:text-zhusha transition-colors duration-300 inline-flex items-center gap-0.5 group"
            >
              浏览全部
              <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LucideDemo
