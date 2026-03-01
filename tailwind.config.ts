import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Colors ───────────────────────────────────────────────
      colors: {
        background: '#FBFBFB',
        primary:    '#1A1A1A',
      },

      // ─── Typography ───────────────────────────────────────────
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body:    ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        // Desktop
        'h1':       ['56px', { lineHeight: '1.1', fontWeight: '400' }],
        'h2':       ['28px', { lineHeight: '1.2', fontWeight: '400' }],
        'nav':      ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body':     ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm':  ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        // Mobile
        'h1-mobile': ['28px', { lineHeight: '1.2', fontWeight: '400' }],
        'h2-mobile': ['18px', { lineHeight: '1.3', fontWeight: '400' }],
      },

      // ─── Spacing ──────────────────────────────────────────────
      spacing: {
        'page':        '48px',  // Desktop outer padding
        'page-mobile': '20px',  // Mobile outer padding
      },

      // ─── Breakpoints (Tailwind defaults, documented for reference) ─
      // sm:  640px  – not critical for this portfolio
      // md:  768px  – Navigation horizontal, About layout side-by-side
      // lg:  1024px – Series grid switches to 2 columns
      // xl:  1280px – (Tailwind default, design reference: 1440px)
    },
  },
  plugins: [],
}

export default config
