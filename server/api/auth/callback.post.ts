import { isNullishOrEmpty } from '@sapphire/utilities';

export default eventHandler(async (event) => {
	const { code, redirectUri } = (await readBody(event)) as OAuth2BodyData;
	if (isNullishOrEmpty(code) || isNullishOrEmpty(redirectUri)) {
		throw createError({ message: 'Invalid body parameters', statusCode: 400 });
	}

	const data = await fetchAccessToken(code, redirectUri);
	if (!data) {
		throw createError({ message: 'Failed to fetch the token', statusCode: 500 });
	}

	const user = await fetchUser(data.access_token);
	if (!user) {
		throw createError({ message: 'Failed to fetch the user', statusCode: 500 });
	}

	const session = await useAuthSession(event);
	await session.update({ id: user.id, name: user.username, avatar: user.avatar });
	return session.data;
});

interface OAuth2BodyData {
	code: string;
	redirectUri: string;
}
