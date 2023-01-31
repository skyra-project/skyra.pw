import type { FlattenedCommand } from '@config/types/ApiData';
import { FilterRoutes, GuildRoutes } from '@config/types/GuildRoutes';
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
import ModerationSettings from '@pages/Settings/ModerationSettings';
import RoleSettings from '@pages/Settings/RoleSettings';
import Loading from '@presentational/Loading';
import { ExpirableLocalStorageStructure, LocalStorageKeys } from '@utils/constants';
import { Time } from '@utils/skyraUtils';
import { apiFetch, loadState, saveState } from '@utils/util';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState, type FC } from 'react';

interface GuildSettingsProps {}

const GuildSettings: FC<GuildSettingsProps> = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [commands, setCommands] = useState<FlattenedCommand[]>([]);
	const [languages, setLanguages] = useState<string[]>([]);

	const [guildId, ...path] = router.query.id ?? ['', ['']];
	const joinedPath = path.join('/');

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

	const renderSettingsPath = () => {
		switch (joinedPath as GuildRoutes & FilterRoutes) {
			case GuildRoutes.Channels:
				return <ChannelSettings />;
			case GuildRoutes.CustomCommands:
				return <CustomCommandSettings />;
			case GuildRoutes.DisabledCommands:
				return <DisabledCommandSettings setCommands={setCommands} commands={commands} />;
			case GuildRoutes.Events:
				return <EventSettings />;
			case GuildRoutes.Moderation:
				return <ModerationSettings />;
			case GuildRoutes.Roles:
				return <RoleSettings />;
			case FilterRoutes.Capitals:
				return <FilterCapitalsSettings />;
			case FilterRoutes.Invites:
				return <FilterInvitesSettings />;
			case FilterRoutes.Links:
				return <FilterLinksSettings />;
			case FilterRoutes.MessageDuplication:
				return <FilterMessagesSettings />;
			case FilterRoutes.NewLines:
				return <FilterNewLineSettings />;
			case FilterRoutes.Reactions:
				return <FilterReactionSettings />;
			case FilterRoutes.Words:
				return <FilterWordSettings />;
			default:
				return <GeneralSettings languages={languages} />;
		}
	};

	return (
		<>
			<Loading loading={loading} />
			<Dashboard guildId={guildId}>{renderSettingsPath()}</Dashboard>
		</>
	);
};

export default memo(GuildSettings);
