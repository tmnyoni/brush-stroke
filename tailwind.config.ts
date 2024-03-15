/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/container-queries"),
        require("tailwindcss-react-aria-components"),
        require("tailwindcss-animate"),
    ],
};
