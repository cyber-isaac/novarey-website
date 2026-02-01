/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Syne', 'sans-serif'],
                serif: ['"Instrument Serif"', 'serif'],
                display: ['"Instrument Serif"', 'serif'],
                jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
                mono: ['"Space Grotesk"', 'monospace'],
            },
            colors: {
                void: '#050505',
                neon: '#00F3FF',
                glass: 'rgba(255, 255, 255, 0.05)',
                glassHover: 'rgba(255, 255, 255, 0.1)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
