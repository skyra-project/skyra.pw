<template>
	<header class="bg-zinc-100 dark:bg-zinc-900">
		<div class="container mx-auto flex flex-col items-center px-5 py-4 sm:flex-row">
			<div class="flex-auto text-lg sm:py-2">
				<nuxt-link href="/" class="text-2xl font-extrabold hover:text-zinc-700 hover:dark:text-zinc-400">Skyra</nuxt-link>
			</div>
			<div>
				<button
					v-if="status === 'authenticated'"
					@click="signOut({ callbackUrl: '/' })"
					class="flex items-center gap-2 rounded-lg bg-zinc-200 p-2 shadow-sm hover:bg-zinc-300"
				>
					{{ data }}
					<template v-if="data?.user">
						<span class="font-semibold">{{ data.user.name! }}</span>
						<img :src="data.user.image!" class="w-10 rounded-full" />
					</template>
				</button>
				<button
					v-else
					:disabled="status === 'loading'"
					@click="signIn()"
					class="items-center rounded-lg bg-zinc-200 p-2 shadow-sm hover:bg-zinc-300"
				>
					Login
				</button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
const { status, data, signOut, signIn } = useSession();
</script>
