<template>
	<icons-sokoban-empty>
		<rect :fill="colorWood" x="16" y="16" width="224" height="224" />

		<g :fill="colorWoodDarker">
			<path d="M 0 224 L 224 0 L 256 32 L 32 256 Z" />
			<path d="M 0 32 L 224 256 L 256 224 L 32 0 Z" />
		</g>

		<g :fill="colorWoodLighter">
			<rect x="0" y="0" width="16" height="256" />
			<rect x="240" y="0" width="16" height="256" />
			<rect x="0" y="0" width="256" height="16" />
			<rect x="0" y="240" width="256" height="16" />
		</g>

		<g :fill="colorMetal">
			<rect x="16" y="112" width="224" height="32" />
			<rect x="112" y="16" width="32" height="224" />
		</g>

		<g :fill="colorLight">
			<rect x="0" y="0" width="32" height="32" />
			<rect x="224" y="0" width="32" height="32" />
			<rect x="0" y="224" width="32" height="32" />
			<rect x="224" y="224" width="32" height="32" />
			<circle cx="128" cy="128" r="32" />
		</g>
	</icons-sokoban-empty>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		colorWoodLighter?: string;
		colorWood?: string;
		colorWoodDarker?: string;
		colorLight?: string;
		colorMetal?: string;
	}>(),
	{
		colorWoodLighter: '#a07451',
		colorWood: '#835937',
		colorWoodDarker: '#69411e',
		colorLight: '#b6b6b6',
		colorMetal: '#dadada'
	}
);
</script>
