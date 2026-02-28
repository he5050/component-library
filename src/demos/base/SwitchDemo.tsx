import { useState } from "react"
import Switch from "../../components/base/Switch"
import Divider from "../../components/base/Divider"

function SwitchDemo() {
	const [enabled1, setEnabled1] = useState(true)
	const [enabled2, setEnabled2] = useState(false)
	const [enabled3, setEnabled3] = useState(true)
	const [enabled4, setEnabled4] = useState(false)

	return (
		<div className="space-y-10">
			{/* 基础用法 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">基础用法</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">开关切换组件，用于二元状态切换</p>
				<div className="space-y-4 max-w-sm">
					<Switch label="开启通知" checked={enabled1} onChange={setEnabled1} />
					<Switch label="夜间模式" checked={enabled2} onChange={setEnabled2} />
				</div>
			</section>

			{/* 禁用状态 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">禁用状态</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">禁用状态下不可切换</p>
				<div className="space-y-4 max-w-sm">
					<Switch label="禁用开启" checked={true} onChange={() => {}} disabled />
					<Switch label="禁用关闭" checked={false} onChange={() => {}} disabled />
				</div>
			</section>

			<Divider variant="brush" />

			{/* 设置面板 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">设置面板</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">典型的设置项组合场景</p>
				<div className="max-w-sm p-5 bg-paper rounded-xl border border-ink/10 space-y-4">
					<h4 className="text-sm font-medium text-ink-deep pb-3 border-b border-ink/8">隐私设置</h4>
					<Switch label="公开个人资料" checked={enabled1} onChange={setEnabled1} />
					<Switch label="允许搜索到我" checked={enabled2} onChange={setEnabled2} />
					<Switch label="接收邮件通知" checked={enabled3} onChange={setEnabled3} />
					<Switch label="接收推送通知" checked={enabled4} onChange={setEnabled4} />
				</div>
			</section>
		</div>
	)
}

export default SwitchDemo
