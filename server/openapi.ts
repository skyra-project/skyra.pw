import { generateOpenApiDocument } from 'trpc-to-openapi';
import { appRouter } from './trpc/routers';
import { getOrigin } from '@/composables/public';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
	title: 'Discord Integration API',
	description: 'OpenAPI compliant REST API for Discord integration using tRPC',
	version: '1.0.0',
	baseUrl: `http://${getOrigin()}/api`,
	tags: ['commands', 'guilds', 'languages']
});
