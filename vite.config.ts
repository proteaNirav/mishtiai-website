import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { createIntakeMiddleware } from './scripts/local-intake-middleware.mjs'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function localIntakeApi() {
  return {
    name: 'local-intake-api',
    configureServer(server) {
      server.middlewares.use(createIntakeMiddleware())
    },
    configurePreviewServer(server) {
      server.middlewares.use(createIntakeMiddleware())
    },
  }
}

export default defineConfig({
  build: {
    // Isolated checks set PAGES_DIST so they do not overwrite tracked leftover dist/.
    outDir: process.env.PAGES_DIST?.trim() || "dist",
    emptyOutDir: true,
  },
  plugins: [
    figmaAssetResolver(),
    localIntakeApi(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
