import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * 节流 Hook
 *
 * 用于限制函数执行频率，常用于滚动事件、窗口调整等高频触发场景。
 *
 * @example
 * ```tsx
 * const throttledScroll = useThrottle((scrollTop) => {
 *   console.log('Scroll position:', scrollTop)
 * }, 100)
 *
 * useEffect(() => {
 *   const handleScroll = () => {
 *     throttledScroll(window.scrollY)
 *   }
 *   window.addEventListener('scroll', handleScroll)
 *   return () => window.removeEventListener('scroll', handleScroll)
 * }, [throttledScroll])
 * ```
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastExecutedRef = useRef<number>(0)

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()

      if (now - lastExecutedRef.current >= delay) {
        callback(...args)
        lastExecutedRef.current = now
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(
          () => {
            callback(...args)
            lastExecutedRef.current = Date.now()
          },
          delay - (now - lastExecutedRef.current)
        )
      }
    },
    [callback, delay]
  )
}

/**
 * 节流值 Hook
 *
 * 用于限制值的更新频率。
 *
 * @example
 * ```tsx
 * const [scrollTop, setScrollTop] = useState(0)
 * const throttledScrollTop = useThrottleValue(scrollTop, 100)
 *
 * // 使用 throttledScrollTop 进行昂贵的计算
 * ```
 */
export function useThrottleValue<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecutedRef = useRef<number>(0)

  useEffect(() => {
    const now = Date.now()

    if (now - lastExecutedRef.current >= delay) {
      setThrottledValue(value)
      lastExecutedRef.current = now
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value)
        lastExecutedRef.current = Date.now()
      }, delay - (now - lastExecutedRef.current))

      return () => clearTimeout(timer)
    }
  }, [value, delay])

  return throttledValue
}

export default useThrottle
