import { useState } from "react"
import Radio from "../../components/base/Radio"
import Divider from "../../components/base/Divider"

function RadioDemo() {
	const [gender, setGender] = useState("male")
	const [plan, setPlan] = useState("pro")
	const [payment, setPayment] = useState("")

	return (
		<div className="space-y-10">
			{/* 基础用法 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">基础用法</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">单选框用于单选场景，同组单选框需相同 name</p>
				<div className="space-y-3 max-w-sm">
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
				<p className="mt-3 text-xs text-ink-light">已选择: {gender === "male" ? "男" : "女"}</p>
			</section>

			{/* 禁用状态 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">禁用状态</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">禁用状态下不可切换</p>
				<div className="space-y-3 max-w-sm">
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

			<Divider variant="brush" />

			{/* 套餐选择 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">套餐选择</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">单选场景示例</p>
				<div className="max-w-sm p-5 bg-paper rounded-xl border border-ink/10 space-y-3">
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
				<p className="mt-3 text-xs text-ink-light">已选择: {plan}</p>
			</section>

			{/* 支付方式 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">支付方式</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">另一个单选场景示例</p>
				<div className="max-w-sm p-5 bg-paper rounded-xl border border-ink/10 space-y-3">
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
					<p className="mt-3 text-xs text-ink-light">已选择: {payment}</p>
				)}
			</section>
		</div>
	)
}

export default RadioDemo
