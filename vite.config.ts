import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'pasteme',
    sourcemap: false,
  },
  server: {
    proxy: {
      '/api/v3/': {
        target: 'http://beta.pasteme.lucien.ink/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
