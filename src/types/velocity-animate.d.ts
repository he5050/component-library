declare module "velocity-animate" {
	interface VelocityOptions {
		duration?: number
		delay?: number
		easing?: string | number[]
		begin?: () => void
		complete?: () => void
		progress?: (elements: Element[], complete: number, remaining: number, start: number, tweenValue: number) => void
		display?: string
		visibility?: string
		loop?: boolean | number
		direction?: "normal" | "reverse" | "alternate"
		stagger?: number
		drag?: boolean
		queue?: string | boolean
	}

	interface Velocity {
		// 属性动画
		(
			elements: Element | Element[] | NodeListOf<Element> | string,
			properties: Record<string, number | string | number[] | string[]>,
			options?: VelocityOptions,
		): Promise<void>
		// 控制命令
		(
			elements: Element | Element[] | NodeListOf<Element> | string,
			command: "stop" | "finish" | "pause" | "resume" | "reverse",
		): void
		// UI Pack 效果
		(
			elements: Element | Element[] | NodeListOf<Element> | string,
			effect: string,
			options?: VelocityOptions,
		): Promise<void>
	}

	const Velocity: Velocity
	export default Velocity
}
