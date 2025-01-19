<template>
	<div class="bg-gray-900 relative flex min-h-screen items-center justify-center overflow-hidden text-white">
		<div class="bg-gradient-radial pointer-events-none absolute inset-0 from-red-500/10 to-transparent" />

		<div class="container relative z-10 mx-auto max-w-2xl p-8 text-center">
			<h1 class="mb-6 text-5xl font-extrabold tracking-tight text-red-500 drop-shadow-[3px_3px_0px_#2c1810] md:text-6xl">
				{{ errorInfo.title }}
			</h1>

			<div class="mb-8 text-2xl font-medium leading-relaxed text-red-100">
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
						<NuxtIcon name="mdi:alert-circle" class="absolute left-0 top-1 h-5 w-5 animate-pulse" />
						<pre class="whitespace-pre-line text-lg leading-relaxed">{{ errorInfo.consoleMessage }}</pre>
						<pre v-if="message" class="mt-4 whitespace-pre-line rounded-lg bg-red-500/15 p-4 shadow-inner">{{ message }}</pre>
					</div>

					<p class="mt-4 border-t border-red-500/20 pt-4 text-base italic text-red-500/70">
						{{ errorInfo.batMessage }}
					</p>

					<div class="mt-6 flex flex-col justify-center gap-5 border-t border-red-500/20 pt-6 sm:flex-row">
						<button class="group btn btn-primary transition-all hover:scale-105" @click="$router.push('/')">
							<NuxtIcon name="mdi:home" class="mr-2 transition-transform group-hover:-translate-y-0.5" />
							Return Home
						</button>
						<a href="https://join.wolfstar.rocks" target="_blank" class="group btn btn-outline transition-all hover:scale-105">
							<NuxtIcon name="mdi:forum" class="mr-2 transition-transform group-hover:-translate-y-0.5" />
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
import { ErrorType, errorMessages } from '~/utils/types/errors';

const props = defineProps<{
	statusCode: number;
	message: string | null;
}>();

const errorInfo = computed(() => errorMessages[props.statusCode as ErrorType] || errorMessages[ErrorType.INTERNAL_SERVER]);
</script>

<style scoped>
@keyframes hang {
	0%,
	100% {
		transform: rotate(188deg);
	}
	50% {
		transform: rotate(170deg);
	}
}

@keyframes blink {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}

.animate-hang {
	animation: hang 4s infinite;
}

.animate-blink {
	animation: blink 1s infinite;
}

.perspective-1000 {
	perspective: 1000px;
}
</style>
