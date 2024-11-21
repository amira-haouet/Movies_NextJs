/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
    './app/**/*.{js,ts,jsx,tsx}' 
    
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', 
        
        foreground: 'var(--foreground)',
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
};
