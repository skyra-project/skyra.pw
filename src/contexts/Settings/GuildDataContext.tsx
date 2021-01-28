import type { TransformedLoginData } from '#config/types/ApiData';
import constate from 'constate';
import { useState } from 'react';
import type { ValuesType } from 'utility-types';

const useGuildSettingsHook = () => {
	const [guildData, setGuildData] = useState<ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>>();

	return {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		guildData: guildData!,
		setGuildData
	};
};

export const [GuildDataProvider, useGuildDataContext] = constate(useGuildSettingsHook);

export default GuildDataProvider;
