import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import type { FlattenedCommand } from '~/config/types/ApiData';
import { getApiOrigin } from '~/composables/public';

const Time = { Day: 1000 * 60 * 60 * 24 };

const commandsCache = {
	data: [] as FlattenedCommand[],
	expire: 0
};

async function fetchCommands() {
	if (commandsCache.expire > Date.now()) {
		return commandsCache.data;
	}

	try {
		const commands = await $fetch<FlattenedCommand[]>(getApiOrigin() + '/api/commands');
		commandsCache.data = commands;
		commandsCache.expire = Date.now() + Time.Day * 6;
		return commands;
	} catch (error) {
		console.error('Failed to fetch commands:', error);
		return [];
	}
}

export const commandsRouter = router({
	getAll: publicProcedure.query(() => fetchCommands()),

	search: publicProcedure
		.input(
			z.object({
				query: z.string(),
				category: z.string().optional()
			})
		)
		.query(async ({ input }) => {
			const commands = await fetchCommands();
			return commands.filter((cmd) => {
				const matchesQuery = cmd.name.toLowerCase().includes(input.query.toLowerCase());
				const matchesCategory = !input.category || cmd.category === input.category;
				return matchesQuery && matchesCategory;
			});
		}),

	refresh: publicProcedure.mutation(async () => {
		commandsCache.expire = 0;
		return fetchCommands();
	})
});
