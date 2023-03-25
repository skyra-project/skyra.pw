<template>
	<vite-pwa-manifest />
	<nuxt-loading-indicator />
	<nuxt-layout name="main">
		<nuxt-page />
	</nuxt-layout>
</template>

<script setup lang="ts">
import { configure } from 'vee-validate';
import { defineCustomElements } from '@skyra/discord-components-core/loader';

defineCustomElements();

watch(usePreferredColorScheme(), (value) => {
	document.documentElement.setAttribute('data-theme', value);
});
configure({
	validateOnBlur: true,
	validateOnChange: true,
	validateOnInput: true,
	validateOnModelUpdate: true
});
</script>
