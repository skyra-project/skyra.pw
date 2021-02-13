import { FilterRoutes, GuildRoutes } from '@config/types/GuildRoutes';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import Dashboard from '@layout/Settings/Dashboard';
import ChannelSettings from '@pages/Settings/ChannelSettings';
import CustomCommandSettings from '@pages/Settings/CustomCommandSettings';
import DisabledCommandSettings from '@pages/Settings/DisabledCommandSettings';
import EventSettings from '@pages/Settings/EventSettings';
import FilterCapitalsSettings from '@pages/Settings/Filter/FilterCapitalsSettings';
import FilterInvitesSettings from '@pages/Settings/Filter/FilterInvitesSettings';
import FilterLinksSettings from '@pages/Settings/Filter/FilterLinksSettings';
import FilterMessagesSettings from '@pages/Settings/Filter/FilterMessagesSettings';
import FilterNewLineSettings from '@pages/Settings/Filter/FilterNewLineSettings';
import FilterReactionSettings from '@pages/Settings/Filter/FilterReactionSettings';
import FilterWordSettings from '@pages/Settings/Filter/FilterWordSettings';
import GeneralSettings from '@pages/Settings/GeneralSettings';
import MessageSettings from '@pages/Settings/MessageSettings';
import ModerationSettings from '@pages/Settings/ModerationSettings';
import RoleSettings from '@pages/Settings/RoleSettings';
import StarboardSettings from '@pages/Settings/StarboardSettings';
import SuggestionSettings from '@pages/Settings/SuggestionSettings';
import RedirectRoute from '@routing/RedirectRoute';
import { ssrFetch } from '@utils/util';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { Case, Default, Switch } from 'react-if';

const GuildSettingsProvider = dynamic(() => import('@contexts/Settings/GuildSettingsContext'), { ssr: false });
const GuildSettingsChangesProvider = dynamic(() => import('@contexts/Settings/GuildSettingsChangesContext'), { ssr: false });
const GuildDataProvider = dynamic(() => import('@contexts/Settings/GuildDataContext'), { ssr: false });

const GuildSettingsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ languages }) => {
	const router = useRouter();
	const authenticated = useAuthenticated();

	const [guildId, ...path] = router.query.id;
	const joinedPath = path.join('/');

	if (!authenticated) {
		return <RedirectRoute redirectUri="/" />;
	}

	return (
		<GuildSettingsChangesProvider>
			<GuildSettingsProvider>
				<GuildDataProvider>
					<Dashboard guildId={guildId}>
						<Switch>
							<Case condition={joinedPath === GuildRoutes.Channels}>
								<ChannelSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.CustomCommands}>
								<CustomCommandSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.DisabledCommands}>
								<DisabledCommandSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.Events}>
								<EventSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.Messages}>
								<MessageSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.Moderation}>
								<ModerationSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.Roles}>
								<RoleSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.Starboard}>
								<StarboardSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.Suggestions}>
								<SuggestionSettings />
							</Case>
							<Case condition={joinedPath === FilterRoutes.Capitals}>
								<FilterCapitalsSettings />
							</Case>
							<Case condition={joinedPath === FilterRoutes.Invites}>
								<FilterInvitesSettings />
							</Case>
							<Case condition={joinedPath === FilterRoutes.Links}>
								<FilterLinksSettings />
							</Case>
							<Case condition={joinedPath === FilterRoutes.MessageDuplication}>
								<FilterMessagesSettings />
							</Case>
							<Case condition={joinedPath === FilterRoutes.NewLines}>
								<FilterNewLineSettings />
							</Case>
							<Case condition={joinedPath === FilterRoutes.Reactions}>
								<FilterReactionSettings />
							</Case>
							<Case condition={joinedPath === FilterRoutes.Words}>
								<FilterWordSettings />
							</Case>
							<Default>
								<GeneralSettings languages={languages} />
							</Default>
						</Switch>
					</Dashboard>
				</GuildDataProvider>
			</GuildSettingsProvider>
		</GuildSettingsChangesProvider>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [], // indicates that no page needs be created at build time
		fallback: 'blocking' // indicates the type of fallback
	};
};

export const getStaticProps: GetStaticProps<{ languages: string[] }> = async () => {
	const languages = await ssrFetch<string[]>('/languages');

	if (!languages) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			languages
		}
	};
};

export default GuildSettingsPage;
