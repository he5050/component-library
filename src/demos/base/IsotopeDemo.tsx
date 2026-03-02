import { useEffect, useRef } from "react"
import Isotope from "isotope-layout"

interface IsotopeDemoProps {}

const IsotopeDemo: React.FC<IsotopeDemoProps> = () => {
	const gridRef = useRef<HTMLDivElement>(null)
	const isoRef = useRef<Isotope | null>(null)

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

	const handleFilter = (filter: string, buttons: NodeListOf<HTMLButtonElement>) => {
		buttons.forEach((btn) => btn.classList.remove("is-checked"))
		const activeBtn = Array.from(buttons).find((btn) => btn.getAttribute("data-filter") === filter)
		if (activeBtn) {
			activeBtn.classList.add("is-checked")
		}
		if (isoRef.current) {
			isoRef.current.arrange({ filter })
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8'>
			<div className='max-w-6xl mx-auto'>
				<header className='text-center mb-12'>
					<h1 className='text-4xl font-bold text-gray-800 mb-4'>🎨 Isotope 网格布局演示</h1>
					<p className='text-gray-600 text-lg'>智能、动态的网格布局系统 - 支持过滤、排序和动画</p>
				</header>

				{/* 控制区域 */}
				<div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
					<div className='flex flex-wrap gap-4'>
						<div className='button-group'>
							<h4 className='text-sm font-semibold text-gray-500 mb-3'>类别筛选</h4>
							<div className='flex flex-wrap gap-2'>
								<button
									className='is-checked'
									data-filter='*'
									onClick={(e) =>
										handleFilter("*", e.currentTarget.parentElement?.querySelectorAll("button") || [])
									}>
									全部
								</button>
								<button
									data-filter='.metal'
									onClick={(e) =>
										handleFilter(".metal", e.currentTarget.parentElement?.querySelectorAll("button") || [])
									}>
									金属
								</button>
								<button
									data-filter='.transition'
									onClick={(e) =>
										handleFilter(".transition", e.currentTarget.parentElement?.querySelectorAll("button") || [])
									}>
									过渡金属
								</button>
								<button
									data-filter='.alkali'
									onClick={(e) =>
										handleFilter(".alkali", e.currentTarget.parentElement?.querySelectorAll("button") || [])
									}>
									碱金属
								</button>
								<button
									data-filter='.alkaline-earth'
									onClick={(e) =>
										handleFilter(".alkaline-earth", e.currentTarget.parentElement?.querySelectorAll("button") || [])
									}>
									碱土金属
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* 网格区域 */}
				<div ref={gridRef} className='grid'>
					<div className='grid-item metal transition'>
						<div className='grid-item-content bg-gradient-135 from-red-500 to-pink-500'>
							<h3 className='text-2xl font-bold mb-2'>Fe</h3>
							<p className='text-sm opacity-90'>铁 - 过渡金属</p>
						</div>
					</div>
					<div className='grid-item metal transition'>
						<div className='grid-item-content bg-gradient-135 from-blue-500 to-cyan-500'>
							<h3 className='text-2xl font-bold mb-2'>Cu</h3>
							<p className='text-sm opacity-90'>铜 - 过渡金属</p>
						</div>
					</div>
					<div className='grid-item metal alkali'>
						<div className='grid-item-content bg-gradient-135 from-green-500 to-emerald-500'>
							<h3 className='text-2xl font-bold mb-2'>Na</h3>
							<p className='text-sm opacity-90'>钠 - 碱金属</p>
						</div>
					</div>
					<div className='grid-item metal alkaline-earth'>
						<div className='grid-item-content bg-gradient-135 from-purple-500 to-violet-500'>
							<h3 className='text-2xl font-bold mb-2'>Mg</h3>
							<p className='text-sm opacity-90'>镁 - 碱土金属</p>
						</div>
					</div>
					<div className='grid-item metal transition'>
						<div className='grid-item-content bg-gradient-135 from-orange-500 to-amber-500'>
							<h3 className='text-2xl font-bold mb-2'>Zn</h3>
							<p className='text-sm opacity-90'>锌 - 过渡金属</p>
						</div>
					</div>
					<div className='grid-item metal alkali'>
						<div className='grid-item-content bg-gradient-135 from-pink-500 to-rose-500'>
							<h3 className='text-2xl font-bold mb-2'>K</h3>
							<p className='text-sm opacity-90'>钾 - 碱金属</p>
						</div>
					</div>
					<div className='grid-item metal transition'>
						<div className='grid-item-content bg-gradient-135 from-indigo-500 to-blue-500'>
							<h3 className='text-2xl font-bold mb-2'>Ag</h3>
							<p className='text-sm opacity-90'>银 - 过渡金属</p>
						</div>
					</div>
					<div className='grid-item metal alkaline-earth'>
						<div className='grid-item-content bg-gradient-135 from-teal-500 to-cyan-500'>
							<h3 className='text-2xl font-bold mb-2'>Ca</h3>
							<p className='text-sm opacity-90'>钙 - 碱土金属</p>
						</div>
					</div>
				</div>

				{/* 代码示例 */}
				<div className='bg-white rounded-2xl shadow-lg p-6 mt-8'>
					<h3 className='text-xl font-bold text-gray-800 mb-4'>💻 核心代码</h3>
					<pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm'>
						<code>{`// 初始化 Isotope
const grid = new Isotope('.grid', {
  itemSelector: '.grid-item',
  layoutMode: 'masonry'
});

// 过滤功能
grid.arrange({ filter: '.metal' });

// 排序功能
grid.arrange({ sortBy: 'name', sortAscending: true });

// 布局模式切换
grid.arrange({ layoutMode: 'fitRows' });`}</code>
					</pre>
				</div>

				{/* 说明卡片 */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
					<div className='bg-white rounded-xl shadow-md p-6'>
						<div className='text-3xl mb-3'>🔍</div>
						<h4 className='font-bold text-lg mb-2'>智能过滤</h4>
						<p className='text-gray-600 text-sm'>支持 CSS 选择器、函数过滤、组合过滤等多种方式</p>
					</div>
					<div className='bg-white rounded-xl shadow-md p-6'>
						<div className='text-3xl mb-3'>📊</div>
						<h4 className='font-bold text-lg mb-2'>灵活排序</h4>
						<p className='text-gray-600 text-sm'>按属性、自定义规则、随机排序，支持多条件组合</p>
					</div>
					<div className='bg-white rounded-xl shadow-md p-6'>
						<div className='text-3xl mb-3'>🎭</div>
						<h4 className='font-bold text-lg mb-2'>多种布局</h4>
						<p className='text-gray-600 text-sm'>Masonry、FitRows、CellsByRow 等多种布局模式</p>
					</div>
				</div>
			</div>

			<style>{`
        .grid {
          display: block;
        }
        
        .grid-item {
          float: left;
          width: 25%;
          padding: 15px;
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
        
        .grid-item-content {
          border-radius: 15px;
          padding: 30px 20px;
          text-align: center;
          color: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .grid-item-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        button {
          padding: 10px 20px;
          border: 2px solid #667eea;
          background: white;
          color: #667eea;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        button:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        button.is-checked {
          background: #667eea;
          color: white;
        }
      `}</style>
	</div>
)
}

export default IsotopeDemo
