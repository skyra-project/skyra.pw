import { z } from 'zod';
import Fuse from 'fuse.js';
import { publicProcedure, router } from '../trpc';
import { useCommandsStore } from '~/stores/commands';

const fuseOptions = {
	keys: ['name', 'description'],
	threshold: 0.3,
	ignoreLocation: true
};

export const commandsRouter = router({
	getAll: publicProcedure.query(() => {
		const store = useCommandsStore();
		return store.commands;
	}),

	search: publicProcedure
		.input(
			z.object({
				query: z.string(),
				category: z.string().optional()
			})
		)
		.query(async ({ input }) => {
			const store = useCommandsStore();
			const commands = store.commands;
			let filteredCommands = commands;

			if (input.category) {
				filteredCommands = commands.filter((cmd) => cmd.category === input.category);
			}

			if (input.query) {
				const fuse = new Fuse(filteredCommands, fuseOptions);
				return fuse.search(input.query).map((result) => result.item);
			}

			return filteredCommands;
		}),

	refresh: publicProcedure.mutation(async () => {
		const store = useCommandsStore();
		return store.fetchCommands();
	})
});
