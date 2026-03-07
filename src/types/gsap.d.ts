declare module "gsap" {
	export interface TweenVars {
		duration?: number
		delay?: number
		ease?: string
		opacity?: number | string
		x?: number | string
		y?: number | string
		scale?: number
		rotation?: number
		transformOrigin?: string
		onComplete?: () => void
		onStart?: () => void
		onUpdate?: () => void
		stagger?: number | object
		[key: string]: any
	}

	export interface TimelineVars {
		duration?: number
		delay?: number
		ease?: string
		onComplete?: () => void
		onStart?: () => void
		onUpdate?: () => void
		repeat?: number
		repeatDelay?: number
		yoyo?: boolean
		paused?: boolean
	}

	export class Tween {
		pause(): this
		resume(): this
		reverse(): this
		kill(): this
		restart(includeDelay?: boolean): this
		seek(time: number, suppressEvents?: boolean): this
		progress(value?: number): number | this
		duration(value?: number): number | this
		delay(value?: number): number | this
		time(value?: number): number | this
		timeScale(value?: number): number | this
		isActive(): boolean
		eventCallback(type: string, callback?: Function): Function | this
	}

	export class Timeline extends Tween {
		add(child: any, position?: string | number): this
		addLabel(label: string, position?: string | number): this
		to(target: any, vars: TweenVars, position?: string | number): this
		from(target: any, vars: TweenVars, position?: string | number): this
		fromTo(target: any, fromVars: TweenVars, toVars: TweenVars, position?: string | number): this
		call(callback: Function, params?: any[], position?: string | number): this
	}

	export function to(target: any, vars: TweenVars): Tween
	export function from(target: any, vars: TweenVars): Tween
	export function fromTo(target: any, fromVars: TweenVars, toVars: TweenVars): Tween
	export function timeline(vars?: TimelineVars): Timeline
	export function set(target: any, vars: object): void
	export function killTweensOf(target: any, properties?: string | string[]): void
	export function getProperty(target: any, property: string): number

	const gsap: {
		to: typeof to
		from: typeof from
		fromTo: typeof fromTo
		timeline: typeof timeline
		set: typeof set
		killTweensOf: typeof killTweensOf
		getProperty: typeof getProperty
	}

	export default gsap
}
