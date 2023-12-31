import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.SERVER_IP,
    port: process.env.SERVER_PORT,
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: process.env.API_SERVER_URL,
        changeOrigin: true,
        secure: false,
      }
    },
    cors: false
  }
})
