/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gloria: ['"Gloria Hallelujah"', 'cursive'],
        lacquer: ['"Lacquer"', 'sans-serif'],
        Monoton:['"Monoton"', 'sans-serif'],
        Roboto:['"Roboto"', 'sans-serif']

      },
      colors: {
        roxo: '#c25cd8',  
        dourado: '#ffff00', 
        vermelho: '#ff0055', 
        rosa:"#ff335e"  
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #c25cd8, #8e44ad)',
        'custom-gradient-black': 'linear-gradient(to right, black 0%, #1a1a1a 50%, #333333 80%)',
      },
  },
  plugins: [],
}
}