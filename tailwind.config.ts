import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1C1C1C',
        ivory: '#F5F0E8',
        maroon: '#7B2D2D',
        gold: '#B8860B',
        'warm-neutral': '#D4C4B0',
        'charcoal-light': '#2D2D2D',
        'ivory-dark': '#E8E0D0',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config