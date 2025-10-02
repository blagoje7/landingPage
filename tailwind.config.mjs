/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}"],
  theme: {
    extend: {
      colors: {
        brand: { gold: "#fcb603", white: "#ffffff" }
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(0,0,0,0.08)",
        glow: "0 0 0 4px rgba(252,182,3,0.20)"
      },
      borderColor: {
        faint: "rgba(0,0,0,0.06)"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};