/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                twitch: '#8c44f7',
                youtube: '#be2e2a',
                tiktok: '#29e8e3',
                kick: '#4df71c',
                rumble: '#70c61c',
            },
        },
    },
    plugins: [],
};
