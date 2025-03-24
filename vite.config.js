import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import htmlMinifier from 'vite-plugin-html-minifier'
import { fileURLToPath } from 'node:url'

/** @type {import('vite').UserConfig} */
export default {
  base: '/em-sign-in-form/',
  plugins: [htmlMinifier({ minify: true })],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      cssModules: true,
      drafts: {
        customMedia: true,
        nesting: true,
      },
      targets: browserslistToTargets(browserslist()),
    },
  },
  build: {
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
}
