import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import UnoCSS from "unocss/vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const port = parseInt(env.PREVIEW_PORT || "6677", 10)

  return {
    plugins: [react(), UnoCSS()],
    server: {
      port,
    },
    preview: {
      port,
    },
    build: {
      outDir: "dist",
    },
  }
})
