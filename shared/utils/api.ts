import { API } from '@discordjs/core/http-only';

export default () => {
	return new API(useRest());
};
