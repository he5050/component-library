declare module "@barba/core" {
	export interface BarbaData {
		current: {
			namespace: string
			url: {
				href: string
				path: string
			}
		}
		next: {
			namespace: string
			url: {
				href: string
				path: string
			}
		}
		trigger: string | HTMLElement
		
	}

	export interface BarbaTransition {
		name?: string
		to?: {
			namespace?: string | string[]
		}
		from?: {
			namespace?: string | string[]
		}
		leave?: (data: BarbaData) => Promise<void> | void
		enter?: (data: BarbaData) => Promise<void> | void
		once?: (data: BarbaData) => Promise<void> | void
		after?: (data: BarbaData) => Promise<void> | void
		before?: (data: BarbaData) => Promise<void> | void
		beforeLeave?: (data: BarbaData) => Promise<void> | void
		afterEnter?: (data: BarbaData) => Promise<void> | void
	}

	export interface BarbaHooks {
		before?: (data: BarbaData) => void
		after?: (data: BarbaData) => void
		beforeLeave?: (data: BarbaData) => void
		afterLeave?: (data: BarbaData) => void
		beforeEnter?: (data: BarbaData) => void
		afterEnter?: (data: BarbaData) => void
	}

	export interface BarbaConfig {
		transitions?: BarbaTransition[]
		views?: Array<{
			namespace: string
			beforeEnter?: (data: BarbaData) => void
			afterEnter?: (data: BarbaData) => void
			beforeLeave?: (data: BarbaData) => void
			afterLeave?: (data: BarbaData) => void
		}>
		schema?: {
			prefix?: string
			wrapper?: string
			container?: string
		}
		debug?: boolean
		logLevel?: "debug" | "info" | "warn" | "error" | "off"
		prefetchIgnore?: boolean
		preventRunning?: boolean
		timeout?: number
		cacheIgnore?: boolean | string[]
		sync?: boolean
		transitionsIgnore?: string
	}

	export interface BarbaCore {
		init(config?: BarbaConfig): void
		destroy(): void
		hooks: BarbaHooks
		data: BarbaData | null
		history: {
			add(url: string, transition: string): void
			current: string
			previous: string | null
		}
		prefetch(href: string): Promise<void>
		go(href: string, trigger?: string, e?: Event): Promise<void>
	}

	const barba: BarbaCore
	export default barba
}
