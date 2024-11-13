import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@advanced-ambition/core']
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [/^@advanced-ambition\/core/]
    }
  }
})