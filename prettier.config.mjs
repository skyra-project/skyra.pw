import config from '@sapphire/prettier-config';

/** @type {import('prettier').Config} */
export default {
	...config,
	plugins: [await import('prettier-plugin-css-order'), await import('prettier-plugin-tailwindcss')]
};
