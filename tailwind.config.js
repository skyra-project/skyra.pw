module.exports = {
	mode: 'jit',
	content: ['./{pages,components,layouts,plugins}/**/*.{vue,js,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
