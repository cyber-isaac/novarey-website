import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three'],
          'vendor-globe': ['globe.gl', 'three-globe'],
          'vendor-gsap': ['gsap'],
          'vendor-motion': ['framer-motion'],
        }
      }
    }
  }
})
