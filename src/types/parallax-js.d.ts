declare module "parallax-js" {
  interface ParallaxOptions {
    relativeInput?: boolean
    clipRelativeInput?: boolean
    hoverOnly?: boolean
    inputElement?: HTMLElement | null
    calibrateX?: boolean
    calibrateY?: boolean
    invertX?: boolean
    invertY?: boolean
    limitX?: boolean
    limitY?: boolean
    scalarX?: number
    scalarY?: number
    frictionX?: number
    frictionY?: number
    originX?: number
    originY?: number
    precision?: number
    selector?: string
    onReady?: () => void
    onCalibrate?: () => void
    onMove?: (x: number, y: number) => void
  }

  class Parallax {
    constructor(scene: HTMLElement, options?: ParallaxOptions)
    enable(): void
    disable(): void
    destroy(): void
    updateLayers(): void
    calibrate(): void
  }

  export default Parallax
}
