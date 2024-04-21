<template>
	<div class="bg-base-200 px-2 sm:px-4 pb-2 sm:pb-4 pt-2 mt-2 rounded-md drop-shadow-lg">
		<span class="uppercase text-xs font-extrabold">You've been invited to join a server</span>
		<div class="flex mt-2">
			<div class="w-8 sm:w-12 h-8 sm:h-12 rounded-xl bg-base-content/20">
				<icons-skyra class="p-1" />
			</div>
			<div class="flex-grow ml-4">
				<nuxt-link class="font-bold" :to="link">Skyra Lounge</nuxt-link>
				<div class="flex flex-row items-center">
					<span class="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full inline-block mr-1"></span>
					<span>{{ online.toLocaleString() }} Online</span>

					<span class="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-base-content/80 rounded-full inline-block mr-1 ml-2 md:ml-4"></span>
					<span>{{ members.toLocaleString() }} Members</span>
				</div>
			</div>
			<div>
				<nuxt-link :to="link" class="max-sm:btn-sm btn btn-error">Join</nuxt-link>
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
