import { FlattenedGuild } from '#config/types/ApiData';
import constate from 'constate';
import { useState } from 'react';

const useGuildSettingsHook = () => {
	const [guildData, setGuildData] = useState<FlattenedGuild>();

	return {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		guildData: guildData!,
		setGuildData
	};
};

export const [GuildDataProvider, useGuildDataContext] = constate(useGuildSettingsHook);

export default GuildDataProvider;
