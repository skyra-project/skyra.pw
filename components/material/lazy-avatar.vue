<template>
	<div class="flex h-8 w-8 items-center justify-center rounded-xl bg-base-content/20 sm:h-12 sm:w-12">
		<img :src="avatarURL" :alt="alt" loading="lazy" class="avatar" v-bind="otherProps" />
	</div>
</template>

<script setup lang="ts">
import type { APIUser } from 'discord-api-types/v10';
import { computed } from 'vue';

interface AvatarProps {
	user: APIUser | null | undefined;
	options: {
		format?: string | undefined;
		size?: number | undefined;
	};
	alt: string;
	[key: string]: any;
}

const props = defineProps<AvatarProps>();
const { user, options, alt, ...otherProps } = props;

const avatarURL = computed(() => displayAvatarURL(user, options));
</script>

<style scoped>
.avatar {
	@apply h-full w-full rounded-full; /* Example styles, adjust as needed */
}
</style>
