<template>
	<div class="discord-embed" :style="{ 'border-color': color ?? '#1E1F22' }">
		<div v-if="title" class="font-bold mb-2">{{ title }}</div>
		<div v-if="author" class="flex gap-2 items-center mb-2">
			<nuxt-img v-if="author.icon" :src="author.icon" width="20" height="20" class="w-5 h-5 rounded-full" />
			<span class="font-bold">{{ author.name }}</span>
		</div>
		<slot></slot>
		<div v-if="footer" class="flex gap-2 items-center mt-2">
			<nuxt-img v-if="footer.icon" src="/img/avatars/skyra.png" width="16" height="16" class="w-4 h-4 rounded-full" />
			<span class="text-sm">
				{{ footer.text }}
				<span v-if="timestamp">• {{ dtf.format(timestamp) }}</span>
			</span>
		</div>
		<span v-else-if="timestamp" class="text-sm mt-2">{{ dtf.format(timestamp) }}</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title?: string;
	color?: string;
	author?: { icon?: string; name: string };
	footer?: { icon?: string; text: string };
	timestamp?: number | Date;
}>();

const dtf = new Intl.DateTimeFormat(undefined, { dateStyle: 'short', timeStyle: 'short' });
</script>

<style scoped>
.discord-embed {
	@apply max-w-fit border-l-4 bg-base-200 p-4;
	border-radius: 0.25rem;
}
</style>
