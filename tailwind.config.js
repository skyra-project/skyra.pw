const colors = require('tailwindcss/colors')

module.exports = {
	mode: 'jit',
	content: ['./{pages,components,layouts,plugins}/**/*.{vue,js,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			'light',
			{
				dark: {
					...require('daisyui/src/colors/themes')['[data-theme=dark]'],
					primary: '#1e88e5',
					secondary: colors.indigo[500],
					accent: '#37CDBE',
					neutral: '#2A2E37',
					'base-100': '#3D4451',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272'
				}
			}
		]
	}
};
