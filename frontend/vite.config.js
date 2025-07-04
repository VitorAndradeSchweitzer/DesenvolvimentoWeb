import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://backend-796l.onrender.com',
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  base: '/'
})