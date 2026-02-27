import { useState } from "react"
import Select from "../components/Select"

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
		<div className="space-y-8 max-w-md">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<Select
					label="选择城市"
					options={cityOptions}
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
			</section>

			{/* 尺寸展示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">尺寸 Sizes</h3>
				<div className="space-y-4">
					<Select size="sm" options={cityOptions} placeholder="小尺寸" />
					<Select size="md" options={cityOptions} placeholder="中尺寸（默认）" />
					<Select size="lg" options={cityOptions} placeholder="大尺寸" />
				</div>
			</section>

			{/* 错误状态 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">错误状态</h3>
				<Select
					label="选择角色"
					options={roleOptions}
					value={role}
					onChange={(e) => setRole(e.target.value)}
					error="请选择一个角色"
				/>
			</section>

			{/* 禁用状态 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">禁用状态</h3>
				<Select
					label="禁用选择器"
					options={cityOptions}
					value="beijing"
					disabled
				/>
			</section>
		</div>
	)
}

export default SelectDemo
