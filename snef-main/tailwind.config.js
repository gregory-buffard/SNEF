/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/auth/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "iP": {max: "1291px"},
    },
    extend: {
      colors: {
        "snef": "rgb(0 83 80 / 50%)",
        "white-low": "rgb(245 245 245 / 50%)",
      },
      dropShadow: {
        "redish": "0 0 10px rgb(248 113 113 / 100%)",
        "amberish": "0 0 10px rgb(252 211 77 / 100%)",
        "whiteish": "0 0 10px rgb(245 245 245 / 100%)",
        'greenish': '0 0 10px rgb(22 163 74 / 100%)',
      },
    },
  },
  plugins: [],
};
