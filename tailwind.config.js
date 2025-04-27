/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#9D4EDD', // Light purple
          400: '#7B2CBF', // Medium purple
          500: '#5A189A', // Deep purple
          600: '#3C096C', // Dark purple
          700: '#240046', // Very dark purple
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          background: '#0F0F1A', // Dark blue-black
          card: '#1A1A2E', // Dark blue-purple
          input: '#252538', // Dark purple-gray
          border: '#2D2D44', // Purple-gray border
          text: '#F5F5F5',
        },
        neon: {
          purple: '#B14AED', // Bright neon purple
          pink: '#FF00FF',   // Neon pink
          blue: '#00FFFF',   // Neon blue
          glow: '#9D4EDD80', // Transparent purple for glows
        }
      },
      animation: {
        'shine': 'shine 1.5s infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 15px rgba(14, 165, 233, 0.5)',
      },
    },
  },
  plugins: [],
}
