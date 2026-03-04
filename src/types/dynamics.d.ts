declare module "dynamics.js" {
	interface AnimationOptions {
		type: any
		frequency?: number
		friction?: number
		mass?: number
		bounciness?: number
		elasticity?: number
		duration?: number
		deceleration?: number
		initialVelocity?: number
	}

	interface Dynamics {
		spring: any
		gravity: any
		bounce: any
		forceWithGravity: any
		animate(
			element: Element | Element[],
			properties: Record<string, number | string>,
			options?: AnimationOptions,
		): Promise<void>
		stop(element: Element | Element[]): void
	}

	const dynamics: Dynamics
	export default dynamics
}
