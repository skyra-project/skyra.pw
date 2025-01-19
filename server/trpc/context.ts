/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
import type { inferAsyncReturnType } from '@trpc/server';
import type { H3Event } from 'h3';

export async function createContext(event: H3Event) {
	return {
		event
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
