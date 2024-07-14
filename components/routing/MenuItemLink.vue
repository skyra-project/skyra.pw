<template>
	<Link :href="href" :forceSameTab="forceSameTab" class="menu-link">
		<div class="flex items-center">
			<component :is="icon" class="mr-2" />
			<span>{{ text }}</span>
		</div>
	</Link>
</template>

<script setup lang="ts">
import type { FunctionalComponent, SVGAttributes } from 'vue';
import Link from './Link.vue';

interface MenuItemLinkProps {
	href: string;
	text: string;
	icon: FunctionalComponent<SVGAttributes>;
	forceSameTab?: boolean;
}

const props = defineProps<MenuItemLinkProps>();
</script>

<style scoped>
.menu-link {
	@apply text-gray-700 hover:bg-gray-100 block px-4 py-2;
}
</style>
