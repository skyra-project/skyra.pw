import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import SeoHead from '@config/SEO/SeoHeader';
import GeneralPage from '@layout/General';
import RedirectRoute from '@routing/RedirectRoute';
import type { NextPage } from 'next';
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
			<SeoHead
				additionalSeoProps={{
					title: 'OAUTH Callback',
					description: 'Woops, the authentication failed :(',
					nofollow: true,
					noindex: true,
					robotsProps: robotBlockingPageProps
				}}
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
