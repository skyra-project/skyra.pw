const config = require('@sapphire/prettier-config');

/** @type {import('prettier').Config} */
module.exports = {
	...config,
	plugins: [require.resolve('prettier-plugin-css-order'), require.resolve('prettier-plugin-tailwindcss')]
};
