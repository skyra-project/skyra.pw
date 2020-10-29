declare module 'next-pwa' {
	interface NextPwaOptions extends Record<string, unknown> {
		pwa: {
			dest: string;
			/**
			 * Whether to disable pwa feature as a whole
			 * @details
			 * Set to `false`, so that it will generate service worker in both development and produdction builds
			 * @details
			 * Set to `true` to completely disable PWA generation
			 * @details
			 * If you don't need to debug the service worker in development you can set this to `process.env.NODE_ENV === 'development'`
			 * @default false
			 */
			disable?: boolean;
			/**
			 * Whether to let this plugin register service worker for you
			 * @details
			 * Set to `false` when you want to handle register service worker yourself,
			 * this could be done in `componentDidMount` of your root app.
			 * You can consider the {@link https://github.com/shadowwalker/next-pwa/blob/master/register.js register.js} as an example.
			 * @default true
			 */
			register?: boolean;
			/**
			 * URL Scope for the PWA
			 * @details
			 * For example set this to `/app` so all sub urls under `/app` will be served by PWA, and other urls will be served normally without PWA.
			 * @default /
			 */
			scope?: string;
			sw?: string;
			runtimeCaching?: unknown;
			publicExcludes?: string[];
			precached?: string[];
			subdomainPrefix?: string;
		};
	}

	function withPWA(options: NextPwaOptions): void;

	export = withPWA;
}
