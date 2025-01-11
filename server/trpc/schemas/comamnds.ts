import { z } from 'zod';

export const commandSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	category: z.string(),
	options: z.array(z.any()).optional()
});

export type Command = z.infer<typeof commandSchema>;
