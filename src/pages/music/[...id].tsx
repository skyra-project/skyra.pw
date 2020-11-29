import { createSeoProps } from '#config/next-seo.config';
import { useAuthenticated } from '#contexts/AuthenticationContext';
import MusicPage from '#pages/MusicPage';
import RedirectRoute from '#routing/RedirectRoute';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

const MusicDashboard: NextPage = () => {
	const router = useRouter();
	const authenticated = useAuthenticated();

	if (!authenticated) {
		return <RedirectRoute redirectUri="/" />;
	}

	const [guildId] = router.query.id;

	return (
		<>
			<NextSeo {...createSeoProps({ title: 'Music Dashboard' })} />
			<MusicPage guildId={guildId} />
		</>
	);
};

export default MusicDashboard;
