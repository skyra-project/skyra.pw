<template>
	<div class="bg-gray-900 relative flex min-h-screen items-center justify-center overflow-hidden text-white">
		<div class="bg-gradient-radial pointer-events-none absolute inset-0 from-red-500/10 to-transparent"></div>

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

			<div class="relative mx-auto max-w-md overflow-hidden rounded-xl border-2 border-dashed border-red-500 bg-red-500/10 p-6">
				<div class="relative pl-6 text-left font-mono text-red-500">
					<span class="animate-blink absolute left-4">&gt;</span>
					<pre class="whitespace-pre-line">{{ errorInfo.consoleMessage }}</pre>
				</div>
			</div>

			<div class="perspective-1000 relative mt-8 h-32">
				<span class="animate-hang relative -top-[100%] inline-block origin-bottom text-8xl"> 🦇 </span>
			</div>

			<p class="text-gray-500 mt-8 text-xl font-medium italic">
				{{ errorInfo.batMessage }}
			</p>

			<div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
				<button @click="$router.push('/')" class="btn btn-primary"><Icon name="mdi:home" class="mr-2" /> Return Home</button>
				<a href="https://join.wolfstar.rocks" target="_blank" class="btn btn-outline">
					<Icon name="mdi:forum" class="mr-2" /> Server Support
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ErrorType, errorMessages } from '~/types/errors';

const props = defineProps<{
	statusCode: number;
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
