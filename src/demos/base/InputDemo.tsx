import { useState } from "react"
import Input from "../../components/base/Input"
import Divider from "../../components/base/Divider"

function InputDemo() {
	const [value, setValue] = useState("")
	const [errorValue, setErrorValue] = useState("错误示例")

	return (
		<div className="space-y-10">
			{/* 基础用法 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">基础用法</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">支持标签、占位符、值绑定等基础功能</p>
				<div className="max-w-sm">
					<Input
						label="用户名"
						placeholder="请输入用户名"
						value={value}
						onChange={(e) => setValue(e.target.value)}
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
						<Input size="sm" placeholder="小尺寸" className="flex-1" />
						<span className="text-xs text-ink-light w-8">sm</span>
					</div>
					<div className="flex items-center gap-3">
						<Input size="md" placeholder="中尺寸（默认）" className="flex-1" />
						<span className="text-xs text-ink-light w-8">md</span>
					</div>
					<div className="flex items-center gap-3">
						<Input size="lg" placeholder="大尺寸" className="flex-1" />
						<span className="text-xs text-ink-light w-8">lg</span>
					</div>
				</div>
			</section>

			{/* 状态展示 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">状态展示</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">帮助提示、错误状态、禁用状态</p>
				<div className="space-y-6 max-w-sm">
					<Input
						label="密码"
						type="password"
						placeholder="请输入密码"
						hint="密码至少包含8位字符，包括字母和数字"
					/>
					<Input
						label="邮箱"
						placeholder="请输入邮箱"
						value={errorValue}
						onChange={(e) => setErrorValue(e.target.value)}
						error="邮箱格式不正确，请检查"
					/>
					<Input
						label="禁用输入框"
						value="不可编辑的内容"
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
					<Input label="姓名" placeholder="请输入您的姓名" />
					<Input label="邮箱" type="email" placeholder="example@email.com" />
					<Input label="电话" type="tel" placeholder="请输入手机号码" />
				</div>
			</section>
		</div>
	)
}

export default InputDemo
