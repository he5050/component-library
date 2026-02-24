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
      primary: {
        DEFAULT: "#4F46E5",
        50: "#EEF2FF",
        100: "#E0E7FF",
        200: "#C7D2FE",
        300: "#A5B4FC",
        400: "#818CF8",
        500: "#6366F1",
        600: "#4F46E5",
        700: "#4338CA",
        800: "#3730A3",
        900: "#312E81",
      },
      cta: "#F97316",
      success: "#16A34A",
      warning: "#F59E0B",
      danger: "#DC2626",
    },
    fontFamily: {
      display: ["Space Grotesk", "system-ui", "sans-serif"],
      body: ["DM Sans", "system-ui", "sans-serif"],
    },
  },
  shortcuts: {
    "btn-base": "inline-flex items-center justify-center rounded-lg font-body font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
    "text-balance": "text-wrap-balance",
  },
})
