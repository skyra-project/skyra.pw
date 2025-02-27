import { z } from 'zod';

export const settingsUpdateSchema = z.object({
	guildId: z.string(),
	data: z.array(z.tuple([z.string(), z.unknown()]))
});

export const guildSchema = z.object({
	guildid: z.string(),
	shouldSerialize: z.boolean().optional()
});
