import { createGuildSeoProps } from '@config/next-seo.config';
import { PublicFlattenedGuild } from '@config/types/ApiData';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import Dashboard from '@layout/Settings/Dashboard';
import Typography from '@material-ui/core/Typography';
import RedirectRoute from '@routing/RedirectRoute';
import { apiFetch } from '@utils/util';
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

const GuildSettingsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ publicGuildData }) => {
	const router = useRouter();
	const authenticated = useAuthenticated();

	if (!authenticated) {
		return <RedirectRoute redirectUri="/" />;
	}

	const [guildId, ...path] = router.query.id;
	console.log(path);

	return (
		<>
			<NextSeo {...createGuildSeoProps(publicGuildData, path)} />
			<Dashboard guildId={guildId}>
				<Typography>Guild Settings Base page!</Typography>
			</Dashboard>
		</>
	);
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const [guildId] = context.query.id;

	const res = await apiFetch<PublicFlattenedGuild>(`/guilds/${guildId}/publicData`);

	return {
		props: {
			publicGuildData: res
		}
	};
};

export default GuildSettingsPage;
