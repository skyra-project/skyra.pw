import { z } from 'zod';

export const callbackInputSchema = z.object({
	code: z.string(),
	redirectUri: z.string()
});
