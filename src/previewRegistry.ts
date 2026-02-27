import type { ComponentType } from "react"

type PreviewComponent = ComponentType<Record<string, unknown>>
type ModuleExports = Record<string, unknown> & {
	default?: unknown
}

export interface PreviewEntry {
	id: string
	component: PreviewComponent
	kind: "component" | "demo"
	sourcePath: string
	name: string
	description: string
	category: string
}

interface ComponentMetadata {
	name: string
	description: string
	category: string
}

const componentMetadata: Record<string, ComponentMetadata> = {
	Button: { name: "Button 按钮", description: "基础按钮组件，支持多种变体和尺寸", category: "基础组件" },
	Card: { name: "Card 卡片", description: "内容卡片容器，支持悬浮效果", category: "基础组件" },
	Input: { name: "Input 输入框", description: "文本输入组件，支持多种尺寸和状态", category: "基础组件" },
	Select: { name: "Select 选择器", description: "下拉选择组件", category: "基础组件" },
	Switch: { name: "Switch 开关", description: "开关切换组件", category: "基础组件" },
	Badge: { name: "Badge 徽章", description: "状态徽章标签", category: "基础组件" },
	Divider: { name: "Divider 分割线", description: "内容分割线，支持多种样式", category: "基础组件" },
	Tooltip: { name: "Tooltip 提示", description: "悬浮提示组件", category: "基础组件" },
	Loading: { name: "Loading 加载", description: "加载状态指示器", category: "基础组件" },
	Message: { name: "Message 消息", description: "静态消息提示组件", category: "基础组件" },
	Modal: { name: "Modal 弹窗", description: "模态对话框组件", category: "基础组件" },
	Toast: { name: "Toast 轻提示", description: "轻量级消息提示", category: "基础组件" },
	Skeleton: { name: "Skeleton 骨架屏", description: "内容占位骨架屏", category: "基础组件" },
	Avatar: { name: "Avatar 头像", description: "用户头像组件，支持图片和文字", category: "基础组件" },
	Checkbox: { name: "Checkbox 复选框", description: "多选框组件", category: "基础组件" },
	Radio: { name: "Radio 单选框", description: "单选框组件", category: "基础组件" },
	Tabs: { name: "Tabs 标签页", description: "标签页切换组件", category: "基础组件" },
	LucideDemo: { name: "图标演示", description: "Lucide 图标库演示", category: "示例演示" },
}

// 组件到 Demo 的映射（如果存在 Demo，预览时优先展示 Demo）
const componentToDemoMap: Record<string, string> = {
	Button: "ButtonDemo",
	Input: "InputDemo",
	Select: "SelectDemo",
	Card: "CardDemo",
	Switch: "SwitchDemo",
	Badge: "BadgeDemo",
	Divider: "DividerDemo",
	Tooltip: "TooltipDemo",
	Loading: "LoadingDemo",
	Message: "MessageDemo",
	Modal: "ModalDemo",
	Toast: "ToastDemo",
	Skeleton: "SkeletonDemo",
	Avatar: "AvatarDemo",
	Checkbox: "CheckboxDemo",
	Radio: "RadioDemo",
	Tabs: "TabsDemo",
}

const moduleGlobs = import.meta.glob<ModuleExports>(
	["./components/**/*.{tsx,jsx,ts,js}", "./demos/**/*.{tsx,jsx,ts,js}"],
	{ eager: true },
)

const isComponentLike = (value: unknown): value is PreviewComponent => {
	return typeof value === "function" || (typeof value === "object" && value !== null)
}

const toBaseName = (path: string): string => {
	const raw = path.split("/").pop() || ""
	return raw.replace(/\.(tsx|jsx|ts|js)$/, "")
}

const toKind = (path: string): "component" | "demo" => {
	return path.includes("/demos/") ? "demo" : "component"
}

const registry = new Map<string, PreviewEntry>()
const conflicts: string[] = []

const registerEntry = (name: string, entry: PreviewEntry) => {
	const exists = registry.get(name)
	if (!exists) {
		registry.set(name, entry)
		return
	}
	if (exists.sourcePath !== entry.sourcePath) {
		conflicts.push(`${name}: ${exists.sourcePath} <-> ${entry.sourcePath}`)
	}
}

// 先收集所有模块
const componentModules = new Map<string, { path: string; exports: ModuleExports }>()
const demoModules = new Map<string, { path: string; exports: ModuleExports }>()

for (const [path, moduleExports] of Object.entries(moduleGlobs)) {
	if (/\/index\.(tsx|jsx|ts|js)$/.test(path)) {
		continue
	}

	const kind = toKind(path)
	const baseName = toBaseName(path)

	if (kind === "component") {
		componentModules.set(baseName, { path, exports: moduleExports })
	} else {
		demoModules.set(baseName, { path, exports: moduleExports })
	}
}

// 注册基础组件（使用 Demo 作为预览）
for (const [name, meta] of Object.entries(componentMetadata)) {
	if (name === "LucideDemo") continue // 跳过纯演示组件

	// 检查是否有对应的 Demo
	const demoName = componentToDemoMap[name]
	const demoModule = demoName ? demoModules.get(demoName) : null

	if (demoModule && isComponentLike(demoModule.exports.default)) {
		// 使用 Demo 作为预览
		registerEntry(name, {
			id: name,
			component: demoModule.exports.default,
			kind: "component",
			sourcePath: demoModule.path,
			name: meta.name,
			description: meta.description,
			category: meta.category,
		})
	} else {
		// 使用组件本身
		const compModule = componentModules.get(name)
		if (compModule && isComponentLike(compModule.exports.default)) {
			registerEntry(name, {
				id: name,
				component: compModule.exports.default,
				kind: "component",
				sourcePath: compModule.path,
				name: meta.name,
				description: meta.description,
				category: meta.category,
			})
		}
	}
}

// 注册纯演示组件（如 LucideDemo）
for (const [name, { path, exports }] of demoModules) {
	// 跳过已作为组件 Demo 注册的
	const isUsedAsComponentDemo = Object.values(componentToDemoMap).includes(name)
	if (isUsedAsComponentDemo) continue

	const meta = componentMetadata[name] || {
		name: name,
		description: "示例演示",
		category: "示例演示",
	}

	if (isComponentLike(exports.default)) {
		registerEntry(name, {
			id: name,
			component: exports.default,
			kind: "demo",
			sourcePath: path,
			name: meta.name,
			description: meta.description,
			category: meta.category,
		})
	}
}

if (conflicts.length > 0) {
	console.warn("[previewRegistry] duplicate preview names detected:", conflicts)
}

export const getPreviewEntry = (name: string): PreviewEntry | undefined => {
	return registry.get(name)
}

export const listPreviewNames = (): string[] => {
	return [...registry.keys()].sort((a, b) => a.localeCompare(b))
}

export const listPreviewEntries = (): PreviewEntry[] => {
	return [...registry.values()].sort((a, b) => a.name.localeCompare(b.name))
}

export const listPreviewConflicts = (): string[] => {
	return [...conflicts]
}

export const listCategories = (): string[] => {
	const categories = new Set([...registry.values()].map((e) => e.category))
	return [...categories]
}
