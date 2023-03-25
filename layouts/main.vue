<template>
	<div class="flex h-screen flex-col">
		<sections-app-header />
		<div class="mt-8 flex-auto justify-between">
			<div class="w-full">
				<main class="mx-auto sm:w-5/6 lg:max-w-5xl" v-bind="$attrs">
					<slot></slot>
				</main>
			</div>
		</div>
		<sections-app-footer />
	</div>
</template>

<script lang="ts">
export default {
	inheritAttrs: false
};
</script>
