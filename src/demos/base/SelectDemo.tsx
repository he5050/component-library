import { useState } from "react"
import Select from "../../components/base/Select"
import Divider from "../../components/base/Divider"

const cityOptions = [
	{ value: "beijing", label: "北京" },
	{ value: "shanghai", label: "上海" },
	{ value: "guangzhou", label: "广州" },
	{ value: "shenzhen", label: "深圳" },
	{ value: "hangzhou", label: "杭州" },
]

const roleOptions = [
	{ value: "admin", label: "管理员" },
	{ value: "editor", label: "编辑" },
	{ value: "viewer", label: "访客" },
]

function SelectDemo() {
	const [city, setCity] = useState("beijing")
	const [role, setRole] = useState("")

	return (
		<div className="space-y-10">
			{/* 基础用法 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">基础用法</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">下拉选择器，支持标签和选项配置</p>
				<div className="max-w-sm">
					<Select
						label="选择城市"
						options={cityOptions}
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
			</section>

			{/* 尺寸展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">尺寸 Sizes</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">3种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">三种尺寸适应不同场景</p>
				<div className="space-y-4 max-w-sm">
					<div className="flex items-center gap-3">
						<Select size="sm" options={cityOptions} className="flex-1" />
						<span className="text-xs text-ink-light w-8">sm</span>
					</div>
					<div className="flex items-center gap-3">
						<Select size="md" options={cityOptions} className="flex-1" />
						<span className="text-xs text-ink-light w-8">md</span>
					</div>
					<div className="flex items-center gap-3">
						<Select size="lg" options={cityOptions} className="flex-1" />
						<span className="text-xs text-ink-light w-8">lg</span>
					</div>
				</div>
			</section>

			{/* 状态展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">状态展示</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">错误状态和禁用状态</p>
				<div className="space-y-6 max-w-sm">
					<Select
						label="选择角色"
						options={roleOptions}
						value={role}
						onChange={(e) => setRole(e.target.value)}
						error="请选择一个角色"
					/>
					<Select
						label="禁用选择器"
						options={cityOptions}
						value="beijing"
						disabled
					/>
				</div>
			</section>

			<Divider variant="brush" />

			{/* 表单示例 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">表单示例</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">完整的表单场景展示</p>
				<div className="space-y-4 max-w-sm">
					<Select label="省份" options={cityOptions} />
					<Select label="城市" options={cityOptions} />
					<Select label="区县" options={cityOptions} />
				</div>
			</section>
		</div>
	)
}

export default SelectDemo
