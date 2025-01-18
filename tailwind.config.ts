import { omitKeysFromObject } from '@sapphire/utilities';
import type { Config } from 'tailwindcss';
import { oklch } from 'culori';
import colors from 'tailwindcss/colors';

export default <Partial<Config>>{
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	theme: {
		colors: {
			...omitKeysFromObject(colors, 'sky', 'stone', 'neutral', 'gray'),
			'branding-wolfstar': 'oklch(var(--branding-wolfstar) / <alpha-value>)'
		}
	},
	safelist: ['oklch'],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#fd171b',
					secondary: '#050505',
					'--branding-wolfstar': stringOklch('#fd171b')
				}
			},
			{
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#fd171b',
					secondary: '#050505',
					'--branding-wolfstar': stringOklch('#fd171b')
				}
			}
		]
	}
};

function stringOklch(color: string) {
	const value = oklch(color)!;
	return `${cutNumber(value.l * 100)}% ${cutNumber(value.c)} ${cutNumber(value.h!)}`;
}

function cutNumber(number: number) {
	return +number.toFixed(6);
}
