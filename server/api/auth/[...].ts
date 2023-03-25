import { NuxtAuthHandler } from '#auth';
import DiscordProvider from 'next-auth/providers/discord';

export default NuxtAuthHandler({
	secret: process.env.NUXT_SECRET!,
	providers: [
		// @ts-expect-error: Nuxt has issues importing DiscordProvider
		DiscordProvider.default({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!
		})
	],
	callbacks: {
		session({ session, token }) {
			// token.sub includes the Discord user's ID.
			if (session.user) Reflect.set(session.user, 'id', token.sub!);
			return session;
		}
	}
});
