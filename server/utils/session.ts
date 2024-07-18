import { APIUser, RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10';
import type { H3Event, SessionConfig } from 'h3';
import { TransformedLoginData } from '~/config/types/ApiData';

const sessionConfig = useRuntimeConfig().auth as SessionConfig;

export type AuthSession = APIUser & {
	name: string;
};

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
