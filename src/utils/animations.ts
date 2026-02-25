import { createTimeline, stagger, remove, animate, type Animation } from "animejs"

/**
 * 水墨禅意动画工具函数
 * 基于 anime.js v4 的精致细腻动画封装
 * 设计原则：层次分明、过渡自然、如墨晕染
 */

// ==================== 基础动画配置 ====================

export const animeConfig = {
  // 缓动函数 - 水墨晕染感
  easing: {
    inkSpread: "cubicBezier(0.25, 0.46, 0.45, 0.94)",     // 墨迹扩散
    inkFade: "cubicBezier(0.4, 0, 0.2, 1)",               // 淡入淡出
    inkFloat: "cubicBezier(0.34, 1.56, 0.64, 1)",          // 浮起弹性
    inkSoft: "cubicBezier(0.4, 0, 0.6, 1)",                // 柔和过渡
    inkBounce: "cubicBezier(0.68, -0.55, 0.265, 1.55)",    // 弹性回弹
    inkSmooth: "cubicBezier(0.25, 0.1, 0.25, 1)",          // 极致平滑
  },
  // 时长配置
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
    inkSpread: 600,
    breathe: 2000,
  },
}

// ==================== 入场动画系列 ====================

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
): Animation {
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
 * 卡片入场动画 - 如纸张飘落
 * @param selector - CSS 选择器
 */
export function cardEnter(selector: string): Animation {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [30, 0],
    translateX: [5, 0],
    rotateX: [5, 0],
    scale: [0.96, 1],
    easing: animeConfig.easing.inkSpread,
    duration: animeConfig.duration.slow,
  })
}

/**
 * 淡墨晕染入场 - 从中心向外扩散
 * @param selector - CSS 选择器
 */
export function inkWashEnter(selector: string): Animation {
  return animate(selector, {
    opacity: [0, 1],
    scale: [0.9, 1],
    filter: ["blur(8px)", "blur(0px)"],
    easing: animeConfig.easing.inkSoft,
    duration: animeConfig.duration.slow,
  })
}

/**
 * 笔触书写入场 - 如毛笔书写
 * @param selector - CSS 选择器
 * @param staggerMs - 字符错开延迟
 */
export function brushWriteEnter(selector: string, staggerMs: number = 40): Animation {
  return animate(selector, {
    opacity: [0, 1],
    translateX: [-10, 0],
    clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
    easing: animeConfig.easing.inkSpread,
    duration: animeConfig.duration.normal,
    delay: stagger(staggerMs),
  })
}

/**
 * 图标网格入场动画 - 从中心扩散
 * @param selector - CSS 选择器
 */
export function iconGridEnter(selector: string): Animation {
  return animate(selector, {
    opacity: [0, 1],
    scale: [0.8, 1],
    easing: animeConfig.easing.inkFloat,
    duration: animeConfig.duration.normal,
    delay: stagger(40, { grid: [6, 5], from: "center" }),
  })
}

/**
 * 卷轴展开效果
 * @param selector - CSS 选择器
 * @param direction - 展开方向 horizontal | vertical
 */
export function scrollUnfold(
  selector: string,
  direction: "horizontal" | "vertical" = "horizontal"
): Animation {
  const clipFrom = direction === "horizontal" 
    ? "inset(0 50% 0 50%)" 
    : "inset(50% 0 50% 0)"
  const clipTo = "inset(0 0% 0 0%)"

  return animate(selector, {
    opacity: [0, 1],
    clipPath: [clipFrom, clipTo],
    easing: animeConfig.easing.inkSpread,
    duration: animeConfig.duration.slower,
  })
}

// ==================== 交互动画系列 ====================

/**
 * 悬停浮起效果 - 精致版
 * @param element - DOM 元素
 */
export function hoverLift(element: HTMLElement): Animation {
  return animate(element, {
    translateY: -3,
    boxShadow: "0 8px 28px rgba(26,26,26,0.12)",
    easing: animeConfig.easing.inkFloat,
    duration: animeConfig.duration.normal,
  })
}

/**
 * 悬停离开 - 恢复效果
 * @param element - DOM 元素
 */
export function hoverReset(element: HTMLElement): Animation {
  return animate(element, {
    translateY: 0,
    boxShadow: "0 2px 8px rgba(26,26,26,0.06)",
    easing: animeConfig.easing.inkSoft,
    duration: animeConfig.duration.fast,
  })
}

/**
 * 图标悬停动画 - 精致版
 * @param element - DOM 元素
 */
export function iconHoverEnter(element: HTMLElement): void {
  const wrapper = element.querySelector(".icon-wrapper")
  const bg = element.querySelector(".icon-bg")
  const line = element.querySelector(".icon-line")

  if (wrapper) {
    animate(wrapper, {
      scale: 1.12,
      rotate: "2deg",
      easing: animeConfig.easing.inkFloat,
      duration: animeConfig.duration.normal,
    })
  }

  if (bg) {
    animate(bg, {
      opacity: [0, 0.15],
      scale: [0.8, 1.3],
      easing: animeConfig.easing.inkSpread,
      duration: animeConfig.duration.slow,
    })
  }

  if (line) {
    animate(line, {
      width: [0, 28],
      opacity: [0, 0.6],
      easing: animeConfig.easing.inkSoft,
      duration: animeConfig.duration.normal,
    })
  }
}

/**
 * 图标离开动画 - 精致版
 * @param element - DOM 元素
 */
export function iconHoverLeave(element: HTMLElement): void {
  const wrapper = element.querySelector(".icon-wrapper")
  const bg = element.querySelector(".icon-bg")
  const line = element.querySelector(".icon-line")

  if (wrapper) {
    animate(wrapper, {
      scale: 1,
      rotate: "0deg",
      easing: animeConfig.easing.inkSoft,
      duration: animeConfig.duration.fast,
    })
  }

  if (bg) {
    animate(bg, {
      opacity: 0,
      scale: 1,
      easing: animeConfig.easing.inkFade,
      duration: animeConfig.duration.fast,
    })
  }

  if (line) {
    animate(line, {
      width: 0,
      opacity: 0,
      easing: animeConfig.easing.inkSoft,
      duration: animeConfig.duration.fast,
    })
  }
}

/**
 * 按钮点击涟漪效果 - 水墨版
 * @param element - DOM 元素
 * @param x - 点击位置 X（相对元素）
 * @param y - 点击位置 Y（相对元素）
 */
export function inkRipple(element: HTMLElement, x: number, y: number): void {
  const ripple = document.createElement("span")
  ripple.className = "absolute rounded-full pointer-events-none"
  ripple.style.cssText = `
    left: ${x}px;
    top: ${y}px;
    width: 10px;
    height: 10px;
    margin-left: -5px;
    margin-top: -5px;
    background: radial-gradient(circle, rgba(26,26,26,0.12) 0%, transparent 70%);
    transform: scale(0);
  `
  element.appendChild(ripple)

  animate(ripple, {
    scale: [0, 15],
    opacity: [0.6, 0],
    easing: animeConfig.easing.inkSpread,
    duration: animeConfig.duration.slow,
    onComplete: () => ripple.remove(),
  })
}

/**
 * 按钮按压效果
 * @param element - DOM 元素
 */
export function buttonPress(element: HTMLElement): Animation {
  return animate(element, {
    scale: 0.97,
    easing: animeConfig.easing.inkSoft,
    duration: animeConfig.duration.fast,
  })
}

/**
 * 按钮释放效果
 * @param element - DOM 元素
 */
export function buttonRelease(element: HTMLElement): Animation {
  return animate(element, {
    scale: 1,
    easing: animeConfig.easing.inkBounce,
    duration: animeConfig.duration.normal,
  })
}

// ==================== 状态切换动画 ====================

/**
 * 内容切换 - 淡入淡出
 * @param outElement - 退出元素
 * @param inElement - 进入元素
 */
export function contentSwitch(
  outElement: HTMLElement,
  inElement: HTMLElement
): Promise<void> {
  return new Promise((resolve) => {
    const tl = createTimeline({
      onComplete: () => resolve(),
    })

    tl.add(outElement, {
      opacity: [1, 0],
      translateY: [0, -10],
      easing: animeConfig.easing.inkSoft,
      duration: animeConfig.duration.fast,
    })
    .add(inElement, {
      opacity: [0, 1],
      translateY: [10, 0],
      easing: animeConfig.easing.inkFade,
      duration: animeConfig.duration.normal,
    }, "-=100")
  })
}

/**
 * 展开/收起动画
 * @param element - DOM 元素
 * @param isOpen - 是否展开
 */
export function toggleExpand(element: HTMLElement, isOpen: boolean): Animation {
  const height = isOpen ? element.scrollHeight : 0
  const opacity = isOpen ? 1 : 0

  return animate(element, {
    height,
    opacity,
    easing: animeConfig.easing.inkSoft,
    duration: animeConfig.duration.normal,
  })
}

/**
 * 选项卡切换动画
 * @param indicator - 指示器元素
 * @param targetX - 目标 X 位置
 * @param targetWidth - 目标宽度
 */
export function tabSwitch(
  indicator: HTMLElement,
  targetX: number,
  targetWidth: number
): Animation {
  return animate(indicator, {
    translateX: targetX,
    width: targetWidth,
    easing: animeConfig.easing.inkFloat,
    duration: animeConfig.duration.normal,
  })
}

// ==================== 页面过渡动画 ====================

/**
 * 页面切换动画 - 淡入
 */
export function pageTransitionIn(container: HTMLElement): Animation {
  return animate(container, {
    opacity: [0, 1],
    translateY: [20, 0],
    filter: ["blur(4px)", "blur(0px)"],
    easing: animeConfig.easing.inkFade,
    duration: animeConfig.duration.slow,
  })
}

/**
 * 页面切换动画 - 淡出
 */
export function pageTransitionOut(container: HTMLElement): Animation {
  return animate(container, {
    opacity: [1, 0],
    translateY: [0, -15],
    filter: ["blur(0px)", "blur(4px)"],
    easing: animeConfig.easing.inkSoft,
    duration: animeConfig.duration.fast,
  })
}

// ==================== 特殊效果 ====================

/**
 * 水墨晕染扩散效果
 * @param element - 目标元素
 */
export function inkSpread(element: HTMLElement): Animation {
  return animate(element, {
    background: [
      "radial-gradient(circle at center, rgba(26,26,26,0.06) 0%, transparent 0%)",
      "radial-gradient(circle at center, rgba(26,26,26,0.06) 0%, transparent 100%)",
    ],
    easing: animeConfig.easing.inkSpread,
    duration: animeConfig.duration.inkSpread,
  })
}

/**
 * 呼吸效果（微妙脉冲）
 * @param selector - CSS 选择器
 */
export function breatheEffect(selector: string): Animation {
  return animate(selector, {
    opacity: [0.75, 1],
    scale: [1, 1.015],
    easing: "easeInOutSine",
    duration: 2000,
    direction: "alternate",
    loop: true,
  })
}

/**
 * 闪烁效果（加载状态）
 * @param selector - CSS 选择器
 */
export function shimmerEffect(selector: string): Animation {
  return animate(selector, {
    backgroundPosition: ["200% 0", "-200% 0"],
    easing: "linear",
    duration: 1500,
    loop: true,
  })
}

/**
 * 标题文字逐字显现
 * @param selector - CSS 选择器
 */
export function textReveal(selector: string): Animation {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [12, 0],
    clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
    easing: animeConfig.easing.inkFade,
    duration: animeConfig.duration.normal,
    delay: stagger(35),
  })
}

/**
 * 印章盖印效果
 * @param element - DOM 元素
 */
export function sealStamp(element: HTMLElement): Animation {
  return animate(element, {
    scale: [1.3, 1],
    opacity: [0, 1],
    rotate: ["-5deg", "0deg"],
    easing: animeConfig.easing.inkBounce,
    duration: animeConfig.duration.slow,
  })
}

/**
 * 墨迹滴落效果
 * @param element - DOM 元素
 */
export function inkDrop(element: HTMLElement): Animation {
  return animate(element, {
    scaleY: [0, 1.1, 1],
    scaleX: [0.5, 0.95, 1],
    opacity: [0, 1],
    easing: animeConfig.easing.inkBounce,
    duration: animeConfig.duration.slow,
  })
}

// ==================== React Hooks ====================

import { useEffect, useCallback, useRef } from "react"

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
 * 使用卡片入场动画 Hook
 * @param selector - CSS 选择器
 * @param deps - 依赖数组
 */
export function useCardEnterAnimation(selector: string, deps: React.DependencyList = []) {
  useEffect(() => {
    const timer = setTimeout(() => {
      cardEnter(selector)
    }, 150)
    return () => clearTimeout(timer)
  }, deps)
}

/**
 * 使用悬停动画 Hook
 * @returns 鼠标事件处理器
 */
export function useHoverAnimation() {
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    hoverLift(e.currentTarget)
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    hoverReset(e.currentTarget)
  }, [])

  return { handleMouseEnter, handleMouseLeave }
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

/**
 * 使用涟漪效果 Hook
 */
export function useRipple() {
  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    inkRipple(e.currentTarget, x, y)
  }, [])

  return { handleClick }
}

/**
 * 使用按钮按压效果 Hook
 */
export function useButtonPress() {
  const ref = useRef<HTMLElement>(null)

  const handleMouseDown = useCallback(() => {
    if (ref.current) {
      buttonPress(ref.current)
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    if (ref.current) {
      buttonRelease(ref.current)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      buttonRelease(ref.current)
    }
  }, [])

  return {
    ref,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
  }
}

/**
 * 使用页面过渡动画 Hook
 */
export function usePageTransition() {
  useEffect(() => {
    const container = document.querySelector(".page-container") as HTMLElement
    if (container) {
      pageTransitionIn(container)
    }
  }, [])
}

// ==================== 组合动画 ====================

/**
 * Hero 区域入场动画序列
 * @param selectors - 选择器对象
 */
export function heroEnterAnimation(selectors: {
  title: string
  subtitle: string
  content: string
}): void {
  const tl = createTimeline({
    defaults: { ease: animeConfig.easing.inkFade },
  })

  tl.add(selectors.title, {
    opacity: [0, 1],
    translateY: [25, 0],
    clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
    duration: animeConfig.duration.slow,
  })
  .add(selectors.subtitle, {
    opacity: [0, 1],
    translateY: [15, 0],
    duration: animeConfig.duration.normal,
  }, "-=200")
  .add(selectors.content, {
    opacity: [0, 1],
    translateY: [20, 0],
    scale: [0.98, 1],
    duration: animeConfig.duration.normal,
  }, "-=150")
}

/**
 * 列表项依次入场动画
 * @param selector - CSS 选择器
 * @param options - 配置选项
 */
export function listEnterAnimation(
  selector: string,
  options: {
    direction?: "up" | "down" | "left" | "right"
    stagger?: number
    duration?: number
  } = {}
): Animation {
  const { direction = "up", stagger: staggerMs = 60, duration = animeConfig.duration.normal } = options
  
  const translateMap = {
    up: { from: [0, 20], to: [0, 0] },
    down: { from: [0, -20], to: [0, 0] },
    left: { from: [20, 0], to: [0, 0] },
    right: { from: [-20, 0], to: [0, 0] },
  }

  const translate = translateMap[direction]

  return animate(selector, {
    opacity: [0, 1],
    translateX: [translate.from[0], translate.to[0]],
    translateY: [translate.from[1], translate.to[1]],
    scale: [0.97, 1],
    easing: animeConfig.easing.inkSpread,
    duration,
    delay: stagger(staggerMs),
  })
}

/**
 * 模态框入场动画
 * @param backdrop - 背景元素
 * @param content - 内容元素
 */
export function modalEnter(
  backdrop: HTMLElement,
  content: HTMLElement
): void {
  const tl = createTimeline()

  tl.add(backdrop, {
    opacity: [0, 1],
    easing: animeConfig.easing.inkSoft,
    duration: animeConfig.duration.fast,
  })
  .add(content, {
    opacity: [0, 1],
    scale: [0.92, 1],
    translateY: [20, 0],
    easing: animeConfig.easing.inkFloat,
    duration: animeConfig.duration.normal,
  }, "-=100")
}

/**
 * 模态框退出动画
 * @param backdrop - 背景元素
 * @param content - 内容元素
 */
export function modalExit(
  backdrop: HTMLElement,
  content: HTMLElement
): Promise<void> {
  return new Promise((resolve) => {
    const tl = createTimeline({
      onComplete: () => resolve(),
    })

    tl.add(content, {
      opacity: [1, 0],
      scale: [1, 0.95],
      translateY: [0, 15],
      easing: animeConfig.easing.inkSoft,
      duration: animeConfig.duration.fast,
    })
    .add(backdrop, {
      opacity: [1, 0],
      easing: animeConfig.easing.inkFade,
      duration: animeConfig.duration.fast,
    }, "-=100")
  })
}
