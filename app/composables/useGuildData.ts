import { ref } from 'vue';
import type { TransformedLoginData } from '~~/shared/types';

const useGuild = () => {
	const guildData = ref<keyof NonNullable<TransformedLoginData['transformedGuilds']>>();

	return guildData;
};
export default useGuild;
