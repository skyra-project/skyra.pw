import { z } from 'zod';
import { Time } from '@sapphire/time-utilities';
import { TRPCError } from '@trpc/server';
import { isNullish } from '@sapphire/utilities';
import { procedure, router } from '~~/server/trpc/trpc';
import { useLanguagesStore } from '~~/app/stores/languages';
import { useAPI } from '~~/app/composables/externalApi';

export const languagesRouter = router({
	getAll: procedure
		.meta({
			rateLimitRequired: true
		})
		.query(() => useLanguagesStore().languages),
	refresh: procedure
		.meta({
			rateLimitRequired: true
		})
		.input(
			z.optional(
				z.object({
					languages: z.array(z.string())
				})
			)
		)
		.output(z.any())
		.mutation(async ({ input }) => {
			const store = useLanguagesStore();
			try {
				if (store.expired || process.env.NODE_ENV === 'development') {
					return;
				}

				if (isNullish(input) || !Array.isArray(input.languages) || isNullish(input.languages)) {
					input ??= {
						languages: []
					};
					input.languages = await useAPI<FlattenedCommand[]>('/languages', {
						lazy: true
					});
				}

				store.languagesStorage = {
					expire: Date.now() + Time.Day * 6,
					data: Array.isArray(input.languages) ? input.languages : []
				};
			} catch {
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		})
});
