import { useEffect, useState, ReactNode } from "react"

interface TabItem {
	name: string
	key: string
}

interface DemoLayoutProps {
	title: string
	subtitle: string
	docsUrl?: string
	tabs?: TabItem[]
	activeTab?: number
	onTabChange?: (index: number) => void
	features?: { icon: string; name: string; desc: string }[]
	children: ReactNode
	demoArea?: ReactNode
	apiInfo?: { name: string; desc: string; color: string }[]
	loading?: boolean
}

/**
 * Demo 页面通用布局组件
 * 基于水墨禅意设计规范
 */
export function DemoLayout({
	title,
	subtitle,
	docsUrl,
	tabs,
	activeTab = 0,
	onTabChange,
	features,
	children,
	demoArea,
	apiInfo,
	loading = false,
}: DemoLayoutProps) {
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 50)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div className="relative p-8 bg-paper border border-ink/10 rounded-ink max-w-5xl mx-auto overflow-hidden">
			{/* 装饰背景 */}
			<div className="absolute top-0 right-0 w-48 h-32 opacity-[0.03] pointer-events-none">
				<svg viewBox="0 0 200 150" className="w-full h-full" fill="currentColor">
					<circle cx="150" cy="50" r="80" />
				</svg>
			</div>

			{/* 印章装饰 */}
			<div className="absolute bottom-6 right-6 w-12 h-12 opacity-15 pointer-events-none">
				<div className="w-full h-full border-2 border-zhusha rounded-sm flex items-center justify-center rotate-12">
					<span className="text-zhusha text-xs font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						演
					</span>
				</div>
			</div>

			<div className={`transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
				{/* 标题区域 */}
				<div className="mb-6 text-center pb-4 border-b-2 border-ink/10 relative">
					<div className="absolute left-1/2 -translate-x-1/2 top-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-zhusha/50 to-transparent" />
					<h2 className="text-2xl font-semibold text-ink-deep mb-2 tracking-[0.3em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						{title}
					</h2>
					<p className="text-ink-medium text-sm tracking-[0.2em] mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
						{subtitle}
					</p>
					{docsUrl && (
						<div className="flex justify-center">
							<a href={docsUrl} target="_blank" rel="noopener noreferrer"
								className="inline-flex items-center gap-1.5 text-xs text-ink-medium hover:text-zhusha transition-colors duration-300">
								<span>{docsUrl.replace(/https?:\/\//, "")}</span>
								<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
						</div>
					)}
				</div>

				{/* 标签切换 */}
				{tabs && tabs.length > 0 && (
					<div className="mb-5">
						<div className="flex gap-2 flex-wrap justify-center">
							{tabs.map((tab, index) => (
								<button
									key={tab.key}
									onClick={() => onTabChange?.(index)}
									className={`px-5 py-2.5 text-sm tracking-[0.15em] rounded-lg transition-all duration-300 ${
										activeTab === index
											? "bg-gradient-to-r from-ink-deep to-ink-deep/90 text-paper shadow-lg"
											: "bg-ink/5 text-ink-medium hover:bg-ink/10 hover:shadow-md"
									}`}
									style={{ fontFamily: "'Noto Serif SC', serif" }}
								>
									{tab.name}
								</button>
							))}
						</div>
					</div>
				)}

				{/* 演示区域 */}
				{demoArea && (
					<div className="relative h-[400px] border-2 border-ink/10 rounded-xl overflow-hidden shadow-inner bg-paper-warm/30">
						{loading && (
							<div className="absolute inset-0 flex items-center justify-center bg-paper/80">
								<div className="flex items-center gap-3 text-ink-medium">
									<div className="w-5 h-5 border-2 border-ink/20 border-t-zhusha rounded-full animate-spin" />
									<span className="text-sm" style={{ fontFamily: "'Noto Serif SC', serif" }}>加载中...</span>
								</div>
							</div>
						)}
						{demoArea}
					</div>
				)}

				{/* 自定义内容区域 */}
				{children}

				{/* API 说明 */}
				{apiInfo && apiInfo.length > 0 && (
					<div className="mt-5 p-5 rounded-xl border border-ink/10" style={{ background: "linear-gradient(135deg, #faf8f5, #f5f0e8)" }}>
						<div className="text-xs text-ink-medium space-y-2">
							<p className="font-semibold text-ink-deep mb-3 text-sm tracking-[0.15em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
								📜 核心功能
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
								{apiInfo.map((item) => (
									<div key={item.name} className="p-3 bg-paper/60 rounded border border-ink/5">
										<code className="font-bold" style={{ color: item.color }}>{item.name}</code>
										<span className="text-ink-light block text-[10px] mt-1">{item.desc}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* 特性统计 */}
				{features && features.length > 0 && (
					<div className="mt-6 pt-5 border-t border-ink/10">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
							{features.map((item) => (
								<div key={item.name} className="p-4 rounded-xl border border-ink/10 transition-all hover:shadow-md"
									style={{ background: "linear-gradient(135deg, #faf8f5, #f5f0e8)" }}>
									<div className="text-2xl mb-2">{item.icon}</div>
									<div className="text-base font-semibold text-zhusha mb-1 tracking-wider" style={{ fontFamily: "'Noto Serif SC', serif" }}>
										{item.name}
									</div>
									<div className="text-xs text-ink-light">{item.desc}</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default DemoLayout