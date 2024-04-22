<template>
	<div class="mt-2 rounded-md bg-base-200 px-2 pb-2 pt-2 drop-shadow-lg sm:px-4 sm:pb-4">
		<span class="text-xs font-extrabold uppercase">You've been invited to join a server</span>
		<div class="mt-2 flex">
			<div class="h-8 w-8 rounded-xl bg-base-content/20 sm:h-12 sm:w-12">
				<icons-skyra class="p-1" />
			</div>
			<div class="ml-4 flex-grow">
				<nuxt-link class="font-bold" :to="link">Skyra Lounge</nuxt-link>
				<div class="flex flex-row items-center">
					<span class="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-green-500 sm:h-2 sm:w-2"></span>
					<span>{{ online.toLocaleString() }} Online</span>

					<span class="ml-2 mr-1 inline-block h-1.5 w-1.5 rounded-full bg-base-content/80 sm:h-2 sm:w-2 md:ml-4"></span>
					<span>{{ members.toLocaleString() }} Members</span>
				</div>
			</div>
			<div>
				<nuxt-link :to="link" class="btn btn-error max-sm:btn-sm">Join</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ link: string; online?: number; members?: number }>(), {
	online: 0,
	members: 0
});
</script>
