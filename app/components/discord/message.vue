<template>
	<div class="discord-message" :class="{ 'discord-message-ephemeral': ephemeral }">
		<discord-avatar :user="name" size="medium" :class="{ 'mt-6': command }" />
		<div class="flex-grow gap-2 max-sm:text-xs">
			<div v-if="command" class="discord-message-reply">
				<span class="flex items-center gap-1 font-bold">
					<discord-avatar :user="command.user" size="tiny" />
					{{ command.user }}
				</span>
				used
				<discord-mention kind="app">{{ command.name }}</discord-mention>
			</div>
			<div class="mb-0.5 flex flex-row items-center">
				<div class="font-whitney font-bold">{{ profile.name }}</div>
				<span v-if="profile.app" class="app-badge">
					<nuxt-icon v-if="profile.verified" name="ph:check-fat-fill" class="mr-0.5 h-2 w-2 sm:h-3 sm:w-3" />
					<span class="font-whitney">APP</span>
				</span>
			</div>
			<div><slot></slot></div>
			<div v-if="ephemeral" class="discord-message-ephemeral-footer">
				<icon name="ph:eye-duotone" /> Only you can see this •
				<span class="discord-message-link">Dismiss message</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ name: ProfileName; ephemeral?: boolean; command?: { user: ProfileName; name: string } }>();
const profile = computed(() => Profiles[props.name]);
</script>

<style scoped>
@reference "../../assets/css/main.css";
.app-badge {
	@apply ml-1 flex flex-row items-center rounded-md px-1 py-0.5 font-bold text-white;
	background-color: #5865f2;
	font-size: 0.625rem;
	line-height: 0.625rem;
}

@screen md {
	.app-badge {
		font-size: 0.75rem;
		line-height: 0.75rem;
	}
}

.discord-message {
	@apply flex w-full flex-row gap-2 rounded-xl p-2 align-top sm:gap-4 sm:p-4;
}

.discord-message:not(.discord-message-ephemeral):hover {
	background-color: var(--colors-base-200);
	background-color: oklch(from var(colors-base-300) calc(l + 0.01) c h);
}

.discord-message-ephemeral {
	@apply border-l-2 border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/15;
}

.discord-message-ephemeral-footer {
	@apply mt-1.5 flex items-center gap-1 text-sm text-base-content/60;
}

.discord-message-ephemeral-footer > .discord-message-link {
	@apply cursor-pointer text-info hover:underline hover:underline-offset-1;
}

.discord-message-reply {
	--avatar-size: 48px;
	--gutter: 16px;

	@apply relative mb-1 flex items-center gap-1 text-sm;
}

.discord-message-reply::before {
	--spine-width: 2px;
	--reply-spacing: 4px;
	--custom-message-spacing-vertical-container-cozy: 0.125rem;

	content: '';
	@apply absolute box-border block;

	top: 50%;
	right: 100%;
	bottom: 0;
	left: calc(-1 * (0.5 * var(--avatar-size) + var(--gutter)));
	margin-top: calc(-0.5 * var(--spine-width));

	margin-right: var(--reply-spacing);
	margin-bottom: calc(-4px + var(--custom-message-spacing-vertical-container-cozy));
	margin-left: calc(-0.5 * var(--spine-width));

	@apply border-base-content/20;
	border-width: var(--spine-width) 0 0 var(--spine-width);
	border-style: solid;
	border-top-left-radius: 6px;
}
</style>
