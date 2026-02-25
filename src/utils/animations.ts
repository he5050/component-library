import { createTimeline, stagger, remove, animate } from "animejs"

/**
 * 水墨禅意动画工具函数
 * 基于 anime.js v4 的轻量动画封装
 */

// ==================== 基础动画配置 ====================

export const animeConfig = {
  // 缓动函数 - 水墨晕染感
  easing: {
    inkSpread: "cubicBezier(0.25, 0.46, 0.45, 0.94)", // 墨迹扩散
    inkFade: "cubicBezier(0.4, 0, 0.2, 1)",           // 淡入淡出
    inkFloat: "cubicBezier(0.34, 1.56, 0.64, 1)",      // 浮起弹性
    inkSoft: "cubicBezier(0.4, 0, 0.6, 1)",            // 柔和过渡
  },
  // 时长配置
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    inkSpread: 600,
  },
}

// ==================== 入场动画 ====================

/**
 * 元素依次淡入动画（水墨晕染效果）
 * @param selector - CSS 选择器
 * @param staggerMs - 错开延迟
 * @param duration - 动画时长
 */
export function fadeInStagger(
  selector: string,
  staggerMs: number = 50,
  duration: number = animeConfig.duration.normal
) {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [10, 0],
    scale: [0.98, 1],
    easing: animeConfig.easing.inkFade,
    duration,
    delay: stagger(staggerMs),
  })
}

/**
 * 卡片入场动画
 * @param selector - CSS 选择器
 */
export function cardEnter(selector: string) {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [20, 0],
    scale: [0.96, 1],
    easing: animeConfig.easing.inkSpread,
    duration: animeConfig.duration.slow,
  })
}

/**
 * 图标网格入场动画
 * @param selector - CSS 选择器
 */
export function iconGridEnter(selector: string) {
  return animate(selector, {
    opacity: [0, 1],
    scale: [0.9, 1],
    easing: animeConfig.easing.inkFloat,
    duration: animeConfig.duration.normal,
    delay: stagger(30, { grid: [6, 5], from: "center" }),
  })
}

// ==================== 交互动画 ====================

/**
 * 图标悬停动画
 * @param element - DOM 元素
 */
export function iconHoverEnter(element: HTMLElement) {
  remove(element.querySelector(".icon-wrapper"))
  remove(element.querySelector(".icon-bg"))
  remove(element.querySelector(".icon-line"))

  const tl = createTimeline({ defaults: { duration: animeConfig.duration.fast } })

  // 图标放大
  tl.add(element.querySelector(".icon-wrapper"), {
    scale: 1.15,
    rotate: "3deg",
    easing: animeConfig.easing.inkFloat,
  })

  // 背景晕染
  tl.add(element.querySelector(".icon-bg"), {
    opacity: [0, 1],
    scale: [0.8, 1.2],
    easing: animeConfig.easing.inkSpread,
    duration: animeConfig.duration.normal,
  }, 0)

  // 底部装饰线展开
  tl.add(element.querySelector(".icon-line"), {
    width: [0, 32],
    easing: animeConfig.easing.inkSoft,
    duration: animeConfig.duration.normal,
  }, 0)
}

/**
 * 图标离开动画
 * @param element - DOM 元素
 */
export function iconHoverLeave(element: HTMLElement) {
  remove(element.querySelector(".icon-wrapper"))
  remove(element.querySelector(".icon-bg"))
  remove(element.querySelector(".icon-line"))

  const tl = createTimeline({ defaults: { duration: animeConfig.duration.fast } })

  tl.add(element.querySelector(".icon-wrapper"), {
    scale: 1,
    rotate: "0deg",
    easing: animeConfig.easing.inkSoft,
  })

  tl.add(element.querySelector(".icon-bg"), {
    opacity: 0,
    scale: 1,
    easing: animeConfig.easing.inkFade,
  }, 0)

  tl.add(element.querySelector(".icon-line"), {
    width: 0,
    easing: animeConfig.easing.inkSoft,
  }, 0)
}

/**
 * 按钮点击涟漪效果
 * @param element - DOM 元素
 * @param x - 点击位置 X
 * @param y - 点击位置 Y
 */
export function rippleEffect(element: HTMLElement, x: number, y: number) {
  const ripple = document.createElement("span")
  ripple.className = "absolute inset-0 bg-current opacity-20 rounded-inherit pointer-events-none"
  ripple.style.left = "0"
  ripple.style.top = "0"
  element.appendChild(ripple)

  animate(ripple, {
    opacity: [0.3, 0],
    scale: [0.5, 2],
    easing: animeConfig.easing.inkFade,
    duration: animeConfig.duration.slow,
    onComplete: () => ripple.remove(),
  })
}

// ==================== 页面过渡动画 ====================

/**
 * 页面切换动画 - 淡入
 */
export function pageTransitionIn(container: HTMLElement) {
  return animate(container, {
    opacity: [0, 1],
    translateY: [15, 0],
    easing: animeConfig.easing.inkFade,
    duration: animeConfig.duration.slow,
  })
}

/**
 * 页面切换动画 - 淡出
 */
export function pageTransitionOut(container: HTMLElement) {
  return animate(container, {
    opacity: [1, 0],
    translateY: [0, -10],
    easing: animeConfig.easing.inkSoft,
    duration: animeConfig.duration.fast,
  })
}

// ==================== 特殊效果 ====================

/**
 * 水墨晕染扩散效果
 * @param element - 目标元素
 */
export function inkSpread(element: HTMLElement) {
  return animate(element, {
    background: [
      "radial-gradient(circle at center, rgba(26,26,26,0.05) 0%, transparent 0%)",
      "radial-gradient(circle at center, rgba(26,26,26,0.05) 0%, transparent 100%)",
    ],
    easing: animeConfig.easing.inkSpread,
    duration: animeConfig.duration.inkSpread,
  })
}

/**
 * 呼吸效果（微妙脉冲）
 * @param selector - CSS 选择器
 */
export function breatheEffect(selector: string) {
  return animate(selector, {
    opacity: [0.7, 1],
    scale: [1, 1.02],
    easing: "easeInOutSine",
    duration: 2000,
    direction: "alternate",
    loop: true,
  })
}

/**
 * 标题文字逐字显现
 * @param selector - CSS 选择器
 */
export function textReveal(selector: string) {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [8, 0],
    easing: animeConfig.easing.inkFade,
    duration: animeConfig.duration.normal,
    delay: stagger(30),
  })
}

// ==================== React Hooks ====================

import { useEffect, useCallback } from "react"

/**
 * 使用入场动画 Hook
 * @param selector - CSS 选择器
 * @param deps - 依赖数组
 */
export function useEnterAnimation(selector: string, deps: React.DependencyList = []) {
  useEffect(() => {
    const timer = setTimeout(() => {
      fadeInStagger(selector)
    }, 100)
    return () => clearTimeout(timer)
  }, deps)
}

/**
 * 使用图标悬停动画 Hook
 */
export function useIconHover() {
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    iconHoverEnter(e.currentTarget)
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    iconHoverLeave(e.currentTarget)
  }, [])

  return { handleMouseEnter, handleMouseLeave }
}
