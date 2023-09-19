/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {
				'instagram': "url('/src/icons/instagram.svg')",
				'footer-texture': "url('/img/footer-texture.png')",
			},
			keyframes: {
				rotate1: {
					'100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' },
				}
			},
			animation: {
				rotate1: 'rotate1 1s ease-in-out 1s',
			}
		},
	},
	plugins: [],
}
