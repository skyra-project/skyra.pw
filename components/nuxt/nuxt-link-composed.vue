<script setup lang="ts">
import { computed } from 'vue';

interface NuxtLinkComposedProps {
	to: string | object;
	linkAs?: string;
	replace?: boolean;
	scroll?: boolean;
	shallow?: boolean;
	prefetch?: boolean;
	locale?: string;
	[key: string]: any; // per altre props
}

const props = defineProps<NuxtLinkComposedProps>();

const linkProps = computed(() => ({
	to: props.to,
	replace: props.replace,
	prefetch: props.prefetch !== false, // Nuxt prefetch è true di default
	scroll: props.scroll
}));

// Filtra le props non standard di NuxtLink
const otherProps = computed(() => {
	const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...rest } = props;
	return rest;
});
</script>

<template>
	<NuxtLink v-bind="linkProps" custom v-slot="{ navigate }">
		<span
			@click="navigate"
			@keypress.enter="navigate"
			role="link"
			tabindex="0"
			:style="{ textDecoration: 'none', cursor: 'pointer' }"
			v-bind="otherProps"
		>
			<slot></slot>
			<span class="text-body-2 text-primary">
				<slot name="anchor"></slot>
			</span>
		</span>
	</NuxtLink>
</template>

<style scoped>
.text-body-2 {
	font-size: 0.875rem;
	line-height: 1.43;
}

.text-primary {
	color: inherit;
}
</style>
