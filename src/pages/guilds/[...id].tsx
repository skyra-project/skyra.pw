import { createSeoProps } from '@config/next-seo.config';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import Dashboard from '@layout/Settings/Dashboard';
import Typography from '@material-ui/core/Typography';
import RedirectRoute from '@routing/RedirectRoute';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

const GuildSettingsPage: NextPage = () => {
	const router = useRouter();
	const authenticated = useAuthenticated();

	if (!authenticated) {
		return <RedirectRoute redirectUri="/" />;
	}

	const [guildId, ...path] = router.query.id;
	console.log(path);

	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Homepage' })} />
			<Dashboard guildId={guildId}>
				<Typography>Guild Settings Base page!</Typography>
			</Dashboard>
		</>
	);
};

export default GuildSettingsPage;
