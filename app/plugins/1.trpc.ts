import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client';
import superjson from 'superjson';
import type { AppRouter } from '@/server/trpc/routers/index';

export default defineNuxtPlugin(() => {
	const client = createTRPCNuxtClient<AppRouter>({
		links: [
			httpBatchLink({
				url: '/api/trpc',
				transformer: superjson
			})
		]
	});

	return {
		provide: {
			client
		}
	};
});
