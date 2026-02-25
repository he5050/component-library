import { defineConfig, presetUno, presetAttributify, presetIcons } from "unocss"

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      // ==================== 基础层：水墨五色 ====================
      ink: {
        DEFAULT: "#1a1a1a",
        deep: "#1a1a1a",      // 焦墨
        thick: "#333333",     // 浓墨
        medium: "#666666",    // 重墨
        light: "#999999",     // 淡墨
        pale: "#f5f5f0",      // 清墨
        50: "#fafaf7",
        100: "#f5f5f0",
        200: "#e8e8e3",
        300: "#d4d4cc",
        400: "#b3b3a8",
        500: "#999999",
        600: "#666666",
        700: "#4d4d4d",
        800: "#333333",
        900: "#1a1a1a",
      },
      // ==================== 红色系 ====================
      vermilion: {
        DEFAULT: "#c04851",
        light: "#e8d4d4",
        dark: "#a03a42",
        50: "#fdf5f5",
        100: "#fae8e8",
        200: "#f0d4d4",
        300: "#e8c0c0",
        400: "#d4888f",
        500: "#c04851",
        600: "#a03a42",
        700: "#802d33",
        800: "#602026",
        900: "#401519",
      },
      zhusha: {
        DEFAULT: "#c04851",   // 朱砂
        light: "#db5a6b",     // 海棠
        dark: "#a03a42",
      },
      haitang: "#db5a6b",     // 海棠红
      yanzhi: "#c35c67",      // 胭脂
      wan: "#a98175",         // 绾色
      // ==================== 蓝色系 ====================
      dian: "#1772b4",        // 靛青
      yadan: "#b0d4d1",       // 鸭卵青
      hulan: "#25b4c8",       // 湖蓝
      // ==================== 绿色系 ====================
      zhu: "#789262",         // 竹青
      qingbi: "#48c0a3",      // 青碧
      songhua: "#057748",     // 松花
      // ==================== 黄色系 ====================
      xiang: "#f0c239",       // 缃色
      amber: "#ca6924",       // 琥珀
      qiuxiang: "#d9b611",    // 秋香
      // ==================== 紫色系 ====================
      dingxiang: "#cca4e3",   // 丁香
      xueqing: "#b0a4e3",     // 雪青
      zitan: "#4c1f24",       // 紫檀
      // ==================== 灰色系（水墨延伸） ====================
      dai: "#41555d",         // 黛色
      mogray: "#50616d",      // 墨色
      cang: "#8a9aa4",        // 苍色
      // ==================== 棕色系 ====================
      tan: "#b0905d",         // 檀色
      tuo: "#a88e6a",         // 驼色
      cha: "#b35c44",         // 茶色
      // ==================== 白色系 ====================
      yuebai: "#d6ecf0",      // 月白
      shuang: "#e9f1f6",      // 霜色
      su: "#f0f0f0",          // 素色
      // ==================== 宣纸色 ====================
      paper: {
        DEFAULT: "#f5f5f0",
        warm: "#faf8f3",
        aged: "#f0ebe0",
      },
      // ==================== 语义色 ====================
      info: {
        DEFAULT: "#1772b4",
        light: "#b0d4d1",
      },
      success: {
        DEFAULT: "#789262",
        light: "#48c0a3",
      },
      warning: {
        DEFAULT: "#ca6924",
        light: "#f0c239",
      },
      danger: {
        DEFAULT: "#c35c67",
        light: "#db5a6b",
      },
      accent: {
        DEFAULT: "#c04851",
        light: "#db5a6b",
      },
    },
    fontFamily: {
      display: ['"LXGW WenKai"', '"Crimson Pro"', "Georgia", "serif"],
      body: ['"Source Han Sans SC"', '"Noto Sans SC"', "system-ui", "sans-serif"],
      mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
    },
    borderRadius: {
      ink: "8px",
      "ink-lg": "16px",
      "ink-xl": "24px",
    },
    boxShadow: {
      ink: "0 2px 8px rgba(26,26,26,0.08)",
      "ink-hover": "0 4px 16px rgba(26,26,26,0.12)",
      "ink-float": "0 8px 24px rgba(26,26,26,0.15)",
      "ink-glow": "0 0 0 2px rgba(192,72,81,0.2)",
    },
    animation: {
      "ink-spread": "ink-spread 0.3s ease-out",
      "ink-fade": "ink-fade 0.2s ease-in-out",
      "ink-float": "ink-float 0.3s ease-out",
    },
    keyframes: {
      "ink-spread": {
        "0%": { transform: "scale(0.95)", opacity: "0.8" },
        "100%": { transform: "scale(1)", opacity: "1" },
      },
      "ink-fade": {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.7" },
      },
      "ink-float": {
        "0%": { transform: "translateY(0)" },
        "100%": { transform: "translateY(-2px)" },
      },
    },
  },
  shortcuts: {
    "btn-ink-base": "inline-flex items-center justify-center rounded-ink font-body font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
    "text-ink": "text-ink-deep",
    "text-ink-muted": "text-ink-medium",
    "text-ink-light": "text-ink-light",
    "bg-paper": "bg-paper",
    "border-ink": "border-ink/10",
    "shadow-ink-hover": "hover:shadow-ink-hover hover:-translate-y-0.5",
    "ink-card": "bg-paper rounded-ink-lg border border-ink/10 shadow-ink transition-all duration-200",
    "ink-divider": "h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent",
    "ink-gradient-v": "bg-gradient-to-b from-ink/5 to-transparent",
    "ink-gradient-h": "bg-gradient-to-r from-transparent via-ink/5 to-transparent",
  },
  rules: [
    ["ink-texture", {
      "background-image": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      "background-size": "200px 200px",
      "opacity": "0.03",
    }],
    ["ink-wash", {
      "background": "radial-gradient(ellipse at center, rgba(26,26,26,0.03) 0%, transparent 70%)",
    }],
  ],
})
