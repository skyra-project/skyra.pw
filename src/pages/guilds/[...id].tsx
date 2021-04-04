import type { FlattenedCommand } from '@config/types/ApiData';
import { FilterRoutes, GuildRoutes } from '@config/types/GuildRoutes';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import Dashboard from '@layout/Settings/Dashboard';
import BirthdaySettings from '@pages/Settings/BirthdaySettings';
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
import Loading from '@presentational/Loading';
import RedirectRoute from '@routing/RedirectRoute';
import { ExpirableLocalStorageStructure, LocalStorageKeys } from '@utils/constants';
import { Time } from '@utils/skyraUtils';
import { apiFetch, loadState, saveState } from '@utils/util';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Case, Default, Switch } from 'react-if';

const GuildSettingsProvider = dynamic(() => import('@contexts/Settings/GuildSettingsContext'));
const GuildSettingsChangesProvider = dynamic(() => import('@contexts/Settings/GuildSettingsChangesContext'));
const GuildDataProvider = dynamic(() => import('@contexts/Settings/GuildDataContext'));

const GuildSettingsPage: NextPage = () => {
	const router = useRouter();
	const authenticated = useAuthenticated();
	const [loading, setLoading] = useState(true);
	const [commands, setCommands] = useState<FlattenedCommand[]>([]);
	const [languages, setLanguages] = useState<string[]>([]);

	const fetchCommandsAndLanguages = useCallback(async () => {
		setLoading(true);

		const commandsFromLocalStorage = loadState<ExpirableLocalStorageStructure<FlattenedCommand[]>>(LocalStorageKeys.Commands);
		if (commandsFromLocalStorage && (process.env.NODE_ENV === 'development' || commandsFromLocalStorage.expire > Date.now())) {
			setCommands(commandsFromLocalStorage.data);
		} else {
			const commandsData = await apiFetch<FlattenedCommand[]>('/commands');
			setCommands(commandsData);
			saveState<ExpirableLocalStorageStructure<FlattenedCommand[]>>(LocalStorageKeys.Commands, {
				expire: Date.now() + Time.Day * 6,
				data: commandsData
			});
		}

		const languagesFromLocalStorage = loadState<ExpirableLocalStorageStructure<string[]>>(LocalStorageKeys.Languages);
		if (languagesFromLocalStorage && (process.env.NODE_ENV === 'development' || languagesFromLocalStorage.expire > Date.now())) {
			setLanguages(languagesFromLocalStorage.data);
		} else {
			const languagesData = await apiFetch<string[]>('/languages');
			setLanguages(languagesData);
			saveState<ExpirableLocalStorageStructure<string[]>>(LocalStorageKeys.Languages, {
				expire: Date.now() + Time.Day * 6,
				data: languagesData
			});
		}

		setLoading(false);
	}, []);

	useEffect(() => {
		void fetchCommandsAndLanguages();
	}, [fetchCommandsAndLanguages]);

	const [guildId, ...path] = router.query.id ?? ['', ['']];
	const joinedPath = path.join('/');

	if (!authenticated) {
		return <RedirectRoute redirectUri="/" />;
	}

	return (
		<GuildSettingsChangesProvider>
			<GuildSettingsProvider>
				<GuildDataProvider>
					<Loading loading={loading} />
					<Dashboard guildId={guildId}>
						<Switch>
							<Case condition={joinedPath === GuildRoutes.Birthdays}>
								<BirthdaySettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.Channels}>
								<ChannelSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.CustomCommands}>
								<CustomCommandSettings />
							</Case>
							<Case condition={joinedPath === GuildRoutes.DisabledCommands}>
								<DisabledCommandSettings setCommands={setCommands} commands={commands} />
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

export default GuildSettingsPage;
