import { defineConfig, fontProviders } from 'astro/config'

import react from '@astrojs/react'

export default defineConfig({
  output: 'static',
  integrations: [react()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Source Code Pro',
      cssVariable: '--font-source-code-pro',
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
})
