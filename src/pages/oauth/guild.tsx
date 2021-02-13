import { createSeoProps, robotBlockingPageProps } from '@config/next-seo.config';
import GeneralPage from '@layout/General';
import RedirectRoute from '@routing/RedirectRoute';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const OauthGuild: NextPage = () => {
	const [guildId, setGuildId] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (router.query.guild_id) setGuildId(router.query.guild_id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<NextSeo
				{...createSeoProps({
					title: 'OAUTH Callback',
					additionalMetaTags: [
						{ name: 'robots', content: 'noindex, nofollow' },
						{ name: 'googlebot', content: 'noindex, nofollow' }
					],
					...robotBlockingPageProps
				})}
				noindex
				nofollow
			/>
			<GeneralPage loading={!guildId}>{guildId && <RedirectRoute redirectUri={`/guilds/${guildId}`} />}</GeneralPage>
		</>
	);
};

export default OauthGuild;

declare module 'querystring' {
	interface ParsedUrlQuery {
		guild_id: string | null;
	}
}
