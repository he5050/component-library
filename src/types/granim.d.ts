declare module "granim" {
  interface Gradient {
    colors: string[]
  }

  interface State {
    gradients: Gradient[]
  }

  interface States {
    [key: string]: State
  }

  interface GranimOptions {
    element: string | HTMLCanvasElement
    name?: string
    direction?: "left-right" | "right-left" | "top-bottom" | "bottom-top" | "diagonal" | "radial" | "radial-symmetric"
    opacity?: [number, number]
    stateTransitionSpeed?: number
    isPausedWhenNotInView?: boolean
    backgroundImage?: string[]
    blendMode?: string
    states: States
    afterInit?: () => void
    afterCanvasClear?: () => void
    afterGradientDraw?: () => void
    onStateChange?: (currentState: string) => void
  }

  class Granim {
    constructor(options: GranimOptions)
    changeState(stateName: string): void
    pause(): void
    play(): void
    destroy(): void
    clear(): void
    getStates(): States
    getCurrentState(): string
  }

  export = Granim
  export default Granim
}
