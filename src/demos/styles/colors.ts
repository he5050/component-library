/**
 * Demo 专用颜色常量
 * 基于水墨禅意设计规范
 * 使用方式: import { COLORS } from "../styles/colors"
 */

/** 国风配色常量 */
export const COLORS = {
	// 水墨五色
	zhusha: "#c83c3c", // 朱砂 - 主强调
	songyan: "#8b4513", // 松烟 - 边框
	xuanzhi: "#faf8f5", // 宣纸白 - 背景
	daiqing: "#4a6741", // 黛青 - 成功
	zhushi: "#d4a574", // 朱色 - 辅助
	moshi: "#2c2c2c", // 墨色 - 深色
	cangshan: "#5c6b73", // 苍山 - 冷灰
	yunhui: "#8b8680", // 晕灰 - 浅灰
	jin: "#d4a017", // 金色 - 强调

	// 语义色
	link: "#1772b4", // 链接色 (靛青)
	success: "#789262", // 成功色 (竹青)
	warning: "#ca6924", // 警告色 (琥珀)
	danger: "#c35c67", // 危险色 (胭脂)
}

/** 背景渐变配置 */
export const BACKGROUNDS = {
	// 宣纸渐变
	paper: "linear-gradient(180deg, #faf8f5 0%, #f5f0e8 100%)",
	paperWarm: "linear-gradient(135deg, #faf8f5, #f5f0e8)",
	paperCool: "linear-gradient(135deg, #faf8f5, #f0f4f5)",

	// 禁用渐变
	disabled: "linear-gradient(180deg, #e8e6e0 0%, #dcdad4 100%)",
}

/** 阴影配置 */
export const SHADOWS = {
	// 标准阴影
	sm: "0 1px 2px rgba(26, 26, 26, 0.04)",
	md: "0 2px 4px rgba(26, 26, 26, 0.06)",
	lg: "0 4px 8px rgba(26, 26, 26, 0.08)",

	// 国风阴影
	ink: "0 2px 8px rgba(26, 26, 26, 0.04), 0 8px 24px rgba(26, 26, 26, 0.06)",
	inkHover: "0 4px 12px rgba(26, 26, 26, 0.06), 0 12px 32px rgba(26, 26, 26, 0.08)",

	// 强调阴影
	zhusha: "0 4px 16px rgba(200, 60, 60, 0.15)",
	zhushaHover: "0 8px 24px rgba(200, 60, 60, 0.2)",
}

/** 边框配置 */
export const BORDERS = {
	light: "1px solid rgba(26, 26, 26, 0.08)",
	medium: "1px solid rgba(26, 26, 26, 0.12)",
	heavy: "1px solid rgba(26, 26, 26, 0.2)",
}

/**
 * 快速获取带透明度的颜色
 * @param hex - 十六进制颜色
 * @param opacity - 透明度 (0-100)
 * @returns rgba 颜色字符串
 */
export function withOpacity(hex: string, opacity: number): string {
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)
	return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
}

export default COLORS