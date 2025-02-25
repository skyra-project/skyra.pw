import { generateOpenApiDocument } from 'trpc-to-openapi';
import { appRouter } from './trpc/routers';
import { getOrigin } from '@/composables/public';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
	title: 'Example CRUD API',
	description: 'OpenAPI compliant REST API built using tRPC with Next.js',
	version: '1.0.0',
	baseUrl: `http://${getOrigin()}/api`,
	tags: ['auth', 'users', 'guilds', 'discord']
});
