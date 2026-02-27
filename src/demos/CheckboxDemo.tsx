import { useState } from "react"
import Checkbox from "../components/Checkbox"

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
		<div className="space-y-8 max-w-md">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<div className="space-y-3">
					<Checkbox 
						label="未选中" 
						checked={checked1} 
						onChange={setChecked1} 
					/>
					<Checkbox 
						label="已选中" 
						checked={checked2} 
						onChange={setChecked2} 
					/>
				</div>
			</section>

			{/* 禁用状态 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">禁用状态</h3>
				<div className="space-y-3">
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

			{/* 复选框组 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">复选框组</h3>
				<div className="p-4 bg-paper-warm rounded-lg border border-ink/10">
					<h4 className="text-sm font-medium text-ink-deep mb-3">选择喜欢的水果</h4>
					<div className="space-y-2">
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
					<p className="mt-3 text-xs text-ink-light">
						已选择: {fruits.join(", ") || "无"}
					</p>
				</div>
			</section>

			{/* 用户协议 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">使用场景</h3>
				<div className="space-y-3">
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
