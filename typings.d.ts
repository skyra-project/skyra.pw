import 'nuxt/dist/pages/runtime/composables';

declare module 'nuxt/dist/pages/runtime/composables' {
	interface PageMeta {
		invite?: string;
		dashboard?: boolean;
		nav?: boolean;
		fit?: boolean;
	}
}
