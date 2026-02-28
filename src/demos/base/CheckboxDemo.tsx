import { useState } from "react"
import Checkbox from "../../components/base/Checkbox"
import Divider from "../../components/base/Divider"

function CheckboxDemo() {
	const [checked1, setChecked1] = useState(false)
	const [checked2, setChecked2] = useState(true)
	const [checked3, setChecked3] = useState(false)
	const [checked4, setChecked4] = useState(true)

	const [fruits, setFruits] = useState<string[]>(["apple"])

	const toggleFruit = (fruit: string) => {
		setFruits(prev => 
			prev.includes(fruit) 
				? prev.filter(f => f !== fruit)
				: [...prev, fruit]
		)
	}

	return (
		<div className="space-y-10">
			{/* 基础用法 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">基础用法</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">复选框用于多选场景</p>
				<div className="space-y-3 max-w-sm">
					<Checkbox 
						label="未选中状态" 
						checked={checked1} 
						onChange={setChecked1} 
					/>
					<Checkbox 
						label="已选中状态" 
						checked={checked2} 
						onChange={setChecked2} 
					/>
				</div>
			</section>

			{/* 禁用状态 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">禁用状态</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">禁用状态下不可切换</p>
				<div className="space-y-3 max-w-sm">
					<Checkbox 
						label="禁用未选中" 
						checked={false} 
						onChange={() => {}} 
						disabled 
					/>
					<Checkbox 
						label="禁用已选中" 
						checked={true} 
						onChange={() => {}} 
						disabled 
					/>
				</div>
			</section>

			<Divider variant="brush" />

			{/* 复选框组 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">复选框组</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">多选场景示例</p>
				<div className="max-w-sm p-5 bg-paper rounded-xl border border-ink/10">
					<h4 className="text-sm font-medium text-ink-deep mb-4">选择喜欢的水果</h4>
					<div className="space-y-3">
						<Checkbox 
							label="苹果" 
							checked={fruits.includes("apple")} 
							onChange={() => toggleFruit("apple")} 
						/>
						<Checkbox 
							label="香蕉" 
							checked={fruits.includes("banana")} 
							onChange={() => toggleFruit("banana")} 
						/>
						<Checkbox 
							label="橙子" 
							checked={fruits.includes("orange")} 
							onChange={() => toggleFruit("orange")} 
						/>
						<Checkbox 
							label="葡萄" 
							checked={fruits.includes("grape")} 
							onChange={() => toggleFruit("grape")} 
						/>
					</div>
					<p className="mt-4 text-xs text-ink-light pt-3 border-t border-ink/8">
						已选择: {fruits.join("、") || "无"}
					</p>
				</div>
			</section>

			{/* 使用场景 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">使用场景</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">常见的复选框应用场景</p>
				<div className="space-y-3 max-w-sm">
					<Checkbox 
						label="我已阅读并同意用户协议" 
						checked={checked3} 
						onChange={setChecked3} 
					/>
					<Checkbox 
						label="订阅邮件通知" 
						checked={checked4} 
						onChange={setChecked4} 
					/>
				</div>
			</section>
		</div>
	)
}

export default CheckboxDemo
