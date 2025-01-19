<template>
	<div class="border-gray-200 relative border-b p-4">
		<h2 class="text-xl font-semibold">
			<slot />
		</h2>
		<button class="text-gray-500 hover:text-gray-700 absolute right-2 top-2" @click="onClose">
			<NuxtIcon name="mdi-close" />
		</button>
	</div>
</template>

<script setup lang="ts">
interface DialogTitleProps {
	onClose: () => void;
}

defineProps<DialogTitleProps>();
</script>

<style scoped>
button {
	@apply text-gray-500 hover:text-gray-700;
}
</style>
