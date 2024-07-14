import config from '@sapphire/prettier-config';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('prettier').Config} */
export default {
	...config,
	plugins: [require.resolve('prettier-plugin-css-order'), require.resolve('prettier-plugin-tailwindcss')]
};
