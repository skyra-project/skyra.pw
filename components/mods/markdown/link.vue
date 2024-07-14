<template>
	<span v-if="!href" class="text-sm"> [<slot></slot>] </span>
	<NuxtLink v-else-if="isInternalLink" :to="internalPath" class="link link-primary break-words">
		<slot></slot>
	</NuxtLink>
	<span v-else-if="!isValidUrl" class="break-words text-sm text-primary">
		<slot></slot>
	</span>
	<a v-else :href="href" target="_blank" rel="noopener noreferrer" class="link link-primary break-words">
		<slot></slot>
	</a>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
	href?: string;
}>();

const WolfStarRocksPathRegex = /<?https:\/\/wolfstar\.rocks(?<path>\/[a-z]+)?>?/;

const isInternalLink = computed(() => props.href?.startsWith('https://wolfstar.rocks'));
const isValidUrl = computed(() => props.href?.startsWith('http'));

const internalPath = computed(() => {
	if (!isInternalLink.value) return '';
	if (props.href?.endsWith('rocks')) return '/';
	return WolfStarRocksPathRegex.exec(props.href ?? '')?.groups?.path ?? props.href;
});
</script>
