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
      // ==================== 基础层：水墨五色（60%）====================
      ink: {
        DEFAULT: "#1a1917",
        deep: "#1a1917", // 焦墨 - 主文字、标题
        thick: "#33312c", // 浓墨 - 次要文字、边框
        medium: "#63605a", // 重墨 - 辅助文字
        light: "#8a877e", // 淡墨 - 占位符、分割线（不满足 AA 对比度，仅装饰性文字）
        pale: "#f5f5f0", // 清墨 - 背景色（宣纸色）
        // 完整色阶（暖灰色温）
        50: "#fafaf7",
        100: "#f5f5f0",
        200: "#e8e6e0",
        300: "#d1cec6",
        400: "#a8a59c",
        500: "#8a877e",
        600: "#63605a",
        700: "#4a4740",
        800: "#33312c",
        900: "#1a1917",
      },
      // ==================== 宣纸色系（辅助色 30%）====================
      paper: {
        DEFAULT: "#f5f5f0",
        warm: "#faf8f3",
        aged: "#f0ebe0",
        cool: "#f2f4f5",
        deep: "#eae9e4",
      },
      // ==================== 红色系 - 朱砂（强调色 10%，限制使用）====================
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
        DEFAULT: "#c04851", // 朱砂 - 仅关键强调
        light: "#db5a6b", // 海棠
        dark: "#a03a42",
      },
      haitang: "#db5a6b", // 海棠红
      yanzhi: "#c35c67", // 胭脂 - 危险状态
      wan: "#a98175", // 绾色
      seal: "#b93a3a", // 印章红
      // ==================== 蓝色系 - 链接专用 ====================
      dian: "#1772b4", // 靛青 - 链接、信息
      yadan: "#b0d4d1", // 鸭卵青
      hulan: "#25b4c8", // 湖蓝 - 链接悬停
      link: {
        DEFAULT: "#1772b4",
        hover: "#25b4c8",
      },
      // ==================== 绿色系 - Focus 专用 ====================
      zhu: "#789262", // 竹青 - 成功
      qingbi: "#48c0a3", // 青碧 - Focus 状态
      songhua: "#057748", // 松花
      focus: {
        DEFAULT: "#48c0a3",
        ring: "rgba(72, 192, 163, 0.3)",
      },
      // ==================== 黄色系 ====================
      xiang: "#f0c239", // 缃色
      amber: "#ca6924", // 琥珀 - 警告
      qiuxiang: "#d9b611", // 秋香
      // ==================== 紫色系 ====================
      dingxiang: "#cca4e3", // 丁香
      xueqing: "#b0a4e3", // 雪青
      ouhe: "#8b6fad", // 藕荷
      // ==================== 灰色系（水墨延伸）====================
      dai: "#41555d", // 黛色
      mogray: "#50616d", // 墨色
      cang: "#8a9aa4", // 苍色
      // ==================== 棕色系 ====================
      tan: "#b0905d", // 檀色
      tuo: "#a88e6a", // 驼色
      cha: "#b35c44", // 茶色
      zitan: "#4c1f24", // 紫檀（暗红棕）
      // ==================== 白色系 ====================
      yuebai: "#d6ecf0", // 月白
      shuang: "#e9f1f6", // 霜色
      su: "#f0f0f0", // 素色
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
      display: ['"LXGW WenKai"', '"Noto Serif SC"', "Georgia", "serif"],
      body: ['"Noto Sans SC"', '"PingFang SC"', "system-ui", "sans-serif"],
      mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      headline: ['"Ma Shan Zheng"', "cursive"],
    },
    // ==================== 圆角系统 ====================
    borderRadius: {
      none: "0",
      sm: "4px", // 徽章、小标签
      DEFAULT: "8px", // 按钮
      md: "12px", // 输入框
      lg: "16px", // 卡片
      xl: "20px", // 弹窗
      "2xl": "24px", // 大容器
      full: "9999px", // 全圆角
      // 特色圆角 - 模拟墨迹边缘
      ink: "8px",
      "ink-sm": "4px 8px 6px 10px",
      "ink-md": "8px 16px 12px 18px",
      "ink-lg": "16px 24px 20px 28px",
      "ink-xl": "24px",
    },
    // ==================== 阴影系统 ====================
    boxShadow: {
      // 标准阴影
      xs: "0 1px 2px rgba(26, 26, 26, 0.04)",
      sm: "0 2px 4px rgba(26, 26, 26, 0.06)",
      DEFAULT: "0 4px 8px rgba(26, 26, 26, 0.08)",
      md: "0 4px 8px rgba(26, 26, 26, 0.08)",
      lg: "0 8px 16px rgba(26, 26, 26, 0.1)",
      xl: "0 16px 32px rgba(26, 26, 26, 0.12)",
      "2xl": "0 24px 48px rgba(26, 26, 26, 0.15)",
      inner: "inset 0 2px 4px rgba(26, 26, 26, 0.08)",
      // 水墨晕染阴影
      ink: "0 2px 8px rgba(26, 26, 26, 0.04), 0 8px 24px rgba(26, 26, 26, 0.06), 0 16px 48px rgba(26, 26, 26, 0.04)",
      "ink-hover": "0 4px 12px rgba(26, 26, 26, 0.06), 0 12px 32px rgba(26, 26, 26, 0.08)",
      "ink-float": "0 8px 24px rgba(26, 26, 26, 0.15)",
      "ink-glow": "0 0 0 1px rgba(192, 72, 81, 0.1), 0 4px 16px rgba(192, 72, 81, 0.08)",
      "ink-card": "0 1px 3px rgba(26, 26, 26, 0.04), 0 3px 12px rgba(26, 26, 26, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      "ink-card-hover": "0 4px 12px rgba(26, 26, 26, 0.08), 0 8px 28px rgba(26, 26, 26, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      "ink-seal": "0 2px 4px rgba(192, 72, 81, 0.25)",
      // Focus 发光 - 青碧色
      "ink-focus": "0 0 0 2px rgba(72, 192, 163, 0.3)",
      "ink-input-focus": "0 0 0 3px rgba(72, 192, 163, 0.15)",
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
    // ==================== 基础工具类 ====================
    "btn-ink-base":
      "inline-flex items-center justify-center rounded-ink font-body font-medium transition-all duration-200 focus:outline-none disabled:opacity-45 disabled:pointer-events-none cursor-pointer select-none",
    "text-ink": "text-ink-deep",
    "text-ink-muted": "text-ink-medium",
    "text-ink-light": "text-ink-light",
    "bg-paper": "bg-paper",
    "border-ink": "border-ink/10",
    "border-ink-hover": "hover:border-ink/20",

    // ==================== 链接样式 ====================
    "link-ink": "text-link hover:text-link-hover underline-offset-2 hover:underline transition-colors duration-200",

    // ==================== Focus 状态 ====================
    "focus-ink": "focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper",

    // ==================== 卡片与容器 ====================
    "ink-card":
      "bg-paper rounded-lg border border-ink/8 shadow-ink-card transition-all duration-300 relative overflow-hidden hover:shadow-ink-card-hover hover:-translate-y-0.5 hover:border-zhusha/15",
    "ink-card-elevated": "bg-paper rounded-xl border border-ink/6 shadow-ink-float transition-all duration-300 relative overflow-hidden hover:shadow-ink-hover hover:-translate-y-1",
    "ink-panel": "bg-paper-warm rounded-ink border border-ink/5 p-6",

    // ==================== 分割线 ====================
    "ink-divider": "h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent relative",
    "ink-divider-brush": "h-0.5 bg-gradient-to-r from-transparent via-ink-medium to-transparent opacity-60 my-8",

    // ==================== 渐变背景 ====================
    "ink-gradient-v": "bg-gradient-to-b from-ink/5 to-transparent",
    "ink-gradient-h": "bg-gradient-to-r from-transparent via-ink/5 to-transparent",
    "ink-wash": "bg-gradient-radial from-ink/4 via-transparent to-transparent",
    "ink-wash-center": "bg-radial-gradient(circle at center, rgba(26,26,26,0.03) 0%, transparent 70%)",

    // ==================== 印章与标签 ====================
    "ink-seal":
      "inline-flex items-center justify-center px-3 py-1 bg-gradient-to-br from-seal to-vermilion text-white font-display text-xs font-semibold tracking-wider rounded shadow-ink-seal relative overflow-hidden",
    "ink-seal-outline": "inline-flex items-center justify-center px-3 py-1 bg-transparent text-seal font-display text-xs font-semibold tracking-wider rounded border-1.5 border-seal",
    "ink-tag": "inline-flex items-center px-2.5 py-0.5 bg-ink-pale/50 text-ink-medium text-xs rounded-full border border-ink/5",

    // ==================== 输入框 ====================
    "ink-input":
      "bg-paper-warm border border-ink/10 rounded-ink px-4 py-3 font-body text-ink-deep placeholder:text-ink-light transition-all duration-200 outline-none hover:bg-paper hover:border-ink/15 focus:border-focus focus:shadow-ink-input-focus focus:bg-paper",
    "ink-input-ghost": "bg-transparent border-b-2 border-ink/10 px-1 py-2 font-body text-ink-deep placeholder:text-ink-light transition-all duration-200 outline-none hover:border-ink/20 focus:border-focus",

    // ==================== 文字排版 ====================
    "ink-title": "font-display font-bold text-ink-deep tracking-wide",
    "ink-subtitle": "font-display font-semibold text-ink-thick",
    "ink-body": "font-body text-ink-thick leading-relaxed",
    "ink-caption": "font-display text-sm text-ink-medium italic",
    "ink-vertical": "writing-mode-vertical-rl text-orientation-mixed tracking-widest",

    // ==================== 交互效果 ====================
    "shadow-ink-hover": "hover:shadow-ink-hover hover:-translate-y-0.5",
    "ink-float": "transition-all duration-300 hover:-translate-y-1 hover:shadow-ink-float",
    "ink-press": "active:translate-y-0 active:shadow-inner transition-all duration-75",
    "ink-hover-lift": "transition-transform duration-300 hover:-translate-y-0.5",

    // ==================== 边框装饰 ====================
    "ink-border-soft": "border border-ink/6",
    "ink-border-medium": "border border-ink/10",
    "ink-border-strong": "border border-ink/15",

    // ==================== 状态 ====================
    "ink-disabled": "opacity-45 pointer-events-none",
    "ink-loading": "relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer",
  },
  rules: [
    [
      "ink-texture",
      {
        "background-image":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        "background-size": "200px 200px",
        opacity: "0.03",
      },
    ],
    [
      "ink-wash",
      {
        background: "radial-gradient(ellipse at center, rgba(26,26,26,0.03) 0%, transparent 70%)",
      },
    ],
  ],
})
