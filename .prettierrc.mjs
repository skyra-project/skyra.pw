import sapphirePrettierConfig from '@sapphire/prettier-config';

/** @type {import('prettier').Config} */
export default {
	...sapphirePrettierConfig,
	plugins: ['prettier-plugin-tailwindcss'],
	overrides: [
		...sapphirePrettierConfig.overrides,
		{
			files: ['README.md'],
			options: {
				tabWidth: 2,
				useTabs: false,
				printWidth: 80,
				proseWrap: 'always'
			}
		}
	]
};
