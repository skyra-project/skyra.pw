<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	title: string;
	subtitle?: string;
	titleClass?: string;
	subtitleClass?: string;
}>();

const titleClasses = computed(() => `text-2xl font-bold text-base-content ${props.titleClass || ''}`);
const subtitleClasses = computed(() => `text-lg text-base-content/70 ${props.subtitleClass || ''}`);
</script>

<template>
	<div>
		<h1 :class="titleClasses">{{ title }}</h1>
		<p v-if="subtitle" :class="subtitleClasses">{{ subtitle }}</p>
		<div class="divider"></div>
	</div>
</template>
