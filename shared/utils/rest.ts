import { REST } from '@discordjs/rest';

export const useRest = () => {
	return new REST({
		version: '10',
		authPrefix: 'Bearer'
	}).setToken(useAccessToken().value);
};
