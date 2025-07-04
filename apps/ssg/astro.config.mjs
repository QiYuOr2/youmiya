import { resolve } from 'node:path'
import react from '@astrojs/react'
// @ts-check
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    UnoCSS({
      injectReset: true,
      content: {
        pipeline: {
          include: [
            './src/**/*.{astro,tsx,jsx,vue}',
            '../packages/ui/**/*.{tsx,jsx,vue}',
          ],
        },
      },
    }),
  ],

  vite: {
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
  },
})
