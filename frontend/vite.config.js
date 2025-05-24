import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      https: !isProduction ? {
        key: fs.readFileSync(path.resolve(__dirname, '../backend/certs/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '../backend/certs/cert.pem')),
      } : false,
      proxy: {
        '/api': {
          target: isProduction 
            ? 'https://your-production-backend-url.com' // You'll need to change this
            : 'https://localhost:3000',
          secure: isProduction,
          changeOrigin: true
        }
      }
    },
    define: {
      'process.env.VITE_API_URL': JSON.stringify(
        isProduction 
          ? 'https://your-production-backend-url.com'  // You'll need to change this
          : 'https://localhost:3000'
      )
    }
  }
})
