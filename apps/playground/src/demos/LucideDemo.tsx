import React from "react"
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
  size = 20,
  strokeWidth = 1.5,
}: LucideDemoProps) {
  return (
    <div className="p-6 bg-paper border-2 border-ink/15 rounded-ink-lg shadow-ink max-w-3xl mx-auto">
      {/* 标题区域 */}
      <div className="mb-6 text-center pb-6 border-b-2 border-ink/10">
        <h2 className="text-2xl font-display font-bold text-ink-deep mb-2">
          Lucide Icons
        </h2>
        <p className="text-ink-medium text-sm">
          开源、轻量、可定制的 SVG 图标库
        </p>
      </div>

      {/* 配置信息 */}
      <div className="mb-6 p-4 bg-ink-pale rounded-lg border border-ink/10">
        <div className="text-xs text-ink-medium mb-2 uppercase tracking-wider font-medium">当前配置</div>
        <div className="flex gap-6 text-sm text-ink-thick font-mono">
          <span>size: {size}px</span>
          <span>strokeWidth: {strokeWidth}</span>
        </div>
      </div>

      {/* 图标分组 */}
      <div className="space-y-8">
        {iconGroups.map((group) => (
          <div key={group.title} className="pb-6 border-b border-ink/10 last:border-0 last:pb-0">
            <h3 className="text-sm font-semibold text-ink-thick mb-4 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-vermilion mr-2"></span>
              {group.title}
            </h3>
            <div className="grid grid-cols-6 gap-3">
              {group.icons.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="relative flex flex-col items-center p-4 rounded-lg bg-paper border border-ink/8 hover:border-vermilion/30 hover:shadow-ink-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-ink transition-all duration-200 cursor-pointer group overflow-hidden"
                  title={name}
                >
                  {/* 水墨晕染背景 */}
                  <div className="absolute inset-0 bg-gradient-radial from-vermilion/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* 图标 */}
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-200">
                    <Icon
                      size={size}
                      strokeWidth={strokeWidth}
                      className="text-ink-thick group-hover:text-vermilion transition-colors duration-200"
                    />
                  </div>
                  
                  {/* 图标名称 */}
                  <span className="relative z-10 text-xs text-ink-light mt-3 truncate w-full text-center font-mono group-hover:text-ink-thick transition-colors duration-200">
                    {name}
                  </span>
                  
                  {/* 底部装饰线 */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-vermilion/40 group-hover:w-8 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 底部信息 */}
      <div className="mt-8 pt-4 border-t-2 border-ink/10 text-center text-sm text-ink-medium">
        共展示 <span className="font-semibold text-ink-thick">{iconGroups.reduce((acc, g) => acc + g.icons.length, 0)}</span> 个图标 · Lucide 共有 <span className="font-semibold text-ink-thick">1671+</span> 图标
      </div>
    </div>
  )
}

export default LucideDemo
