import { refreshAccessToken } from '~~/server/utils/discord';
import { useAuthStorage } from '~~/server/utils/session';

export default defineEventHandler(async () => {
	const storage = useAuthStorage();
	// Request new access token using refresh token

	const accessToken = await storage.get('access_token');
	if (!accessToken) {
		throw createError({
			statusCode: 401,
			message: 'No access token found'
		});
	}
	const result = await refreshAccessToken(accessToken);
	if (!result) {
		throw createError({
			statusCode: 401,
			message: 'Failed to refresh token'
		});
	}
	// Update session with new tokens
	storage.set('access_token', result.access_token);
	storage.set('refresh_token', result.refresh_token);

	return { message: 'Token refreshed successfully' };
});
