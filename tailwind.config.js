/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
        alt: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          50: '#f8f8ff',
          100: '#f0f0ff',
          200: '#e6e6ff',
          300: '#d4d4ff',
          400: '#b8b8ff',
          500: '#9090ff',
          600: '#6b68ff',
          700: '#5555ff',
          800: '#1a1a2e',
          900: '#0f0f1e',
          950: '#050510'
        },
        neon: {
          50: '#f0f9ff',
          100: '#e0f7ff',
          200: '#baf3ff',
          300: '#7eebff',
          400: '#43e4ff',
          500: '#0dd9ff',
          600: '#00b4d8',
          700: '#0096c7',
          800: '#0077b6',
          900: '#005a8d',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f8a5d8',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be123c',
          800: '#9d174d',
          900: '#831843',
        }
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'neon': '0 0 20px rgba(13, 217, 255, 0.5)',
        'neon-lg': '0 0 40px rgba(13, 217, 255, 0.3)',
        'glow': '0 0 30px rgba(107, 104, 255, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(13, 217, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(13, 217, 255, 0.8)' },
        },
      },
    }
  },
  plugins: []
}
