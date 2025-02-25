import type { OpenApiMeta } from 'trpc-to-openapi';

export type Meta = OpenApiMeta<{
	auth?: boolean;
}>;
