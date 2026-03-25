import { useState, useEffect } from 'react'

/**
 * 防抖 Hook
 *
 * 用于延迟更新值，常用于搜索输入等场景。
 *
 * @example
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState('')
 * const debouncedQuery = useDebounce(searchQuery, 300)
 *
 * // 使用 debouncedQuery 进行搜索，避免频繁请求
 * useEffect(() => {
 *   fetchSearchResults(debouncedQuery)
 * }, [debouncedQuery])
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
