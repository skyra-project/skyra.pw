<template>
	<div class="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
		<div class="bg-gradient-radial pointer-events-none absolute inset-0 from-red-500/10 to-transparent"></div>

		<div class="relative z-10 container mx-auto max-w-2xl p-8 text-center">
			<h1 class="mb-6 text-5xl font-extrabold tracking-tight text-red-500 drop-shadow-[3px_3px_0px_#2c1810] md:text-6xl">
				{{ errorInfo.title }}
			</h1>

			<div class="mb-8 text-2xl leading-relaxed font-medium text-red-100">
				<span class="inline-block rounded-md bg-red-500/10 px-3 py-1 font-mono font-bold text-red-500"> Error {{ statusCode }} </span>
				<span class="mt-6 block font-medium">
					{{ errorInfo.description }}
				</span>
			</div>

			<div
				class="relative mx-auto max-w-lg overflow-hidden rounded-xl border-2 border-dashed border-red-500/80 bg-red-500/10 shadow-lg transition-all hover:border-red-600"
			>
				<div class="p-8">
					<div class="relative pl-8 text-left font-mono text-red-600">
						<nuxt-icon name="mdi:alert-circle" class="absolute top-1 left-0 h-5 w-5 animate-pulse" />
						<pre class="text-lg leading-relaxed whitespace-pre-line">{{ errorInfo.consoleMessage }}</pre>
						<pre v-if="message" class="mt-4 rounded-lg bg-red-500/15 p-4 whitespace-pre-line shadow-inner">{{ message }}</pre>
					</div>

					<p class="mt-4 border-t border-red-500/20 pt-4 text-base text-red-500/70 italic">
						{{ errorInfo.batMessage }}
					</p>

					<div class="mt-6 flex flex-col justify-center gap-5 border-t border-red-500/20 pt-6 sm:flex-row">
						<button class="group btn btn-primary transition-all hover:scale-105" @click="() => clearError({ redirect: '/' })">
							<nuxt-icon name="mdi:home" class="mr-2 transition-transform group-hover:-translate-y-0.5" />
							Return Home
						</button>
						<a href="https://join.wolfstar.rocks" target="_blank" class="group btn btn-outline transition-all hover:scale-105">
							<nuxt-icon name="mdi:forum" class="mr-2 transition-transform group-hover:-translate-y-0.5" />
							Server Support
						</a>
					</div>
				</div>
			</div>

			<div class="perspective-1000 relative mt-12 h-36">
				<span class="animate-hang relative -top-[100%] inline-block origin-bottom text-8xl drop-shadow-lg filter"> 🦇 </span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const { error } = defineProps<{
	error: NuxtError;
}>();

const errorInfo = computed(() => {
	const statusCode = (error?.statusCode ?? ErrorType.INTERNAL_SERVER) as ErrorType;
	return errorMessages[statusCode];
});

const statusCode = (error?.statusCode as ErrorType) ?? ErrorType.INTERNAL_SERVER;
const message = error?.message ?? 'Something went wrong.';
</script>

<style scoped>
@keyframes hang {
	0%,
	100% {
		transform: rotate(15deg);
	}
	50% {
		transform: rotate(-15deg);
	}
}

.animate-hang {
	animation: hang 4s ease-in-out infinite;
}

.perspective-1000 {
	perspective: 1000px;
}
</style>
