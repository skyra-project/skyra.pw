import type { CommandAutoDelete, DisabledCommandChannel, PermissionsNode, ReactionRole, StickyRole, UniqueRoleSet } from '@//lib/database';

declare global {
	namespace PrismaJson {
		export type PermissionNodeEntries = PermissionsNode[];
		export type CommandAutoDeleteEntries = CommandAutoDelete[];
		export type DisabledCommandChannelEntries = DisabledCommandChannel[];
		export type StickyRoleEntries = StickyRole[];
		export type ReactionRoleEntries = ReactionRole[];
		export type UniqueRoleSetEntries = UniqueRoleSet[];
	}
}
