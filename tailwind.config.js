/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
      },
      colors: {
        primary: '#dc2626',    // Bright red
        secondary: '#ef4444',  // Light red
        accent: '#3b82f6',     // Keeping blue as accent
        dark: '#000000',
        'dark-gray': '#1a1818',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'data-stream': 'dataStream 3s linear infinite',
        'schema-pulse': 'schemaPulse 4s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        dataStream: {
          '0%': { strokeDashoffset: 20 },
          '100%': { strokeDashoffset: 0 }
        },
        schemaPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
          '50%': { transform: 'scale(1.02)', opacity: 1 }
        }
      },
    },
  },
  plugins: [],
} 