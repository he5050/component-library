import Tabs from "../../components/base/Tabs"
import Card from "../../components/base/Card"
import Badge from "../../components/base/Badge"
import Divider from "../../components/base/Divider"

function TabsDemo() {
	const basicTabs = [
		{
			key: "tab1",
			label: "标签一",
			content: (
				<div className="p-5 bg-paper-warm rounded-xl">
					<h4 className="font-medium text-ink-deep mb-2">标签一内容</h4>
					<p className="text-sm text-ink-medium">这是第一个标签页的内容区域，展示基础信息。</p>
				</div>
			)
		},
		{
			key: "tab2",
			label: "标签二",
			content: (
				<div className="p-5 bg-paper-warm rounded-xl">
					<h4 className="font-medium text-ink-deep mb-2">标签二内容</h4>
					<p className="text-sm text-ink-medium">这是第二个标签页的内容区域，展示详细信息。</p>
				</div>
			)
		},
		{
			key: "tab3",
			label: "标签三",
			content: (
				<div className="p-5 bg-paper-warm rounded-xl">
					<h4 className="font-medium text-ink-deep mb-2">标签三内容</h4>
					<p className="text-sm text-ink-medium">这是第三个标签页的内容区域，展示其他内容。</p>
				</div>
			)
		}
	]

	const statsTabs = [
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
					<div className="flex items-center justify-between p-4 bg-paper-warm rounded-xl">
						<span className="text-sm text-ink-thick">订单 #1234</span>
						<Badge variant="success">已完成</Badge>
					</div>
					<div className="flex items-center justify-between p-4 bg-paper-warm rounded-xl">
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
							className="w-full px-3 py-2 bg-paper-warm border border-ink/10 rounded-lg text-sm focus:border-focus focus:outline-none"
							placeholder="输入站点名称"
						/>
					</div>
					<div>
						<label className="block text-sm text-ink-thick mb-1.5">描述</label>
						<textarea 
							className="w-full px-3 py-2 bg-paper-warm border border-ink/10 rounded-lg text-sm h-20 resize-none focus:border-focus focus:outline-none"
							placeholder="输入站点描述"
						/>
					</div>
				</div>
			)
		}
	]

	return (
		<div className="space-y-10">
			{/* 基础用法 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">基础用法</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">点击标签切换内容区域</p>
				<Tabs tabs={basicTabs} defaultActiveKey="tab1" />
			</section>

			<Divider variant="brush" />

			{/* 复杂内容 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">复杂内容</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">标签页内容支持复杂的组件结构</p>
				<Tabs tabs={statsTabs} defaultActiveKey="overview" />
			</section>
		</div>
	)
}

export default TabsDemo
