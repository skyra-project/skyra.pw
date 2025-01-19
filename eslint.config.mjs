// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
//@ts-ignore eslint-config-prettier as not
import eslintConfigPrettier from 'eslint-config-prettier';

export default withNuxt([
	eslintConfigPrettier,
	{
		ignores: ['node_modules/', 'dist/', '.nuxt/', '.output/', 'public/sw.js', 'public/workbox*', '*.d.ts'],
		rules: {
			'no-unused-vars': 'off',
			'nuxt/prefer-import-meta': 'error',
			'@typescript-eslint/prefer-literal-enum-member': 'off'
		}
	}
]);
