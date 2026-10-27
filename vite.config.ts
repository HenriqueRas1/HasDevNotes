import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminho onde o site fica publicado. No GitHub Pages é "/HasDevNotes/"
  // (definido no workflow); em desenvolvimento continua sendo a raiz "/".
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    // "@/..." aponta para "src/...": evita imports como "../../../components"
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
