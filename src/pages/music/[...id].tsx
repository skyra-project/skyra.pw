import { createGuildMusicSeoProps } from '@config/next-seo.config';
import { PublicFlattenedMusic } from '@config/types/ApiData';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import MusicPage from '@pages/MusicPage';
import RedirectRoute from '@routing/RedirectRoute';
import { apiFetch } from '@utils/util';
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

let lastRequestedGuildId = '';

const MusicDashboard: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ publicMusicData }) => {
	const router = useRouter();
	const authenticated = useAuthenticated();

	if (!authenticated) {
		return <RedirectRoute redirectUri="/" />;
	}

	const [guildId] = router.query.id;

	return (
		<>
			{publicMusicData && <NextSeo {...createGuildMusicSeoProps(publicMusicData)} />}
			<MusicPage guildId={guildId} />
		</>
	);
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const [guildId] = context.query.id;

	if (guildId && lastRequestedGuildId !== guildId) {
		lastRequestedGuildId = guildId;
		const res = await apiFetch<PublicFlattenedMusic>(`/music/${guildId}/publicData`);

		return {
			props: {
				publicMusicData: res
			}
		};
	}

	return {
		props: {}
	};
};

export default MusicDashboard;
