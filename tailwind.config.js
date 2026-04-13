/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        'cool-gray': '#8E8E93',
        'brand-cyan': '#00E5FF',
        'brand-purple': '#B520FF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(to right, #00E5FF, #B520FF)',
      }
    }
  },
  plugins: [],
}
