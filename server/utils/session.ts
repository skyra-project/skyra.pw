import type { H3Event, SessionConfig } from 'h3';

const sessionConfig = useRuntimeConfig().auth as SessionConfig;

export interface AuthSession {
	id: string;
	name: string;
	avatar: string | null;
}

export function useAuthSession(event: H3Event) {
	return useSession<AuthSession>(event, sessionConfig);
}

export async function requireAuthSession(event: H3Event) {
	const session = await useAuthSession(event);
	if (!session.data.id) {
		throw createError({ message: 'Not Authorized', statusCode: 401 });
	}
	return session;
}
