<script setup>
import { useColorMode } from '@vueuse/core';

const mode = useColorMode({
	attribute: 'data-theme',
	selector: 'data-theme',
	emitAuto: true
});
</script>
<template>
	<label class="swap swap-rotate">
		<!-- controlliamo lo stato direttamente con colorMode.preference -->

		<template>
			<UButton
				:icon="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
				color="neutral"
				variant="ghost"
				@click="mode = mode === 'dark' ? 'light' : 'dark'"
			/>
		</template>
	</label>
</template>
