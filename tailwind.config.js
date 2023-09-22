/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors
      colors: {
        primary: {
          DEFAULT: '#1F2937',
          dark: '#111827',
          light: '#3B4252'
        },
        secondary: {
          DEFAULT: '#3F83F8',
          dark: '#1E40AF',
          light: '#60A5FA'
        }
      },

      // Typography
      fontFamily: {
        sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },

      // Spacing
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },

      // Background Images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      // Other utilities
      borderRadius: {
        'xl': '1rem',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['active'],
      textColor: ['active']
    }
  },
  plugins: [],
}
