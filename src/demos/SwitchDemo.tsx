import { useState } from "react"
import Switch from "../components/Switch"

function SwitchDemo() {
	const [enabled1, setEnabled1] = useState(true)
	const [enabled2, setEnabled2] = useState(false)
	const [enabled3, setEnabled3] = useState(true)
	const [enabled4, setEnabled4] = useState(false)

	return (
		<div className="space-y-8 max-w-md">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<div className="space-y-4">
					<Switch
						label="开启通知"
						checked={enabled1}
						onChange={setEnabled1}
					/>
					<Switch
						label="夜间模式"
						checked={enabled2}
						onChange={setEnabled2}
					/>
				</div>
			</section>

			{/* 默认开启 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">默认开启</h3>
				<div className="space-y-4">
					<Switch
						label="自动保存"
						checked={enabled3}
						onChange={setEnabled3}
					/>
					<Switch
						label="显示预览"
						checked={enabled4}
						onChange={setEnabled4}
					/>
				</div>
			</section>

			{/* 禁用状态 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">禁用状态</h3>
				<div className="space-y-4">
					<Switch
						label="禁用开启（默认开启）"
						checked={true}
						onChange={() => {}}
						disabled
					/>
					<Switch
						label="禁用关闭（默认关闭）"
						checked={false}
						onChange={() => {}}
						disabled
					/>
				</div>
			</section>

			{/* 开关组 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">设置项组合</h3>
				<div className="p-4 bg-paper-warm rounded-lg border border-ink/10 space-y-4">
					<h4 className="text-sm font-medium text-ink-deep mb-3">隐私设置</h4>
					<Switch
						label="公开个人资料"
						checked={enabled1}
						onChange={setEnabled1}
					/>
					<Switch
						label="允许搜索到我"
						checked={enabled2}
						onChange={setEnabled2}
					/>
					<Switch
						label="接收邮件通知"
						checked={enabled3}
						onChange={setEnabled3}
					/>
				</div>
			</section>
		</div>
	)
}

export default SwitchDemo
