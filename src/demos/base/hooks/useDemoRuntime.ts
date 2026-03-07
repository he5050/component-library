import { useCallback, useEffect, useRef } from "react"

type CleanupHandler = () => void

function runSafely(handler: CleanupHandler) {
	try {
		handler()
	} catch {
		// 清理阶段不抛出异常，避免影响卸载流程
	}
}

/** 管理 demo 的运行会话、定时器和清理逻辑。 */
export function useDemoRuntime() {
	const runIdRef = useRef(0)
	const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([])
	const cleanupRefs = useRef<CleanupHandler[]>([])

	/** 判断指定 runId 是否仍为当前有效会话。 */
	const isRunActive = useCallback((runId: number) => {
		return runIdRef.current === runId
	}, [])

	/** 注册清理函数，在切换 run 或卸载时统一执行。 */
	const addCleanup = useCallback((cleanup: CleanupHandler) => {
		cleanupRefs.current.push(cleanup)
	}, [])

	/** 清理当前 run 的定时器和回调。 */
	const clearRunResources = useCallback(() => {
		timerRefs.current.forEach((timer) => clearTimeout(timer))
		timerRefs.current = []

		const cleanupList = cleanupRefs.current
		cleanupRefs.current = []
		cleanupList.forEach((cleanup) => runSafely(cleanup))
	}, [])

	/** 开启新的 run，会自动清理旧 run 资源。 */
	const beginRun = useCallback(() => {
		runIdRef.current += 1
		clearRunResources()
		return runIdRef.current
	}, [clearRunResources])

	/** 主动结束当前 run。 */
	const stopRun = useCallback(() => {
		runIdRef.current += 1
		clearRunResources()
	}, [clearRunResources])

	/** 创建仅在指定 run 有效时才触发的定时器。 */
	const setRunTimer = useCallback((runId: number, callback: () => void, delay: number) => {
		const timer = setTimeout(() => {
			if (!isRunActive(runId)) return
			callback()
		}, delay)
		timerRefs.current.push(timer)
		return timer
	}, [isRunActive])

	useEffect(() => {
		return () => stopRun()
	}, [stopRun])

	return {
		isRunActive,
		addCleanup,
		clearRunResources,
		beginRun,
		stopRun,
		setRunTimer,
	}
}
