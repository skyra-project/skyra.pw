// file: server/trpc/routers/index.ts
import { publicProcedure, router } from '../trpc';
import { authRouter } from './auth';
import { commandsRouter } from './commands';

export const appRouter = router({
	healthcheck: publicProcedure.query(() => {
		return {
			status: 'ok',
			timestamp: new Date().toISOString()
		};
	}),

	// Merge of router auth
	auth: authRouter,
	commands: commandsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
