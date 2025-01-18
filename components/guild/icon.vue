<template>
	<div :class="['overflow-hidden rounded-full', size ? `w-${size} h-${size}` : '']">
		<picture v-if="guild?.icon && !isDefault">
			<source
				v-if="isAnimated"
				media="(prefers-reduced-motion: no-preference), (prefers-reduced-data: no-preference)"
				type="image/gif"
				:srcset="makeSrcset('gif')"
			/>
			<source type="image/webp" :srcset="makeSrcset('webp')" />
			<source type="image/png" :srcset="makeSrcset('png')" />
			<img :src="makeSrcset('png')" :alt="guild.name" class="h-full w-full object-cover" decoding="async" crossorigin="anonymous" />
		</picture>
		<div v-else class="bg-gray-800 flex h-full w-full items-center justify-center text-white">
			<span class="text-lg font-bold">{{ acronym }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ValuesType } from 'utility-types';
import type { TransformedLoginData } from '~/utils/types/ApiData';

interface GuildIconProps {
	guild?: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	size?: string;
}

const props = defineProps<GuildIconProps>();

const isDefault = ref(true);
const isAnimated = ref(false);

watch(
	() => props.guild,
	(guild) => {
		if (guild?.icon) {
			isDefault.value = false;
			isAnimated.value = guild.icon.startsWith('a_');
		} else {
			isDefault.value = true;
			isAnimated.value = false;
		}
	},
	{ immediate: true }
);

const acronym = computed(() => {
	return props.guild ? getAcronym(props.guild.name) : '';
});

function makeSrcset(format: 'webp' | 'png' | 'gif') {
	if (!props.guild || !props.guild.icon) return '';
	return [64, 128, 256, 512].map((size) => `${displayIconURL(props.guild!, { format, size })} ${size / 64}x`).join(', ');
}
</script>
