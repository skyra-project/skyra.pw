<script setup lang="ts">
const props = defineProps<{
	title: string;
	disableTypography?: boolean;
	titleClass?: string;
}>();

const sectionClasses = computed(() => 'mr-0 md:mr-4 mb-2 w-full md:w-auto mt-0 md:mt-3 first:mt-0');

const titleClasses = computed(() => `text-xl font-bold border-b-2 border-primary pb-1 mb-3 ${props.titleClass || ''}`);
</script>

<template>
	<section :class="sectionClasses">
		<div v-if="title && !disableTypography" :class="titleClasses">
			{{ title }}
		</div>
		<div v-else-if="title">
			<slot name="title">{{ title }}</slot>
		</div>
		<slot></slot>
	</section>
</template>
