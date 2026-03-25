import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/pride-driving-school/' : '/',
  server: {
    host: true,
    watch: {
      usePolling: true,
    }
  }
})
