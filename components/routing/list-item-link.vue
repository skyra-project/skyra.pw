<template>
	<RoutingLink ref="linkRef" :href="href" :force-same-tab="forceSameTab" class="menu-link">
		<li :class="computedClass" :disabled="listItemDisabled" @click="handleClick">
			<component :is="NuxtIcon" class="mr-2" />
			<span>{{ itemText }}</span>
		</li>
	</RoutingLink>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

interface ListItemLinkProps {
	href: string;
	itemText: string;
	listItemDisabled: boolean;
	listItemDense?: boolean;
	listItemSx?: Record<string, any>;
	NuxtIcon?: FunctionalComponent;
	forceSameTab?: boolean;
	listItemOnClick: () => void;
}

const props = defineProps<ListItemLinkProps>();
const linkRef = ref<HTMLElement | null>(null);

const computedClass = computed(() => {
	let classes = 'flex items-center p-2 transition-colors cursor-pointer ';
	if (props.listItemDisabled) {
		classes += 'text-gray-400 cursor-not-allowed ';
	} else {
		classes += 'text-gray-700 hover:text-gray-900 ';
	}
	if (window.location.pathname === props.href) {
		classes += 'bg-gray-200';
	}
	return classes.trim();
});

const handleClick = (event: MouseEvent) => {
	if (!props.listItemDisabled) {
		props.listItemOnClick();
	}
};
</script>

<style scoped>
.menu-link {
	@apply text-gray-700 hover:text-gray-900 block cursor-pointer;
}
.menu-link:disabled {
	@apply text-gray-400 cursor-not-allowed;
}
</style>
