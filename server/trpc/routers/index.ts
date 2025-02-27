import { commandsRouter } from '~~/server/trpc/routers/commands';
import { guildsRouter } from '~~/server/trpc/routers/guilds/index';
import { languagesRouter } from '~~/server/trpc/routers/languages';
import { usersRouter } from '~~/server/trpc/routers/users/me';
import { router } from '~~/server/trpc/trpc';

export const appRouter = router({
	guilds: guildsRouter,
	users: usersRouter,
	commands: commandsRouter,
	languages: languagesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
