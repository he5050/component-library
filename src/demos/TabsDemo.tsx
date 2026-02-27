import { useState } from "react"
import Tabs from "../components/Tabs"
import Card from "../components/Card"
import Badge from "../components/Badge"

function TabsDemo() {
	const [activeTab, setActiveTab] = useState("tab1")

	const basicTabs = [
		{
			key: "tab1",
			label: "标签一",
			content: (
				<div className="p-4 bg-paper-warm rounded-lg">
					<h4 className="font-medium text-ink-deep mb-2">标签一内容</h4>
					<p className="text-sm text-ink-medium">这是第一个标签页的内容区域。</p>
				</div>
			)
		},
		{
			key: "tab2",
			label: "标签二",
			content: (
				<div className="p-4 bg-paper-warm rounded-lg">
					<h4 className="font-medium text-ink-deep mb-2">标签二内容</h4>
					<p className="text-sm text-ink-medium">这是第二个标签页的内容区域。</p>
				</div>
			)
		},
		{
			key: "tab3",
			label: "标签三",
			content: (
				<div className="p-4 bg-paper-warm rounded-lg">
					<h4 className="font-medium text-ink-deep mb-2">标签三内容</h4>
					<p className="text-sm text-ink-medium">这是第三个标签页的内容区域。</p>
				</div>
			)
		}
	]

	const cardTabs = [
		{
			key: "overview",
			label: "概览",
			content: (
				<div className="grid grid-cols-2 gap-4">
					<Card className="p-4" hoverable={false}>
						<div className="text-2xl font-bold text-ink-deep">1,234</div>
						<div className="text-sm text-ink-medium">总用户数</div>
					</Card>
					<Card className="p-4" hoverable={false}>
						<div className="text-2xl font-bold text-ink-deep">¥56,789</div>
						<div className="text-sm text-ink-medium">本月收入</div>
					</Card>
				</div>
			)
		},
		{
			key: "details",
			label: "详情",
			content: (
				<div className="space-y-3">
					<div className="flex items-center justify-between p-3 bg-paper-warm rounded-lg">
						<span className="text-sm text-ink-thick">订单 #1234</span>
						<Badge variant="success">已完成</Badge>
					</div>
					<div className="flex items-center justify-between p-3 bg-paper-warm rounded-lg">
						<span className="text-sm text-ink-thick">订单 #1235</span>
						<Badge variant="warning">处理中</Badge>
					</div>
				</div>
			)
		},
		{
			key: "settings",
			label: "设置",
			content: (
				<div className="space-y-4">
					<div>
						<label className="block text-sm text-ink-thick mb-1.5">站点名称</label>
						<input 
							type="text" 
							className="w-full px-3 py-2 bg-paper-warm border border-ink/10 rounded-lg text-sm"
							placeholder="输入站点名称"
						/>
					</div>
					<div>
						<label className="block text-sm text-ink-thick mb-1.5">描述</label>
						<textarea 
							className="w-full px-3 py-2 bg-paper-warm border border-ink/10 rounded-lg text-sm h-20 resize-none"
							placeholder="输入站点描述"
						/>
					</div>
				</div>
			)
		}
	]

	return (
		<div className="space-y-8 max-w-lg">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<Tabs tabs={basicTabs} defaultActiveKey="tab1" />
			</section>

			{/* 卡片式内容 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">复杂内容</h3>
				<Tabs tabs={cardTabs} defaultActiveKey="overview" />
			</section>
		</div>
	)
}

export default TabsDemo
