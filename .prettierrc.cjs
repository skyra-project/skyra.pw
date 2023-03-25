const sapphirePrettierConfig = require('@sapphire/prettier-config');

module.exports = {
	...sapphirePrettierConfig,
	plugins: [require('prettier-plugin-tailwindcss')],
	overrides: [
		{
			files: '*.svg',
			options: {
				parser: 'xml'
			}
		}
	]
};
