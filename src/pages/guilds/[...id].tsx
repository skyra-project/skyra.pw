import { useAuthenticated } from '@contexts/AuthenticationContext';
import RedirectRoute from '@routing/RedirectRoute';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const GuildSettingsProvider = dynamic(() => import('@contexts/Settings/GuildSettingsContext'));
const GuildSettingsChangesProvider = dynamic(() => import('@contexts/Settings/GuildSettingsChangesContext'));
const GuildDataProvider = dynamic(() => import('@contexts/Settings/GuildDataContext'));

const GuildSettings = dynamic(() => import('@presentational/GuildSettings'), { ssr: false });

const GuildSettingsPage: NextPage = () => {
	const authenticated = useAuthenticated();

	if (!authenticated) {
		return <RedirectRoute redirectUri="/" />;
	}

	return (
		<GuildSettingsChangesProvider>
			<GuildSettingsProvider>
				<GuildDataProvider>
					<GuildSettings />
				</GuildDataProvider>
			</GuildSettingsProvider>
		</GuildSettingsChangesProvider>
	);
};

export default GuildSettingsPage;
