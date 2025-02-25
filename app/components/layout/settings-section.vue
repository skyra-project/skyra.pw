<template>
	<section :class="['mr-0 mb-2 w-full md:mr-4 md:w-auto', 'not-first-of-type:mt-3 md:not-first-of-type:mt-0']">
		<template v-if="title">
			<div v-if="disableTypography" v-bind="titleProps">
				{{ title }}
			</div>
			<h1 v-else class="border-primary mb-3 border-b-2 pb-0.5 text-xl font-medium" v-bind="titleProps">
				{{ title }}
			</h1>
		</template>

		<slot></slot>
	</section>
</template>

<script setup lang="ts">
interface Props {
	title?: string | number;
	disableTypography?: boolean;
	titleProps?: Record<string, unknown>;
}

defineProps<Props>();
</script>

<style scoped>
.border-primary {
	border-color: var(--color-primary);
}
</style>
