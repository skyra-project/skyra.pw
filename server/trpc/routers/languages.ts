import { z } from 'zod';
import Fuse from 'fuse.js';
import { publicProcedure, router } from '../trpc';
import { useLanguagesStore } from '~/stores/languages';

const fuseOptions = {
	keys: ['name', 'code'],
	threshold: 0.3,
	ignoreLocation: true
};

async function getLanguages() {
	const store = useLanguagesStore();

	if (store.languagesStorage.expire > Date.now()) {
		return store.languages;
	}

	await store.fetchLanguages();
	return store.languages;
}

export const languagesRouter = router({
	getAll: publicProcedure.query(() => getLanguages()),

	search: publicProcedure
		.input(
			z.object({
				query: z.string()
			})
		)
		.query(async ({ input }) => {
			const languages = await getLanguages();

			if (input.query) {
				const fuse = new Fuse(languages, fuseOptions);
				return fuse.search(input.query).map((result) => result.item);
			}

			return languages;
		}),

	refresh: publicProcedure.mutation(async () => {
		const store = useLanguagesStore();
		store.languagesStorage.expire = 0;
		return store.fetchLanguages();
	})
});
