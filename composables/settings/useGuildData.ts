import type { ValuesType } from 'utility-types';
import { ref, type Ref } from 'vue';
import type { TransformedLoginData } from '~/types/ApiData';

const useGuild = (): {
	guildData: Ref<ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>>;
	setGuildData: (data: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>) => void;
} => {
	const guildData = ref() as Ref<ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>>;

	const setGuildData = (data: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>) => {
		guildData.value = data;
	};

	return {
		guildData,
		setGuildData
	};
};

export default useGuild;
