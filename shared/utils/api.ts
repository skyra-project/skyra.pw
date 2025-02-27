import { API } from '@discordjs/core/http-only';
import type { REST } from '@discordjs/rest';

export default (rest?: REST) => {
	rest ??= useRest();
	return new API(rest);
};
