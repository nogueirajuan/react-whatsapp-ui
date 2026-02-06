/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          light: '#ECE5DD',
          bg: '#F0F0F0',
          text: '#111B21',
          sent: '#E1FFC7',
          received: '#FFFFFF',
          primary: '#25D366',
          secondary: '#128C7E',
        }
      }
    },
  },
  plugins: [],
}
