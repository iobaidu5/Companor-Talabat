/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customOrange: '#ff5a00',
      },
      fontFamily: {
        PoppinsBold: "PoppinsBold",
        PoppinsSemiBold: "PoppinsSemiBold",
      },
    },
  },
  plugins: [],
};
