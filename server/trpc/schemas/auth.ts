import { z } from 'zod';

export const userSchema = z.object({
	id: z.string(),
	username: z.string(),
	discriminator: z.string(),
	global_name: z.string().nullable(),
	avatar: z.string().nullable(),
	bot: z.boolean().optional(),
	system: z.boolean().optional(),
	mfa_enabled: z.boolean().optional(),
	banner: z.string().nullable().optional(),
	accent_color: z.number().nullable().optional(),
	locale: z.string().optional(),
	verified: z.boolean().optional(),
	email: z.string().nullable().optional(),
	flags: z.number().optional(),
	premium_type: z.number().optional(),
	public_flags: z.number().optional(),
	avatar_decoration: z.string().nullable().optional()
});

export type AuthSession = z.infer<typeof userSchema>;

export const callbackInputSchema = z.object({
	code: z.string(),
	redirectUri: z.string()
});
