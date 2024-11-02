/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {
				trees: "url('https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg')"
			  }
		},
	},
	plugins: [],
}
