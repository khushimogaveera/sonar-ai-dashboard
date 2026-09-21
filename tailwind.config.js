/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        abyss: {
          950: '#050b14',
          900: '#0a1420',
          850: '#0d1a29',
          800: '#11223333',
          700: '#16283a',
          600: '#1d3348',
        },
        depth: {
          900: '#0a1420',
          800: '#0f1c2c',
          700: '#152740',
          600: '#1c3350',
        },
        sonar: {
          400: '#5fd8e8',
          500: '#33c1d6',
          600: '#1ea3b8',
          glow: '#7ff0ff',
        },
        signal: {
          amber: '#e8a33d',
          red: '#e85d4f',
          green: '#3ddc97',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(95, 216, 232, 0.25)',
      },
      backgroundImage: {
        'sonar-sweep': 'radial-gradient(circle at 50% 50%, rgba(95,216,232,0.12), transparent 60%)',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 },
        },
      },
      animation: {
        sweep: 'sweep 4s linear infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
