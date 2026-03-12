import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src/renderer',
  base: '/nakladovy-controlling/',
  build: {
    outDir: '../../dist-web',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src'),
    },
  },
})