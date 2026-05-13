import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import fs from 'node:fs'
import path from 'node:path'

const outDir = path.resolve(process.cwd(), 'dist')

const prunePublicArtifacts = () => ({
  name: 'prune-public-artifacts',
  apply: 'build',
  enforce: 'post',
  closeBundle() {
    const targets = [
      'documentation',
      'main-files',
      'globe.gl-master',
      'index-4.html',
      'index-4.md',
      'globecopy.txt',
      'globe_portfolio_transition.txt',
      'iteractiveview.txt',
      'particlesim.txt',
      'ODAbaby.jpg',
      'mebannerport.png',
      'aiservices_image.png',
      'mestandingbw.png',
      'portfolio/DesignPortfolio11.png',
      'portfolio/DesignPortfolio12.png',
      'portfolio/DesignPortfolio17.png',
      'portfolio/DesignPortfolio7.png',
      'portfolio/DesignPortfolio9.png',
      'portfolio/DesignPortfolio10.png',
      'portfolio/DesignPortfolio14.png',
      'portfolio/DesignPortfolio16.png',
      '2010_mewithmalim.png',
      'meafghanSFguys.png',
      'isaac-portrait.png',
    ]

    for (const target of targets) {
      fs.rmSync(path.join(outDir, target), { force: true, recursive: true })
    }
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prunePublicArtifacts(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
  ],
  build: {
    outDir,
    cssCodeSplit: true,
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((dep) => !dep.includes('vendor-three') && !dep.includes('vendor-globe')),
    },
    reportCompressedSize: false,
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-gsap': ['gsap'],
          'vendor-motion': ['framer-motion'],
          'vendor-globe': ['globe.gl'],
        }
      }
    }
  }
})
