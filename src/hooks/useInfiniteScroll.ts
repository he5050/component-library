import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * 无限滚动 Hook
 *
 * 用于实现无限滚动加载数据，支持虚拟列表集成。
 *
 * @example
 * ```tsx
 * const { items, loading, hasMore, onScroll, loadMore } = useInfiniteScroll({
 *   fetchData: async (page) => {
 *     const response = await fetch(`/api/items?page=${page}`)
 *     return response.json()
 *   },
 *   pageSize: 20
 * })
 *
 * return (
 *   <VirtualList
 *     items={items}
 *     onScroll={onScroll}
 *     renderItem={(item) => <div>{item.name}</div>}
 *   />
 * )
 * ```
 */

export interface UseInfiniteScrollOptions<T> {
  /** 获取数据的函数 */
  fetchData: (page: number) => Promise<T[]>
  /** 每页数据量 */
  pageSize?: number
  /** 触发加载的滚动阈值（像素） */
  threshold?: number
  /** 是否立即加载 */
  immediate?: boolean
  /** 最大页数限制 */
  maxPage?: number
}

export interface UseInfiniteScrollReturn<T> {
  /** 当前已加载的数据 */
  items: T[]
  /** 是否正在加载 */
  loading: boolean
  /** 是否还有更多数据 */
  hasMore: boolean
  /** 当前错误信息 */
  error: Error | null
  /** 滚动事件处理器（用于 VirtualList 的 onScroll） */
  onScroll: (event: React.UIEvent<HTMLElement>) => void
  /** 手动触发加载更多 */
  loadMore: () => Promise<void>
  /** 重置状态并重新加载 */
  reset: () => void
  /** 当前页码 */
  currentPage: number
}

export function useInfiniteScroll<T>({
  fetchData,
  pageSize = 20,
  threshold = 100,
  immediate = true,
  maxPage = Infinity,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const loadingRef = useRef(false)
  const pageRef = useRef(1)
  const hasMoreRef = useRef(true)

  // 同步 ref 和 state
  useEffect(() => {
    pageRef.current = currentPage
  }, [currentPage])

  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return

    loadingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const newItems = await fetchData(pageRef.current)

      if (newItems.length < pageSize || pageRef.current >= maxPage) {
        setHasMore(false)
        hasMoreRef.current = false
      }

      setItems((prev) => [...prev, ...newItems])
      setCurrentPage((prev) => prev + 1)
      pageRef.current += 1
    } catch (err) {
      setError(err instanceof Error ? err : new Error('加载失败'))
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [fetchData, pageSize, maxPage])

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget

      if (scrollHeight - scrollTop - clientHeight < threshold) {
        loadMore()
      }
    },
    [loadMore, threshold]
  )

  const reset = useCallback(() => {
    setItems([])
    setHasMore(true)
    setCurrentPage(1)
    setError(null)
    pageRef.current = 1
    hasMoreRef.current = true
    loadingRef.current = false
  }, [])

  // 立即加载第一页
  useEffect(() => {
    if (immediate) {
      loadMore()
    }
  }, [immediate]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    items,
    loading,
    hasMore,
    error,
    onScroll,
    loadMore,
    reset,
    currentPage,
  }
}

export default useInfiniteScroll
