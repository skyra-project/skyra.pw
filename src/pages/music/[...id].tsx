import SeoHead from '@config/SEO/SeoHeader';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import MusicPage from '@pages/MusicPage';
import RedirectRoute from '@routing/RedirectRoute';
import type { NextPage } from 'next';
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
			<SeoHead
				additionalSeoProps={{
					title: 'Music Dashboard',
					description: "Jam out to Skyra's music and feel like a real DJ!.",
					openGraph: {
						title: 'Skyra Commands'
					},
					additionalMetaTags: [
						{
							name: 'summary',
							content: "Jam out to Skyra's music and feel like a real DJ!."
						}
					]
				}}
			/>
			<MusicPage guildId={guildId} />
		</>
	);
};

export default MusicDashboard;
