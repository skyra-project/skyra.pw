/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
import { inferAsyncReturnType } from '@trpc/server';
import type { H3Event } from 'h3';
import { useAuthSession } from '../utils/session';

export async function createContext(event: H3Event) {
	const session = await useAuthSession(event);
	return {
		event,
		user: session.data
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
