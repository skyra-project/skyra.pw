import { omitKeysFromObject } from '@sapphire/utilities';
import { oklch } from 'culori';
import colors from 'tailwindcss/colors';

module.exports = {
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	theme: {
		colors: {
			...omitKeysFromObject(colors, 'lightBlue', 'warmGray', 'trueGray', 'coolGray'),
			'branding-wolfstar': 'oklch(var(--branding-wolfstar) / <alpha-value>)'
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#1e88e5',

					'--branding-wolfstar': stringOklch('#1e88e5')
				}
			},
			{
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#1e88e5',
					'--branding-wolfstar': stringOklch('#1e88e5')
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
