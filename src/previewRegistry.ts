import type { ComponentType } from "react"

type PreviewComponent = ComponentType<Record<string, unknown>>
type ModuleExports = Record<string, unknown> & {
	default?: unknown
}

export interface PreviewEntry {
	id: string
	component: PreviewComponent
	kind: "component" | "demo"
	layer: "base" | "advanced"
	sourcePath: string
	name: string
	description: string
	category: string
}

interface ComponentMetadata {
	name: string
	description: string
	category: string
	layer: "base" | "advanced"
}

const componentMetadata: Record<string, ComponentMetadata> = {
	Button: { name: "Button 按钮", description: "基础按钮组件，支持多种变体和尺寸", category: "基础组件", layer: "base" },
	Card: { name: "Card 卡片", description: "内容卡片容器，支持悬浮效果", category: "基础组件", layer: "base" },
	Input: { name: "Input 输入框", description: "文本输入组件，支持多种尺寸和状态", category: "基础组件", layer: "base" },
	Select: { name: "Select 选择器", description: "下拉选择组件", category: "基础组件", layer: "base" },
	Switch: { name: "Switch 开关", description: "开关切换组件", category: "基础组件", layer: "base" },
	Badge: { name: "Badge 徽章", description: "状态徽章标签", category: "基础组件", layer: "base" },
	Divider: { name: "Divider 分割线", description: "内容分割线，支持多种样式", category: "基础组件", layer: "base" },
	Tooltip: { name: "Tooltip 提示", description: "悬浮提示组件", category: "基础组件", layer: "base" },
	Loading: { name: "Loading 加载", description: "加载状态指示器", category: "基础组件", layer: "base" },
	Message: { name: "Message 消息", description: "静态消息提示组件", category: "基础组件", layer: "base" },
	Modal: { name: "Modal 弹窗", description: "模态对话框组件", category: "基础组件", layer: "base" },
	Toast: { name: "Toast 轻提示", description: "轻量级消息提示", category: "基础组件", layer: "base" },
	Skeleton: { name: "Skeleton 骨架屏", description: "内容占位骨架屏", category: "基础组件", layer: "base" },
	Avatar: { name: "Avatar 头像", description: "用户头像组件，支持图片和文字", category: "基础组件", layer: "base" },
	Checkbox: { name: "Checkbox 复选框", description: "多选框组件", category: "基础组件", layer: "base" },
	Radio: { name: "Radio 单选框", description: "单选框组件", category: "基础组件", layer: "base" },
	Tabs: { name: "Tabs 标签页", description: "标签页切换组件", category: "基础组件", layer: "base" },
	LucideDemo: { name: "图标演示", description: "Lucide 图标库演示", category: "示例演示", layer: "base" },
	PtsDemo: { name: "Pts.js", description: "数学运算的艺术化表达工具库", category: "高阶组件", layer: "advanced" },
	IsotopeDemo: { name: "Isotope 网格布局", description: "智能动态网格布局系统，支持过滤、排序和动画", category: "示例演示", layer: "base" },
}

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
	[
		"./components/base/**/*.{tsx,jsx,ts,js}",
		"./components/advanced/**/*.{tsx,jsx,ts,js}",
		"./demos/base/**/*.{tsx,jsx,ts,js}",
		"./demos/advanced/**/*.{tsx,jsx,ts,js}",
	],
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

const toLayer = (path: string): "base" | "advanced" => {
	if (path.includes("/base/")) return "base"
	if (path.includes("/advanced/")) return "advanced"
	return "base"
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

const componentModules = new Map<string, { path: string; exports: ModuleExports; layer: "base" | "advanced" }>()
const demoModules = new Map<string, { path: string; exports: ModuleExports; layer: "base" | "advanced" }>()

for (const [path, moduleExports] of Object.entries(moduleGlobs)) {
	if (/\/index\.(tsx|jsx|ts|js)$/.test(path)) {
		continue
	}

	const kind = toKind(path)
	const baseName = toBaseName(path)
	const layer = toLayer(path)

	if (kind === "component") {
		componentModules.set(baseName, { path, exports: moduleExports, layer })
	} else {
		demoModules.set(baseName, { path, exports: moduleExports, layer })
	}
}

for (const [name, meta] of Object.entries(componentMetadata)) {
	if (name === "LucideDemo") continue

	const demoName = componentToDemoMap[name]
	const demoModule = demoName ? demoModules.get(demoName) : null

	if (demoModule && isComponentLike(demoModule.exports.default)) {
		registerEntry(name, {
			id: name,
			component: demoModule.exports.default,
			kind: "component",
			layer: demoModule.layer,
			sourcePath: demoModule.path,
			name: meta.name,
			description: meta.description,
			category: meta.category,
		})
	} else {
		const compModule = componentModules.get(name)
		if (compModule && isComponentLike(compModule.exports.default)) {
			registerEntry(name, {
				id: name,
				component: compModule.exports.default,
				kind: "component",
				layer: compModule.layer,
				sourcePath: compModule.path,
				name: meta.name,
				description: meta.description,
				category: meta.category,
			})
		}
	}
}

for (const [name, { path, exports, layer }] of demoModules) {
	const isUsedAsComponentDemo = Object.values(componentToDemoMap).includes(name)
	if (isUsedAsComponentDemo) continue

	const meta = componentMetadata[name] || {
		name: name,
		description: "示例演示",
		category: "示例演示",
		layer: layer,
	}

	if (isComponentLike(exports.default)) {
		registerEntry(name, {
			id: name,
			component: exports.default,
			kind: "demo",
			layer: layer,
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

export const listHomepageEntries = (): PreviewEntry[] => {
	return [...registry.values()]
		.filter((entry) => entry.category !== "基础组件")
		.sort((a, b) => a.name.localeCompare(b.name))
}
