<!---<template>
	<div class="discord-embed" :style="{ 'border-color': color ?? '#1E1F22' }">
		<div v-if="title" class="mb-2 font-bold">{{ title }}</div>
		<div v-if="author" class="mb-2 flex items-center gap-2">
			<nuxt-img v-if="author.icon" :src="author.icon" width="20" height="20" class="h-5 w-5 rounded-full" />
			<span class="font-bold">{{ author.name }}</span>
		</div>
		<slot></slot>
		<div v-if="footer" class="mt-2 flex items-center gap-2">
			<nuxt-img v-if="footer.icon" src="/img/avatars/wolfstar.png" width="16" height="16" class="h-4 w-4 rounded-full" />
			<span class="text-sm">
				{{ footer.text }}
				<span v-if="timestamp">• {{ dtf.format(timestamp) }}</span>
			</span>
		</div>
		<span v-else-if="timestamp" class="mt-2 text-sm">{{ dtf.format(timestamp) }}</span>
	</div>
</template> -->
<template>
	<div class="my-2 flex max-w-[520px] text-sm leading-relaxed" :class="[isDarkTheme ? 'text-discord-light' : 'text-discord-dark']">
		<div class="discord-embed" :style="{ 'border-color': color ?? '#1E1F22' }">
			<div v-if="title" class="font-whitney mb-2 text-base font-bold">{{ title }}</div>
			<div v-if="author" class="font-whitney mt-2 flex items-center gap-2 text-base">
				<nuxt-img v-if="author.icon" :src="author.icon" class="mr-2 h-6 w-6 rounded-full" alt="Author avatar" />
				<span>{{ author.name }}</span>
			</div>
			<slot></slot>
			<div v-if="footer" class="mt-2 flex items-center gap-2 text-sm">
				<nuxt-img v-if="footer.icon" src="/img/avatars/wolfstar.png" width="16" height="16" class="h-4 w-4 rounded-full" />
				<span class="text-sm">
					{{ footer.text }}
					<span v-if="timestamp">• {{ dtf.format(timestamp) }}</span>
				</span>
			</div>
			<span v-else-if="timestamp" class="mt-2 text-sm">{{ dtf.format(timestamp) }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	title?: string;
	color?: string;
	author?: { icon?: string; name: string };
	footer?: { icon?: string; text: string };
	timestamp?: number | Date;
	theme?: 'light' | 'dark';
}>();

const isDarkTheme = computed(() => props.theme !== 'light');
const dtf = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' });
</script>

<style scoped>
@reference "../../assets/css/main.css";
.discord-embed {
	@apply mt-1 max-w-fit border-l-4 p-3;
	border-radius: 0.25rem;
}

/* Media features */
.discord-embed-media {
	@apply rounded max-w-[300px] max-h-[300px] mt-4;
}

.discord-embed-media-video {
	@apply h-[225px];
}

.discord-embed-custom-emoji {
	@apply inline-block;
}

.discord-embed-custom-emoji-image {
	@apply w-[18px] h-[18px] align-bottom;
}
</style>
