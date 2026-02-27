import { useState } from "react"
import Radio from "../components/Radio"

function RadioDemo() {
	const [gender, setGender] = useState("male")
	const [plan, setPlan] = useState("pro")
	const [payment, setPayment] = useState("")

	return (
		<div className="space-y-8 max-w-md">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<div className="space-y-3">
					<Radio 
						name="gender"
						label="男" 
						checked={gender === "male"} 
						onChange={() => setGender("male")} 
					/>
					<Radio 
						name="gender"
						label="女" 
						checked={gender === "female"} 
						onChange={() => setGender("female")} 
					/>
				</div>
				<p className="mt-2 text-xs text-ink-light">已选择: {gender === "male" ? "男" : "女"}</p>
			</section>

			{/* 禁用状态 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">禁用状态</h3>
				<div className="space-y-3">
					<Radio 
						name="disabled"
						label="禁用未选中" 
						checked={false} 
						onChange={() => {}} 
						disabled 
					/>
					<Radio 
						name="disabled"
						label="禁用已选中" 
						checked={true} 
						onChange={() => {}} 
						disabled 
					/>
				</div>
			</section>

			{/* 单选框组 - 套餐选择 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">套餐选择</h3>
				<div className="p-4 bg-paper-warm rounded-lg border border-ink/10 space-y-3">
					<Radio 
						name="plan"
						label="基础版 - 免费" 
						checked={plan === "basic"} 
						onChange={() => setPlan("basic")} 
					/>
					<Radio 
						name="plan"
						label="专业版 - ¥99/月" 
						checked={plan === "pro"} 
						onChange={() => setPlan("pro")} 
					/>
					<Radio 
						name="plan"
						label="企业版 - ¥299/月" 
						checked={plan === "enterprise"} 
						onChange={() => setPlan("enterprise")} 
					/>
				</div>
				<p className="mt-2 text-xs text-ink-light">已选择: {plan}</p>
			</section>

			{/* 单选框组 - 支付方式 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">支付方式</h3>
				<div className="p-4 bg-paper-warm rounded-lg border border-ink/10 space-y-3">
					<Radio 
						name="payment"
						label="支付宝" 
						checked={payment === "alipay"} 
						onChange={() => setPayment("alipay")} 
					/>
					<Radio 
						name="payment"
						label="微信支付" 
						checked={payment === "wechat"} 
						onChange={() => setPayment("wechat")} 
					/>
					<Radio 
						name="payment"
						label="银行卡" 
						checked={payment === "card"} 
						onChange={() => setPayment("card")} 
					/>
				</div>
				{payment && (
					<p className="mt-2 text-xs text-ink-light">已选择: {payment}</p>
				)}
			</section>
		</div>
	)
}

export default RadioDemo
