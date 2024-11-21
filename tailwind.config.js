/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Assurez-vous que le mode sombre est activé
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Pour les fichiers dans le dossier "pages"
    './components/**/*.{js,ts,jsx,tsx}', // Pour les composants
    './app/**/*.{js,ts,jsx,tsx}' // Si vous utilisez le dossier "app"
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', // Assurez-vous de déclarer vos couleurs personnalisées
        foreground: 'var(--foreground)',
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
};
