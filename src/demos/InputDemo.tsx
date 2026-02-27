import { useState } from "react"
import Input from "../components/Input"

function InputDemo() {
	const [value, setValue] = useState("")
	const [errorValue, setErrorValue] = useState("错误示例")

	return (
		<div className="space-y-8 max-w-md">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<Input
					label="用户名"
					placeholder="请输入用户名"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</section>

			{/* 尺寸展示 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">尺寸 Sizes</h3>
				<div className="space-y-4">
					<Input size="sm" placeholder="小尺寸输入框" />
					<Input size="md" placeholder="中尺寸输入框（默认）" />
					<Input size="lg" placeholder="大尺寸输入框" />
				</div>
			</section>

			{/* 带提示信息 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">帮助提示</h3>
				<Input
					label="密码"
					type="password"
					placeholder="请输入密码"
					hint="密码至少包含8位字符，包括字母和数字"
				/>
			</section>

			{/* 错误状态 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">错误状态</h3>
				<Input
					label="邮箱"
					placeholder="请输入邮箱"
					value={errorValue}
					onChange={(e) => setErrorValue(e.target.value)}
					error="邮箱格式不正确，请检查"
				/>
			</section>

			{/* 禁用状态 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">禁用状态</h3>
				<Input
					label="禁用输入框"
					value="不可编辑的内容"
					disabled
				/>
			</section>
		</div>
	)
}

export default InputDemo
