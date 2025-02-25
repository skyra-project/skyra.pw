<template>
	<div class="discord-message-avatar-wrapper" :class="size.classes">
		<nuxt-img v-if="profile.app" :src="`/img/avatars/${user}.png`" :width="size.dimensions" :height="size.dimensions" alt="Avatar" />
		<nuxt-icon v-else-if="user === 'baddie'" name="ph:smiley-angry-fill" class="discord-message-avatar baddie h-full w-full" />
		<nuxt-icon v-else name="ph:shooting-star-fill" class="text-info h-full w-full" />
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ user: ProfileName; size: keyof typeof Sizes }>();
const profile = computed(() => Profiles[props.user]);
const size = computed(() => Sizes[props.size]);

const Sizes = {
	tiny: { dimensions: 16, classes: 'h-4 w-4' },
	medium: { dimensions: 48, classes: 'h-8 w-8 md:h-12 md:w-12' }
};
</script>

<style scoped>
@reference "../../assets/css/main.css";
.discord-message-avatar-wrapper {
	@apply flex-none select-none overflow-hidden rounded-full;
}

.discord-message-avatar.baddie {
	filter: drop-shadow(0 0 0.2rem oklch(var(--er) / 0.4));
}

.discord-message-avatar.baddie :deep(path) {
	@apply fill-error;
}
</style>
