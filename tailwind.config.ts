import {
  pg_colors,
  pg_fonts,
  pg_backgrounds,
} from './themes/pg-tailwindcss/tokens.mjs'

import { getFontsWithFallback } from './utils/font'
import { safelist } from './utils/colors'
import { tailwindConfig } from '@storefront-ui/vue/tailwind-config'

export default {
  presets: [tailwindConfig],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@pinegrow/tailwindcss-plugin').default({
      colors: pg_colors, // primary, secondary etc
      fonts: getFontsWithFallback(pg_fonts),
      backgrounds: pg_backgrounds, // bg-design-image, bg-design-image-large
    }),
  ],

  safelist,

  get content() {
    const _content = [
      '{.,*-layer}/components/**/*.{js,vue,ts}',
      '{.,*-layer}/layouts/**/*.vue',
      '{.,*-layer}/pages/**/*.vue',
      '{.,*-layer}/plugins/**/*.{js,ts}',
      '{.,*-layer}/nuxt.config.{js,ts}',
      '{.,*-layer}/app.vue',
      '{.,*-layer}/*.{mjs,js,ts}',
      './node_modules/@storefront-ui/vue/**/*.{js,mjs}',
    ]
    return process.env.NODE_ENV === 'production'
      ? _content
      : [..._content, './_pginfo/**/*.{html,js}'] // used by Vue Desginer for live-designing during development
  },
}
