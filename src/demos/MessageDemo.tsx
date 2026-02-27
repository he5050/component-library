import Message from "../components/Message"
import { useState } from "react"

function MessageDemo() {
	const [showClosable, setShowClosable] = useState(true)

	return (
		<div className="space-y-8 max-w-lg">
			{/* 基础用法 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">基础用法</h3>
				<Message>这是一条普通的信息提示</Message>
			</section>

			{/* 不同类型 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">消息类型</h3>
				<div className="space-y-3">
					<Message type="info">信息提示：系统将于今晚进行维护</Message>
					<Message type="success">操作成功：数据已保存</Message>
					<Message type="warning">警告：磁盘空间不足</Message>
					<Message type="danger">错误：连接超时，请重试</Message>
				</div>
			</section>

			{/* 带标题 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">带标题</h3>
				<div className="space-y-3">
					<Message type="success" title="提交成功">
						您的申请已成功提交，我们将在3个工作日内进行审核。
					</Message>
					<Message type="warning" title="注意">
						当前操作不可逆，请确认后再继续。
					</Message>
				</div>
			</section>

			{/* 可关闭 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">可关闭</h3>
				{showClosable ? (
					<Message 
						type="info" 
						closable 
						onClose={() => setShowClosable(false)}
					>
						这是一条可以关闭的消息提示，点击右侧按钮关闭。
					</Message>
				) : (
					<button 
						onClick={() => setShowClosable(true)}
						className="text-sm text-link hover:underline"
					>
						重新显示消息
					</button>
				)}
			</section>

			{/* 复杂内容 */}
			<section>
				<h3 className="text-sm font-medium text-ink-thick mb-4">复杂内容</h3>
				<Message type="info" title="系统通知">
					<div className="space-y-2">
						<p>新版本已发布，包含以下更新：</p>
						<ul className="list-disc list-inside text-sm text-ink-medium">
							<li>优化了页面加载速度</li>
							<li>修复了若干已知问题</li>
							<li>新增了深色模式支持</li>
						</ul>
					</div>
				</Message>
			</section>
		</div>
	)
}

export default MessageDemo
