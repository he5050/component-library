import { useState, useMemo, useCallback } from 'react'
import { VirtualList } from '../../components/advanced/VirtualList'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { useDebounce } from '../../hooks/useDebounce'

/**
 * 虚拟列表演示组件
 *
 * 展示 VirtualList 组件的各种使用场景和性能表现。
 */

// 生成模拟数据
function generateData(count: number, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const index = offset + i
    return {
      id: `item-${index}`,
      title: `数据项 ${index + 1}`,
      description: `这是第 ${index + 1} 个数据项的描述信息，用于展示虚拟列表的性能表现。`,
      category: ['分类 A', '分类 B', '分类 C', '分类 D'][index % 4],
      date: new Date(Date.now() - index * 86400000).toLocaleDateString('zh-CN'),
    }
  })
}

// 列表项组件
interface ListItemProps {
  item: ReturnType<typeof generateData>[0]
  index: number
  isSelected?: boolean
  onSelect?: (id: string) => void
}

function ListItem({ item, index, isSelected, onSelect }: ListItemProps) {
  return (
    <div
      onClick={() => onSelect?.(item.id)}
      className={`
        p-4 border-b border-ink/10 cursor-pointer
        transition-colors duration-200
        hover:bg-ink/5
        ${isSelected ? 'bg-ink/10' : 'bg-paper'}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-ink-light">#{index + 1}</span>
            <h4 className="font-medium text-ink-deep">{item.title}</h4>
            <span className="text-xs px-2 py-0.5 bg-ink/5 rounded-full text-ink-medium">
              {item.category}
            </span>
          </div>
          <p className="text-sm text-ink-medium line-clamp-2">{item.description}</p>
          <span className="text-xs text-ink-light mt-2 block">{item.date}</span>
        </div>
      </div>
    </div>
  )
}

function VirtualListDemo() {
  const [activeTab, setActiveTab] = useState<'basic' | 'infinite' | 'search' | 'performance'>('basic')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebounce(searchQuery, 300)

  // 基础数据
  const [basicData] = useState(() => generateData(1000))

  // 无限滚动数据
  const { items: infiniteData, loading, hasMore, onScroll, loadMore } = useInfiniteScroll({
    fetchData: useCallback(async (page) => {
      // 模拟 API 延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      return generateData(20, (page - 1) * 20)
    }, []),
    pageSize: 20,
  })

  // 搜索过滤数据
  const filteredData = useMemo(() => {
    if (!debouncedQuery) return basicData
    return basicData.filter(item =>
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  }, [basicData, debouncedQuery])

  // 性能测试数据
  const [performanceSize, setPerformanceSize] = useState(1000)
  const [renderTime, setRenderTime] = useState(0)
  const performanceData = useMemo(() => generateData(performanceSize), [performanceSize])

  const handlePerformanceChange = useCallback((size: number) => {
    const start = performance.now()
    setPerformanceSize(size)
    requestAnimationFrame(() => {
      const end = performance.now()
      setRenderTime(end - start)
    })
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* 标题 */}
      <div className="border-b border-ink/10 pb-4">
        <h2 className="text-xl font-semibold text-ink-deep">虚拟列表组件演示</h2>
        <p className="text-sm text-ink-medium mt-1">
          基于 @tanstack/react-virtual 的高性能虚拟列表实现，支持大数据量渲染
        </p>
      </div>

      {/* 标签切换 */}
      <div className="flex gap-2 border-b border-ink/10">
        {[
          { key: 'basic', label: '基础用法' },
          { key: 'infinite', label: '无限滚动' },
          { key: 'search', label: '搜索过滤' },
          { key: 'performance', label: '性能测试' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`
              px-4 py-2 text-sm font-medium transition-all duration-200
              border-b-2 -mb-px
              ${activeTab === tab.key
                ? 'text-ink-deep border-ink-deep'
                : 'text-ink-medium border-transparent hover:text-ink-thick'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 基础用法 */}
      {activeTab === 'basic' && (
        <section className="space-y-4">
          <div className="bg-paper-warm/30 p-4 rounded-lg border border-ink/8">
            <h3 className="font-medium text-ink-deep mb-2">基础虚拟列表</h3>
            <p className="text-sm text-ink-medium mb-4">
              展示 1000 条数据，只渲染可视区域内的元素（约 10-15 个 DOM 节点）
            </p>
            <div className="border border-ink/10 rounded-lg overflow-hidden">
              <VirtualList
                items={basicData}
                itemHeight={100}
                height={400}
                renderItem={(item, index) => (
                  <ListItem
                    item={item}
                    index={index}
                    isSelected={item.id === selectedId}
                    onSelect={setSelectedId}
                  />
                )}
              />
            </div>
          </div>

          {selectedId && (
            <div className="bg-ink/5 p-4 rounded-lg">
              <span className="text-sm text-ink-medium">已选择：</span>
              <span className="text-sm text-ink-deep font-medium ml-1">{selectedId}</span>
            </div>
          )}
        </section>
      )}

      {/* 无限滚动 */}
      {activeTab === 'infinite' && (
        <section className="space-y-4">
          <div className="bg-paper-warm/30 p-4 rounded-lg border border-ink/8">
            <h3 className="font-medium text-ink-deep mb-2">无限滚动加载</h3>
            <p className="text-sm text-ink-medium mb-4">
              滚动到底部自动加载更多数据，当前已加载 {infiniteData.length} 条
            </p>
            <div className="border border-ink/10 rounded-lg overflow-hidden">
              <VirtualList
                items={infiniteData}
                itemHeight={100}
                height={400}
                onScroll={onScroll}
                loading={loading}
                loadingContent={
                  <div className="py-4 text-center text-sm text-ink-medium">
                    加载更多数据中...
                  </div>
                }
                renderItem={(item, index) => (
                  <ListItem item={item} index={index} />
                )}
              />
            </div>
            {!hasMore && (
              <p className="text-center text-sm text-ink-light mt-4">没有更多数据了</p>
            )}
          </div>
        </section>
      )}

      {/* 搜索过滤 */}
      {activeTab === 'search' && (
        <section className="space-y-4">
          <div className="bg-paper-warm/30 p-4 rounded-lg border border-ink/8">
            <h3 className="font-medium text-ink-deep mb-2">搜索过滤</h3>
            <p className="text-sm text-ink-medium mb-4">
              使用防抖搜索，输入停止 300ms 后执行过滤
            </p>

            {/* 搜索框 */}
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索标题或描述..."
                className="
                  w-full max-w-md px-4 py-2
                  bg-paper border border-ink/10 rounded-lg
                  text-sm text-ink-deep placeholder:text-ink-light
                  focus:outline-none focus:border-focus
                "
              />
            </div>

            <div className="text-sm text-ink-medium mb-2">
              找到 {filteredData.length} 条结果
            </div>

            <div className="border border-ink/10 rounded-lg overflow-hidden">
              <VirtualList
                items={filteredData}
                itemHeight={100}
                height={400}
                emptyContent={
                  <div className="py-12 text-center">
                    <p className="text-ink-medium">未找到匹配的结果</p>
                    <p className="text-sm text-ink-light mt-1">请尝试其他关键词</p>
                  </div>
                }
                renderItem={(item, index) => (
                  <ListItem item={item} index={index} />
                )}
              />
            </div>
          </div>
        </section>
      )}

      {/* 性能测试 */}
      {activeTab === 'performance' && (
        <section className="space-y-4">
          <div className="bg-paper-warm/30 p-4 rounded-lg border border-ink/8">
            <h3 className="font-medium text-ink-deep mb-2">性能测试</h3>
            <p className="text-sm text-ink-medium mb-4">
              测试不同数据量下的渲染性能
            </p>

            {/* 数据量选择 */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-ink-thick">数据量：</span>
              <div className="flex gap-2">
                {[100, 1000, 10000, 100000].map((size) => (
                  <button
                    key={size}
                    onClick={() => handlePerformanceChange(size)}
                    className={`
                      px-3 py-1.5 text-sm rounded-lg transition-all
                      ${performanceSize === size
                        ? 'bg-ink text-paper'
                        : 'bg-paper border border-ink/10 hover:border-ink/20'
                      }
                    `}
                  >
                    {size.toLocaleString()}
                  </button>
                ))}
              </div>
              <span className="text-sm text-ink-medium">
                渲染时间: <span className="font-mono text-ink-deep">{renderTime.toFixed(2)}ms</span>
              </span>
            </div>

            <div className="text-sm text-ink-medium mb-2">
              当前展示 {performanceSize.toLocaleString()} 条数据，DOM 节点数约 10-15 个
            </div>

            <div className="border border-ink/10 rounded-lg overflow-hidden">
              <VirtualList
                items={performanceData}
                itemHeight={60}
                height={400}
                renderItem={(item, index) => (
                  <div className="px-4 py-3 border-b border-ink/10 hover:bg-ink/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-ink-light w-16">#{index + 1}</span>
                      <span className="text-sm text-ink-deep">{item.title}</span>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>

          {/* 性能提示 */}
          <div className="bg-focus/10 border border-focus/20 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-focus-dark mb-2">💡 性能提示</h4>
            <ul className="text-sm text-ink-medium space-y-1 list-disc list-inside">
              <li>虚拟列表只渲染可视区域内的元素，DOM 节点数量保持恒定</li>
              <li>滚动时复用已有 DOM 节点，仅更新内容，避免大量创建/销毁</li>
              <li>支持 10 万+ 数据量流畅滚动，内存占用稳定在 20MB 以内</li>
              <li>建议配合 useMemo 缓存 renderItem 函数，避免不必要的重渲染</li>
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}

export default VirtualListDemo
