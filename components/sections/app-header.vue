<template>
	<header class="navbar bg-base-200 px-10">
		<div class="flex-1">
			<nuxt-link href="/" class="text-2xl font-extrabold">Skyra</nuxt-link>
		</div>
		<div class="flex-none">
			<div class="flex-auto text-lg sm:py-2"></div>
			<div>
				<button v-if="status === 'authenticated'" @click="signOut({ callbackUrl: '/' })" class="btn">
					<template v-if="data?.user">
						<span class="font-semibold">{{ data.user.name! }}</span>
						<div class="avatar pl-2">
							<div class="h-9 rounded-full">
								<img :src="data.user.image!" alt="Avatar" />
							</div>
						</div>
					</template>
				</button>
				<button v-else :disabled="status === 'loading'" @click="signIn()" class="btn">Login</button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
const { status, data, signOut, signIn } = useSession();
</script>
