import { getServerSession } from '#auth';
import type { H3Event } from 'h3';

export async function getUserSession(event: H3Event) {
	const session = await getServerSession(event);
	if (!session?.user) return null;

	return session.user as UserSession;
}

export interface UserSession {
	id: string;
	name: string;
	email: string;
	image: string;
}
