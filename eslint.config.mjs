import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default createConfigForNuxt(
	eslintPluginPrettierRecommended,
	{
		ignores: ['node_modules/', 'dist/', '.nuxt/', '.output/', 'public/sw.js', 'public/workbox*', '*.d.ts']
	},
	{
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/prefer-literal-enum-member': 'off',
			'vue/no-multiple-template-root': 'off'
		}
	},
	{
		files: ['**/*.vue'],
		rules: {
			'vue/block-order': [
				'error',
				{
					order: ['template', 'script', 'style']
				}
			],
			'vue/html-self-closing': [
				'warn',
				{
					html: {
						void: 'always',
						normal: 'never'
					}
				}
			],
			'vue/max-attributes-per-line': [
				'error',
				{
					singleline: { max: 10 },
					multiline: { max: 1 }
				}
			],
			'vue/max-attributes-per-line': 'off',
			'vue/singleline-html-element-content-newline': 'off'
		}
	}
);
