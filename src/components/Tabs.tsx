import React, { useState } from "react"

interface Tab {
	key: string
	label: string
	content: React.ReactNode
}

interface TabsProps {
	tabs: Tab[]
	defaultActiveKey?: string
	className?: string
}

/**
 * 标签页组件
 *
 * 水墨风格标签页切换组件，支持内容区域切换。
 * 选中标签呈现墨色下划线，未选中标签悬停时加深。
 *
 * @param tabs - 标签页配置数组，每项包含 key、label 和 content
 * @param defaultActiveKey - 默认激活的标签 key
 * @param className - 自定义类名
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { key: "tab1", label: "标签一", content: <div>内容一</div> },
 *     { key: "tab2", label: "标签二", content: <div>内容二</div> },
 *   ]}
 *   defaultActiveKey="tab1"
 * />
 * ```
 */
function Tabs({ tabs, defaultActiveKey, className = "" }: TabsProps) {
	const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0]?.key)

	const activeTab = tabs.find((tab) => tab.key === activeKey)

	return (
		<div className={className}>
			<div className='flex border-b border-ink/10'>
				{tabs.map((tab) => (
					<button
						key={tab.key}
						onClick={() => setActiveKey(tab.key)}
						className={`
              px-4 py-2.5 text-sm font-medium transition-all duration-200
              relative -mb-px
              focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
              ${
							activeKey === tab.key
								? "text-ink-deep border-b-2 border-ink-deep"
								: "text-ink-medium hover:text-ink-thick border-b-2 border-transparent"
						}
            `}>
						{tab.label}
					</button>
				))}
			</div>
			<div className='pt-4'>{activeTab?.content}</div>
		</div>
	)
}

export default Tabs
