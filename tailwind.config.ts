import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#3BBFBF',
          dark: '#1A2E2E',
          mid: '#2A9D8F',
          light: '#E8F7F7',
          deeper: '#264653',
        },
        pink: {
          DEFAULT: '#E8197D',
          dark: '#C41469',
          light: '#FF4DA6',
        },
        navy: {
          DEFAULT: '#090C17',
          card: '#111628',
          elevated: '#1A2140',
          border: '#1E2545',
        },
        'warm-white': '#F8F6F2',
      },
      fontFamily: {
        display: ['var(--font-barlow)', 'sans-serif'],
        body: ['var(--font-dm)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
