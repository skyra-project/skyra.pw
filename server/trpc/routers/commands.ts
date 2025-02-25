import { z } from 'zod';
import { Time } from '@sapphire/time-utilities';
import { TRPCError } from '@trpc/server';
import { isNullish } from '@sapphire/utilities';
import { procedure, router } from '~~/server/trpc/trpc';
import { useCommandsStore } from '~~/app/stores/commands';
import type { FlattenedCommand } from '~/shared/types';
import { useAPI } from '~~/app/composables/externalApi';

export const commandsRouter = router({
	getAll: procedure
		.meta({
			rateLimitRequired: true
		})
		.output(z.array(z.custom<FlattenedCommand>()))
		.query(() => useCommandsStore().commands),
	refresh: procedure
		.meta({
			rateLimitRequired: true
		})
		.input(
			z.optional(
				z.object({
					commands: z.array(z.custom<FlattenedCommand>())
				})
			)
		)
		.output(z.void())
		.mutation(async ({ input }) => {
			const store = useCommandsStore();
			try {
				if (store.expired || process.env.NODE_ENV === 'development') {
					return;
				}

				if (isNullish(input) || !Array.isArray(input.commands) || isNullish(input.commands)) {
					input ??= {
						commands: []
					};
					input.commands = await useAPI<FlattenedCommand[]>('/commands', {
						lazy: true
					});
				}

				store.commandsStorage = {
					expire: Date.now() + Time.Day * 6,
					data: Array.isArray(input.commands) ? input.commands : []
				};
			} catch {
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		})
});
