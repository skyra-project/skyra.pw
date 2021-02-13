import { robotBlockingPageProps } from '@config/SEO/DefaultSeoProps';
import mergeSeoProps from '@config/SEO/MergeSeoProps';
import GeneralPage from '@layout/General';
import RedirectRoute from '@routing/RedirectRoute';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const OauthGuild: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ seoTags }) => {
	const [guildId, setGuildId] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (router.query.guild_id) setGuildId(router.query.guild_id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<NextSeo {...seoTags} />
			<GeneralPage loading={!guildId}>{guildId && <RedirectRoute redirectUri={`/guilds/${guildId}`} />}</GeneralPage>
		</>
	);
};

export async function getStaticProps() {
	const seoTags = mergeSeoProps({
		title: 'OAUTH Callback',
		nofollow: true,
		noindex: true,
		robotsProps: robotBlockingPageProps
	});

	return {
		props: { seoTags } // will be passed to the page component as props
	};
}

export default OauthGuild;

declare module 'querystring' {
	interface ParsedUrlQuery {
		guild_id: string | null;
	}
}
