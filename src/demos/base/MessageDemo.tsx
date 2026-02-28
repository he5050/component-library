import Message from "../../components/base/Message"
import Divider from "../../components/base/Divider"
import { useState } from "react"

function MessageDemo() {
	const [showClosable, setShowClosable] = useState(true)

	return (
		<div className="space-y-10">
			{/* 消息类型 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">消息类型</h3>
					<span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">4种</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">四种语义类型的消息提示</p>
				<div className="space-y-3 max-w-lg">
					<Message type="info">信息提示：系统将于今晚进行维护</Message>
					<Message type="success">操作成功：数据已保存</Message>
					<Message type="warning">警告：磁盘空间不足</Message>
					<Message type="danger">错误：连接超时，请重试</Message>
				</div>
			</section>

			{/* 带标题 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">带标题</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">消息支持标题和详细内容</p>
				<div className="space-y-3 max-w-lg">
					<Message type="success" title="提交成功">
						您的申请已成功提交，我们将在3个工作日内进行审核。
					</Message>
					<Message type="warning" title="注意">
						当前操作不可逆，请确认后再继续。
					</Message>
				</div>
			</section>

			<Divider variant="brush" />

			{/* 可关闭 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">可关闭</h3>
					<span className="text-xs text-zhusha px-2 py-0.5 bg-zhusha/10 rounded-full">可交互</span>
				</div>
				<p className="text-sm text-ink-medium mb-5">点击关闭按钮关闭消息</p>
				<div className="max-w-lg">
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
				</div>
			</section>

			{/* 复杂内容 */}
			<section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
				<div className="flex items-center gap-2 mb-1">
					<h3 className="text-base font-semibold text-ink-deep">复杂内容</h3>
				</div>
				<p className="text-sm text-ink-medium mb-5">消息内容支持复杂结构</p>
				<div className="max-w-lg">
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
				</div>
			</section>
		</div>
	)
}

export default MessageDemo
