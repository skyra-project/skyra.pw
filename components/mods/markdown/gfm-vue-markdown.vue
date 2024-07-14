// GfmVueMarkdown.vue
<script setup lang="ts">
import { computed } from 'vue';

// Importa i componenti personalizzati
import MdImage from '@/components/mods/markdown/image.vue';
import MdInlineCode from '@/components/mods/markdown/inline-code.vue';
import MdLink from '@/components/mods/markdown/link.vue';
import MdListItem from '@/components/mods/markdown/list-item.vue';
import MdOrderedList from '@/components/mods/markdown/ordered-list.vue';
import MdStrong from '@/components/mods/markdown/strong.vue';
import MdUnorderedList from '@/components/mods/markdown/unordered-list.vue';

interface Props {
	source: string;
}

const props = defineProps<Props>();

// Crea un oggetto ParsedContent dalla stringa source
const parsedContent = computed(() => ({
	body: props.source,
	_type: 'markdown',
	_id: 'dynamic-content',
	_source: 'content'
}));
</script>

<template>
	<ContentRendererMarkdown
		:value="parsedContent"
		:components="{
			img: MdImage,
			code: MdInlineCode,
			a: MdLink,
			li: MdListItem,
			ol: MdOrderedList,
			strong: MdStrong,
			ul: MdUnorderedList
		}"
	/>
</template>
