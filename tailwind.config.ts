import { oklch } from 'culori';
import colors from 'tailwindcss/colors';

module.exports = {
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	theme: {
		colors: {
			...colors,
			'branding-artiel': 'oklch(var(--branding-artiel) / <alpha-value>)',
			'branding-iriss': 'oklch(var(--branding-iriss) / <alpha-value>)',
			'branding-nekokai': 'oklch(var(--branding-nekokai) / <alpha-value>)',
			'branding-skyra': 'oklch(var(--branding-skyra) / <alpha-value>)',
			'branding-teryl': 'oklch(var(--branding-teryl) / <alpha-value>)'
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#1e88e5',
					'--branding-artiel': stringOklch('#ebb971'),
					'--branding-iriss': stringOklch('#ddbd96'),
					'--branding-nekokai': stringOklch('#a185e5'),
					'--branding-skyra': stringOklch('#1e88e5'),
					'--branding-teryl': stringOklch('#6b79c9')
				}
			},
			{
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#1e88e5',
					'--branding-artiel': stringOklch('#ebb971'),
					'--branding-iriss': stringOklch('#ddbd96'),
					'--branding-nekokai': stringOklch('#a185e5'),
					'--branding-skyra': stringOklch('#1e88e5'),
					'--branding-teryl': stringOklch('#6b79c9')
				}
			}
		]
	}
};

function stringOklch(color: string) {
	const value = oklch(color)!;
	return `${cutNumber(value.l * 100)}% ${cutNumber(value.c)} ${cutNumber(value.h)}`;
}

function cutNumber(number: number) {
	return +number.toFixed(6);
}
