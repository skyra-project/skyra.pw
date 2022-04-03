declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test';
		readonly NEXT_PUBLIC_CLIENT_ID: string;
		readonly NEXT_PUBLIC_BASE_WEB_URL: string;
		readonly NEXT_PUBLIC_BASE_API_URL: string;
	}
}
