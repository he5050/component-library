import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Button from "../components/base/Button"
import Input from "../components/base/Input"
import { listHomepageEntries, type PreviewEntry } from "../previewRegistry"
import { fadeInStagger, cardEnter, rippleEffect } from "../utils/animations"

type CategoryType = "全部" | "示例演示" | "高阶组件"

function HomePage() {
	const location = useLocation()
	const navigate = useNavigate()
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategory, setSelectedCategory] = useState<CategoryType>("全部")
	const pageRef = useRef<HTMLDivElement>(null)
	const cardsRef = useRef<HTMLDivElement>(null)

	const params = new URLSearchParams(location.search)
	const search = params.get("search") || ""
	const category = params.get("category") || ""

	const allEntries = listHomepageEntries()
	const categories: CategoryType[] = ["全部", "示例演示", "高阶组件"]

	useEffect(() => {
		if (search) setSearchQuery(search)
		if (category && categories.includes(category as CategoryType)) {
			setSelectedCategory(category as CategoryType)
		}
	}, [search, category])

	useEffect(() => {
		if (pageRef.current) {
			fadeInStagger(".page-header > *", 80)
		}
		if (cardsRef.current) {
			cardEnter(".component-card")
		}
	}, [selectedCategory])

	const filteredEntries = allEntries.filter((entry) => {
		const matchesSearch =
			entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			entry.description.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesCategory = selectedCategory === "全部" || entry.category === selectedCategory
		return matchesSearch && matchesCategory
	})

	const groupedEntries = filteredEntries.reduce(
		(acc, entry) => {
			const cat = entry.category
			if (!acc[cat]) {
				acc[cat] = []
			}
			acc[cat].push(entry)
			return acc
		},
		{} as Record<string, PreviewEntry[]>,
	)

	const handleSearch = (value: string) => {
		setSearchQuery(value)
		const params = new URLSearchParams(location.search)
		if (value) {
			params.set("search", value)
		} else {
			params.delete("search")
		}
		navigate({ search: params.toString() }, { replace: true })
	}

	const handleCategorySelect = (cat: CategoryType) => {
		setSelectedCategory(cat)
		const params = new URLSearchParams(location.search)
		if (cat !== "全部") {
			params.set("category", cat)
		} else {
			params.delete("category")
		}
		navigate({ search: params.toString() }, { replace: true })
	}

	const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, componentId: string) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		rippleEffect(e.currentTarget, x, y)
		setTimeout(() => {
			navigate(`/preview/${componentId}`)
		}, 150)
	}

	return (
		<div ref={pageRef} className='min-h-screen bg-paper'>
			<div className='max-w-6xl mx-auto px-6 py-12'>
				<header className='page-header mb-12'>
					<div className='flex items-center gap-3 mb-4'>
						<div className='w-2 h-8 bg-gradient-to-b from-zhusha to-zhusha/60 rounded-full' />
						<span className='text-xs text-ink-medium tracking-[0.2em] uppercase font-display'>组件库</span>
					</div>
					<h1 className='text-4xl font-display font-bold text-ink-deep mb-3 tracking-wide'>水墨禅意组件</h1>
					<p className='text-ink-medium text-lg max-w-2xl leading-relaxed'>
						计白当黑，淡雅素净。以水墨美学构建现代组件系统。
					</p>
				</header>

				<div className='mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
					<Input
						placeholder='搜索组件...'
						value={searchQuery}
						onChange={(e) => handleSearch(e.target.value)}
						className='w-full sm:w-72'
					/>
					<div className='flex gap-2 flex-wrap'>
						{categories.map((cat) => (
							<Button
								key={cat}
								variant={selectedCategory === cat ? "primary" : "ghost"}
								size='sm'
								onClick={() => handleCategorySelect(cat)}>
								{cat}
							</Button>
						))}
					</div>
				</div>

				<div className='ink-divider mb-8' />

				<div ref={cardsRef} className='space-y-10'>
					{/* 外部演示链接卡片 */}
					<section>
						<div className='flex items-center gap-3 mb-5'>
							<h2 className='text-lg font-display font-semibold text-ink-deep'>外部演示</h2>
							<span className='text-xs text-ink-light px-2 py-0.5 bg-ink-pale/50 rounded-full'>
								完整功能展示
							</span>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
							<div
								onClick={() => window.open('/isotope-demo/index.html', '_blank')}
								className='component-card ink-card p-5 cursor-pointer group border-2 border-zhusha/20 hover:border-zhusha/40'>
								<div className='flex items-start justify-between mb-2'>
									<h3 className='text-base font-display font-semibold text-ink-deep group-hover:text-zhusha transition-colors duration-200'>
										🎨 Isotope 完整演示
									</h3>
									<span className='text-xs px-2 py-0.5 rounded-full border bg-zhusha/5 text-zhusha border-zhusha/20'>
										外部链接
									</span>
								</div>
								<p className='text-sm text-ink-medium leading-relaxed mb-3'>
									包含 6 个完整示例：基础过滤、排序功能、组合过滤、布局模式、动态操作、URL Hash 过滤
								</p>
								<div className='flex items-center gap-2 text-link text-sm group-hover:text-link-hover transition-colors duration-200'>
									<span>在新窗口打开</span>
									<svg
										className='w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
									</svg>
								</div>
							</div>
						</div>
					</section>

					{Object.entries(groupedEntries).map(([category, entries]) => (
						<section key={category}>
							<div className='flex items-center gap-3 mb-5'>
								<h2 className='text-lg font-display font-semibold text-ink-deep'>{category}</h2>
								<span className='text-xs text-ink-light px-2 py-0.5 bg-ink-pale/50 rounded-full'>
									{entries.length} 个
								</span>
							</div>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
								{entries.map((entry) => (
									<div
										key={entry.id}
										onClick={(e) => handleCardClick(e, entry.id)}
										className='component-card ink-card p-5 cursor-pointer group'>
										<div className='flex items-start justify-between mb-2'>
											<h3 className='text-base font-display font-semibold text-ink-deep group-hover:text-zhusha transition-colors duration-200'>
												{entry.name}
											</h3>
											<span
												className={`
                        text-xs px-2 py-0.5 rounded-full border
                        ${
													entry.category === "高阶组件"
														? "bg-dian/5 text-dian border-dian/20"
														: "bg-zhusha/5 text-zhusha border-zhusha/20"
												}
                      `}>
												{entry.category === "高阶组件" ? "高阶" : "Demo"}
											</span>
										</div>
										<p className='text-sm text-ink-medium leading-relaxed mb-3'>{entry.description}</p>
										<div className='flex items-center gap-2 text-link text-sm group-hover:text-link-hover transition-colors duration-200'>
											<span>查看详情</span>
											<svg
												className='w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
											</svg>
										</div>
									</div>
								))}
							</div>
						</section>
					))}
				</div>

				{filteredEntries.length === 0 && (
					<div className='text-center py-16'>
						<div className='text-ink-light text-6xl mb-4 font-display'>空</div>
						<p className='text-ink-medium'>未找到匹配的组件</p>
						<Button
							variant='ghost'
							size='sm'
							className='mt-4'
							onClick={() => {
								handleSearch("")
								handleCategorySelect("全部")
							}}>
							清除筛选
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default HomePage
