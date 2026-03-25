import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, forwardRef, useCallback } from 'react'

/**
 * 虚拟列表组件
 *
 * 基于 @tanstack/react-virtual 的高性能虚拟列表实现，
 * 支持大数据量渲染，只渲染可视区域内的元素。
 *
 * 水墨设计风格，支持动态高度和水平/垂直滚动。
 *
 * @example
 * ```tsx
 * <VirtualList
 *   items={largeDataArray}
 *   itemHeight={60}
 *   height={400}
 *   renderItem={(item, index) => (
 *     <div className="p-4">{item.name}</div>
 *   )}
 * />
 * ```
 */

export interface VirtualListProps<T> {
  /** 数据项数组 */
  items: T[]
  /** 渲染单个数据项的函数 */
  renderItem: (item: T, index: number) => React.ReactNode
  /** 列表项高度（固定高度）或高度计算函数（动态高度） */
  itemHeight: number | ((item: T, index: number) => number)
  /** 列表容器高度 */
  height: number | string
  /** 水平滚动模式 */
  horizontal?: boolean
  /** 预渲染行数（上下各多渲染的行数） */
  overscan?: number
  /** 自定义类名 */
  className?: string
  /** 列表项自定义类名 */
  itemClassName?: string
  /** 滚动事件回调 */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
  /** 到达底部回调（用于无限滚动） */
  onReachEnd?: () => void
  /** 到达底部阈值（像素） */
  reachEndThreshold?: number
  /** 空状态展示 */
  emptyContent?: React.ReactNode
  /** 加载中状态 */
  loading?: boolean
  /** 加载中展示内容 */
  loadingContent?: React.ReactNode
}

export const VirtualList = forwardRef<HTMLDivElement, VirtualListProps<any>>(
  function VirtualList(
    {
      items,
      renderItem,
      itemHeight,
      height,
      horizontal = false,
      overscan = 5,
      className = '',
      itemClassName = '',
      onScroll,
      onReachEnd,
      reachEndThreshold = 100,
      emptyContent,
      loading = false,
      loadingContent,
    },
    ref
  ) {
    const parentRef = useRef<HTMLDivElement>(null)

    const virtualizer = useVirtualizer({
      count: items.length,
      getScrollElement: () => parentRef.current,
      estimateSize: useCallback(
        (index: number) => {
          if (typeof itemHeight === 'number') {
            return itemHeight
          }
          return itemHeight(items[index], index)
        },
        [itemHeight, items]
      ),
      overscan,
      horizontal,
    })

    const handleScroll = useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        onScroll?.(event)

        if (onReachEnd && parentRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = parentRef.current
          if (scrollHeight - scrollTop - clientHeight < reachEndThreshold) {
            onReachEnd()
          }
        }
      },
      [onScroll, onReachEnd, reachEndThreshold]
    )

    // 合并 ref
    const setRefs = useCallback(
      (element: HTMLDivElement | null) => {
        ;(parentRef as React.MutableRefObject<HTMLDivElement | null>).current = element
        if (typeof ref === 'function') {
          ref(element)
        } else if (ref) {
          ref.current = element
        }
      },
      [ref]
    )

    // 空状态
    if (items.length === 0 && !loading) {
      return (
        <div
          ref={setRefs}
          className={`overflow-auto flex items-center justify-center ${className}`}
          style={{ height }}
        >
          {emptyContent || (
            <div className="text-ink-medium text-sm">暂无数据</div>
          )}
        </div>
      )
    }

    const virtualItems = virtualizer.getVirtualItems()
    const totalSize = virtualizer.getTotalSize()

    return (
      <div
        ref={setRefs}
        className={`overflow-auto ${className}`}
        style={{ height }}
        onScroll={handleScroll}
      >
        <div
          style={{
            [horizontal ? 'width' : 'height']: `${totalSize}px`,
            [horizontal ? 'height' : 'width']: '100%',
            position: 'relative',
          }}
        >
          {virtualItems.map((virtualItem) => {
            const item = items[virtualItem.index]
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                className={`absolute top-0 left-0 ${itemClassName}`}
                style={{
                  [horizontal ? 'left' : 'top']: 0,
                  [horizontal ? 'transform' : 'transform']: horizontal
                    ? `translateX(${virtualItem.start}px)`
                    : `translateY(${virtualItem.start}px)`,
                  [horizontal ? 'height' : 'width']: '100%',
                }}
              >
                {renderItem(item, virtualItem.index)}
              </div>
            )
          })}
        </div>

        {/* 加载中状态 */}
        {loading && (
          <div className="py-4 flex justify-center">
            {loadingContent || (
              <div className="flex items-center gap-2 text-ink-medium text-sm">
                <span className="animate-spin">◌</span>
                加载中...
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

export default VirtualList
