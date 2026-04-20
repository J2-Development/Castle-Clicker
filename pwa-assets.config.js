import { defineConfig } from '@vite-pwa/assets-generator/config'

// Match the manifest's background_color so masked icons (Android adaptive,
// iOS home screen) blend into the artwork instead of showing a white frame.
const BG = '#2a1a10'

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[48, 'favicon.ico']],
    },
    maskable: {
      sizes: [512],
      padding: 0.3,
      resizeOptions: { background: BG, fit: 'contain' },
    },
    apple: {
      sizes: [180],
      padding: 0.3,
      resizeOptions: { background: BG, fit: 'contain' },
    },
  },
  images: ['public/castle-crest.svg'],
})
