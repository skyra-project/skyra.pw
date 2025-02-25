<template>
	<div class="bg-base-200 mt-2 rounded-md px-2 pt-2 pb-2 drop-shadow-lg sm:px-4 sm:pb-4">
		<span class="text-xs font-extrabold uppercase">You've been invited to join a server</span>
		<div class="mt-2 flex">
			<div class="bg-base-content/20 flex h-8 w-8 items-center justify-center rounded-xl sm:h-12 sm:w-12">
				<icons-wolfstar class="text-base-content h-32 w-32 p-1" />
			</div>
			<div class="ml-4 flex-grow">
				<nuxt-link class="font-bold" :to="link">WolfStar Lounge</nuxt-link>
				<div class="flex flex-row items-center">
					<span class="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-green-500 sm:h-2 sm:w-2"></span>
					<span>{{ online.toLocaleString() }} Online</span>

					<span class="bg-base-content/80 mr-1 ml-2 inline-block h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 md:ml-4"></span>
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
