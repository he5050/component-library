import React, { useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Eye,
  FileText,
  Folder,
  Github,
  Globe,
  Heart,
  Home,
  Inbox,
  Linkedin,
  Mail,
  Minus,
  Moon,
  Plus,
  Search,
  Settings,
  Share2,
  Shield,
  Star,
  Sun,
  Trash2,
  Upload,
  User,
  Users,
  X,
  Youtube,
  type LucideIcon,
} from "lucide-react"

interface LucideDemoProps {
  size?: number
  color?: string
  strokeWidth?: number
}

interface IconItem {
  name: string
  icon: LucideIcon
}

interface IconGroup {
  title: string
  icons: IconItem[]
}

const COLOR_PRESETS = [
  "#2563eb",
  "#0f766e",
  "#7c3aed",
  "#dc2626",
  "#ea580c",
  "#111827",
] as const

const iconGroups: IconGroup[] = [
  {
    title: "常用",
    icons: [
      { name: "Home", icon: Home },
      { name: "User", icon: User },
      { name: "Users", icon: Users },
      { name: "Settings", icon: Settings },
      { name: "Search", icon: Search },
      { name: "Mail", icon: Mail },
      { name: "Bell", icon: Bell },
      { name: "Calendar", icon: Calendar },
      { name: "Clock3", icon: Clock3 },
      { name: "Inbox", icon: Inbox },
      { name: "Folder", icon: Folder },
      { name: "FileText", icon: FileText },
    ],
  },
  {
    title: "操作",
    icons: [
      { name: "Plus", icon: Plus },
      { name: "Minus", icon: Minus },
      { name: "Edit", icon: Edit },
      { name: "Trash2", icon: Trash2 },
      { name: "Copy", icon: Copy },
      { name: "Share2", icon: Share2 },
      { name: "Upload", icon: Upload },
      { name: "Download", icon: Download },
      { name: "Check", icon: Check },
      { name: "X", icon: X },
      { name: "ExternalLink", icon: ExternalLink },
      { name: "Eye", icon: Eye },
    ],
  },
  {
    title: "导航与品牌",
    icons: [
      { name: "ArrowLeft", icon: ArrowLeft },
      { name: "ArrowRight", icon: ArrowRight },
      { name: "ChevronLeft", icon: ChevronLeft },
      { name: "ChevronRight", icon: ChevronRight },
      { name: "BookOpen", icon: BookOpen },
      { name: "CircleHelp", icon: CircleHelp },
      { name: "Shield", icon: Shield },
      { name: "Star", icon: Star },
      { name: "Heart", icon: Heart },
      { name: "Camera", icon: Camera },
      { name: "Sun", icon: Sun },
      { name: "Moon", icon: Moon },
      { name: "Globe", icon: Globe },
      { name: "Github", icon: Github },
      { name: "Linkedin", icon: Linkedin },
      { name: "Youtube", icon: Youtube },
    ],
  },
]

function LucideDemo({
  size = 24,
  color = "#2563eb",
  strokeWidth = 2,
}: LucideDemoProps) {
  const [query, setQuery] = useState("")
  const [liveSize, setLiveSize] = useState(size)
  const [liveStrokeWidth, setLiveStrokeWidth] = useState(strokeWidth)
  const [liveColor, setLiveColor] = useState(color)
  const [activeGroup, setActiveGroup] = useState<"all" | string>("all")
  const [activeIcon, setActiveIcon] = useState<string>("Home")
  const [copiedText, setCopiedText] = useState("")

  const filteredGroups = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    return iconGroups
      .filter((group) => activeGroup === "all" || group.title === activeGroup)
      .map((group) => ({
        ...group,
        icons: group.icons.filter((item) =>
          item.name.toLowerCase().includes(keyword),
        ),
      }))
      .filter((group) => group.icons.length > 0)
  }, [query, activeGroup])

  const totalIcons = iconGroups.reduce((sum, group) => sum + group.icons.length, 0)
  const shownIcons = filteredGroups.reduce(
    (sum, group) => sum + group.icons.length,
    0,
  )

  const activeIconComponent = useMemo(() => {
    for (const group of iconGroups) {
      const found = group.icons.find((item) => item.name === activeIcon)
      if (found) {
        return found.icon
      }
    }
    return Home
  }, [activeIcon])

  const copyImportSnippet = async (iconName: string) => {
    const text = `import { ${iconName} } from "lucide-react"`
    setActiveIcon(iconName)

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(iconName)
      setTimeout(() => {
        setCopiedText("")
      }, 1200)
    } catch {
      setCopiedText("")
    }
  }

  const ActiveIcon = activeIconComponent

  return (
    <div className="w-full max-w-5xl rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-primary-900">Lucide Demo</h2>
          <p className="text-sm text-primary-600">
            搜索图标、实时调参、点击复制 import 语句
          </p>
        </div>

        <div className="rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">
          <div>
            当前: size <span className="font-semibold">{liveSize}</span> · stroke
            <span className="font-semibold"> {liveStrokeWidth}</span> · color
            <span className="font-semibold"> {liveColor}</span>
          </div>
          <div className="text-primary-500">显示 {shownIcons}/{totalIcons} 个图标</div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 rounded-2xl border border-primary-100 p-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-primary-600">
            搜索图标
          </label>
          <div className="flex items-center rounded-lg border border-primary-200 bg-white px-3">
            <Search size={16} className="text-primary-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如：Home / Arrow / User"
              className="w-full border-none bg-transparent px-2 py-2 text-sm text-primary-800 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-primary-600">
            图标组
          </label>
          <select
            value={activeGroup}
            onChange={(event) => setActiveGroup(event.target.value)}
            className="w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-sm text-primary-800 outline-none"
          >
            <option value="all">全部</option>
            {iconGroups.map((group) => (
              <option key={group.title} value={group.title}>
                {group.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-primary-600">
            Size ({liveSize}px)
          </label>
          <input
            type="range"
            min={16}
            max={56}
            value={liveSize}
            onChange={(event) => setLiveSize(Number(event.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-primary-600">
            Stroke ({liveStrokeWidth})
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.25}
            value={liveStrokeWidth}
            onChange={(event) => setLiveStrokeWidth(Number(event.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-primary-600">
            Color
          </label>
          <div className="flex items-center gap-2">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setLiveColor(preset)}
                className="h-6 w-6 rounded-full border border-primary-200"
                style={{ backgroundColor: preset }}
                title={preset}
              />
            ))}
            <input
              value={liveColor}
              onChange={(event) => setLiveColor(event.target.value)}
              className="h-8 min-w-0 flex-1 rounded-lg border border-primary-200 px-2 text-sm text-primary-800 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-primary-100 bg-primary-50 p-4">
        <div className="mb-2 text-xs uppercase tracking-wide text-primary-600">当前选中</div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <ActiveIcon size={Math.max(liveSize + 8, 28)} color={liveColor} strokeWidth={liveStrokeWidth} />
          </div>
          <div>
            <div className="font-medium text-primary-900">{activeIcon}</div>
            <code className="text-xs text-primary-600">
              {`import { ${activeIcon} } from "lucide-react"`}
            </code>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {filteredGroups.map((group) => (
          <section key={group.title}>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-primary-600">
              {group.title}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {group.icons.map(({ name, icon: Icon }) => {
                const isActive = name === activeIcon
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => copyImportSnippet(name)}
                    className={`group rounded-xl border p-3 text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary-50"
                        : "border-primary-100 bg-white hover:border-primary-300 hover:bg-primary-50"
                    }`}
                    title={`点击复制: ${name}`}
                  >
                    <Icon
                      size={liveSize}
                      color={liveColor}
                      strokeWidth={liveStrokeWidth}
                      className="mb-2"
                    />
                    <div className="truncate text-xs font-medium text-primary-800">{name}</div>
                    <div className="text-[11px] text-primary-500">
                      {copiedText === name ? "已复制" : "点击复制"}
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {shownIcons === 0 && (
        <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50 p-4 text-sm text-primary-600">
          没有匹配图标，试试更短关键词。
        </div>
      )}
    </div>
  )
}

export default LucideDemo
