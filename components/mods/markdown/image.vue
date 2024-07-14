<template>
	<span v-if="src" class="inline-block pl-4 pr-2">
		<NuxtImg :src="src" alt="Emoji" width="16" height="16" class="inline-block align-text-bottom" />
	</span>
</template>

<script lang="ts" setup>
const { src } = defineProps<{
	src?: string;
}>();
</script>
