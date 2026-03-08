import { useEffect, useRef, useState } from "react"
import Isotope from "isotope-layout"
import { DemoLayout } from "../components/DemoLayout"
import { COLORS, BACKGROUNDS } from "../styles/colors"

interface IsotopeDemoProps {}

const IsotopeDemo: React.FC<IsotopeDemoProps> = () => {
	const gridRef = useRef<HTMLDivElement>(null)
	const isoRef = useRef<Isotope | null>(null)
	const [activeFilter, setActiveFilter] = useState("*")

	// 模拟元素数据 - 使用国风主题
	const gridItems = [
		{ id: "fe", symbol: "墨", name: "玄", category: "black", color: COLORS.zhusha },
		{ id: "cu", symbol: "朱", name: "砂", category: "red", color: COLORS.zhusha },
		{ id: "na", symbol: "青", name: "竹", category: "green", color: COLORS.daiqing },
		{ id: "mg", symbol: "黛", name: "山", category: "blue", color: COLORS.link },
		{ id: "zn", symbol: "金", name: "琥", category: "gold", color: COLORS.jin },
		{ id: "k", symbol: "檀", name: "木", category: "brown", color: COLORS.zhushi },
		{ id: "ag", symbol: "缃", name: "叶", category: "yellow", color: COLORS.jin },
		{ id: "ca", symbol: "霜", name: "雪", category: "white", color: COLORS.link },
	]

	const categories = [
		{ key: "*", name: "全部" },
		{ key: ".black", name: "墨色" },
		{ key: ".red", name: "朱砂" },
		{ key: ".green", name: "竹青" },
		{ key: ".blue", name: "靛青" },
		{ key: ".gold", name: "金色" },
	]

	const handleFilter = (filter: string) => {
		setActiveFilter(filter)
		if (isoRef.current) {
			isoRef.current.arrange({ filter })
		}
	}

	// 初始化 Isotope
	useEffect(() => {
		if (gridRef.current) {
			isoRef.current = new Isotope(gridRef.current, {
				itemSelector: ".grid-item",
				layoutMode: "masonry",
				percentPosition: true,
			})
		}

		return () => {
			if (isoRef.current) {
				isoRef.current.destroy()
			}
		}
	}, [])

	const demoArea = (
		<div
			ref={gridRef}
			style={{ background: BACKGROUNDS.paper }}
		>
			{gridItems.map((item) => (
				<div
					key={item.id}
					className={`grid-item ${item.category}`}
					style={{ padding: "10px" }}
				>
					<div
						className="grid-item-content"
						style={{
							background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}40 100%)`,
							border: `1px solid ${item.color}30`,
							borderRadius: "12px",
							padding: "24px 16px",
							textAlign: "center",
							color: "#1a1917",
							transition: "all 0.3s ease",
							cursor: "pointer",
						}}
					>
						<h3 className="text-2xl font-bold mb-2" style={{ color: item.color, fontFamily: "'Noto Serif SC', serif" }}>
							{item.symbol}
						</h3>
						<p className="text-sm opacity-80" style={{ fontFamily: "'Noto Serif SC', serif" }}>
							{item.name}
						</p>
					</div>
				</div>
			))}
		</div>
	)

	return (
		<DemoLayout
			title="Isotope"
			subtitle="智能动态的瀑布流网格布局"
			docsUrl="https://isotope.metafizzy.co/"
			tabs={categories}
			activeTab={categories.findIndex((c) => c.key === activeFilter)}
			onTabChange={(idx) => handleFilter(categories[idx].key)}
			features={[
				{ icon: "🔍", name: "智能过滤", desc: "CSS选择器" },
				{ icon: "📊", name: "灵活排序", desc: "自定义规则" },
				{ icon: "🎭", name: "多种布局", desc: "Masonry模式" },
				{ icon: "✨", name: "平滑动画", desc: "过渡效果" },
			]}
			apiInfo={[
				{ name: "过滤", desc: "按类别筛选元素", color: COLORS.zhusha },
				{ name: "排序", desc: "自定义排序规则", color: COLORS.daiqing },
				{ name: "布局", desc: "Masonry 瀑布流", color: COLORS.zhushi },
			]}
			demoArea={demoArea}
		>
			<style>{`
				.grid {
					display: block;
					padding: 10px;
				}

				.grid-item {
					float: left;
					width: 25%;
					transition: all 0.4s ease;
				}

				@media (max-width: 1024px) {
					.grid-item {
						width: 33.333%;
					}
				}

				@media (max-width: 768px) {
					.grid-item {
						width: 50%;
					}
				}

				.grid-item-content:hover {
					transform: translateY(-4px);
					box-shadow: 0 8px 24px rgba(26, 26, 26, 0.1);
				}
			`}</style>
		</DemoLayout>
	)
}

export default IsotopeDemo