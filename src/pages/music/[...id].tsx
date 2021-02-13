import mergeSeoProps from '@config/SEO/MergeSeoProps';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import MusicPage from '@pages/MusicPage';
import RedirectRoute from '@routing/RedirectRoute';
import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

const MusicDashboard: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ seoTags }) => {
	const router = useRouter();
	const authenticated = useAuthenticated();

	if (!authenticated) {
		return <RedirectRoute redirectUri="/" />;
	}

	const [guildId] = router.query.id;

	return (
		<>
			<NextSeo {...seoTags} />
			<MusicPage guildId={guildId} />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [], // indicates that no page needs be created at build time
		fallback: 'blocking' // indicates the type of fallback
	};
};

export async function getStaticProps() {
	const seoTags = mergeSeoProps({
		title: 'Music Dashboard',
		description: "Jam out to Skyra's music and feel like a real DJ!.",
		openGraph: {
			title: 'Skyra Music Dashboard'
		},
		additionalMetaTags: [
			{
				name: 'summary',
				content: "Jam out to Skyra's music and feel like a real DJ!."
			}
		]
	});

	return {
		props: { seoTags } // will be passed to the page component as props
	};
}

export default MusicDashboard;
