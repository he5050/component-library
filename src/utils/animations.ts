import { animate, stagger } from "animejs"

const easing = {
  ease: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  inkSpread: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  inkFade: "cubic-bezier(0.4, 0, 0.2, 1)",
  inkFloat: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  inkSoft: "cubic-bezier(0.4, 0, 0.6, 1)",
}

const duration = {
  fast: 150,
  normal: 300,
  slow: 500,
  inkSpread: 600,
}

export function fadeInStagger(selector: string, staggerMs: number = 50) {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [10, 0],
    scale: [0.98, 1],
    ease: easing.easeOut,
    duration: duration.normal,
    delay: stagger(staggerMs),
  })
}

export function cardEnter(selector: string) {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [20, 0],
    scale: [0.96, 1],
    ease: easing.inkSpread,
    duration: duration.slow,
    delay: stagger(80),
  })
}

export function iconGridEnter(selector: string) {
  return animate(selector, {
    opacity: [0, 1],
    scale: [0.9, 1],
    ease: easing.inkFloat,
    duration: duration.normal,
    delay: stagger(30, { grid: [6, 5], from: "center" }),
  })
}

export function iconHoverEnter(element: HTMLElement) {
  const iconWrapper = element.querySelector(".icon-wrapper")
  const iconBg = element.querySelector(".icon-bg")
  const iconLine = element.querySelector(".icon-line")

  if (iconWrapper) {
    animate(iconWrapper, {
      scale: 1.2,
      rotate: "5deg",
      ease: easing.inkFloat,
      duration: duration.fast,
    })
  }

  if (iconBg) {
    animate(iconBg, {
      opacity: [0, 0.6],
      scale: [0.5, 1.5],
      ease: easing.inkSpread,
      duration: duration.normal,
    })
  }

  if (iconLine) {
    animate(iconLine, {
      width: [0, 24],
      ease: easing.easeOut,
      duration: duration.normal,
    })
  }
}

export function iconHoverLeave(element: HTMLElement) {
  const iconWrapper = element.querySelector(".icon-wrapper")
  const iconBg = element.querySelector(".icon-bg")
  const iconLine = element.querySelector(".icon-line")

  if (iconWrapper) {
    animate(iconWrapper, {
      scale: 1,
      rotate: "0deg",
      ease: easing.easeOut,
      duration: duration.fast,
    })
  }

  if (iconBg) {
    animate(iconBg, {
      opacity: 0,
      scale: 1.5,
      ease: easing.easeOut,
      duration: duration.fast,
    })
  }

  if (iconLine) {
    animate(iconLine, {
      width: 0,
      ease: easing.easeOut,
      duration: duration.fast,
    })
  }
}

export function rippleEffect(element: HTMLElement, x: number, y: number) {
  const ripple = document.createElement("span")
  ripple.className = "absolute rounded-full bg-ink/10 blur-sm pointer-events-none"
  ripple.style.left = `${x - 25}px`
  ripple.style.top = `${y - 25}px`
  ripple.style.width = "50px"
  ripple.style.height = "50px"
  element.appendChild(ripple)

  animate(ripple, {
    scale: [0.6, 2.4],
    opacity: [0.35, 0],
    ease: easing.inkSpread,
    duration: duration.inkSpread,
    onComplete: () => ripple.remove(),
  })
}

export function inkSpread(element: HTMLElement) {
  return animate(element, {
    scale: [0.95, 1],
    opacity: [0.8, 1],
    ease: easing.inkSpread,
    duration: duration.normal,
  })
}

export function inkFade(element: HTMLElement) {
  return animate(element, {
    opacity: [1, 0.7, 1],
    ease: easing.inkFade,
    duration: duration.normal,
  })
}

export function inkFloat(element: HTMLElement) {
  return animate(element, {
    translateY: [0, -3],
    ease: easing.inkFloat,
    duration: duration.normal,
  })
}

export { easing, duration }
