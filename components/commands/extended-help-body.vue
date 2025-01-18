<template>
	<vue-markdown :source="processedBody" :plugins="plugins" :options="markdownOptions" />
</template>

<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import MarkdownItAnchor from 'markdown-it-anchor';
import { EmojiRegexExtractName } from '@/utils/constants';

interface ExtendedHelpBodyProps {
	body: string;
}

const props = defineProps<ExtendedHelpBodyProps>();

// Plugin markdown-it-anchor
const plugins = [MarkdownItAnchor];

// Opzioni di configurazione markdown
const markdownOptions = {
	html: true,
	linkify: true,
	typographer: true
};

const processedBody = computed(() => {
	return props.body.replace(EmojiRegexExtractName, '$1');
});
</script>

<style scoped>
:deep(.markdown-body) {
	@apply prose-stone prose max-w-none;
}
:deep(a) {
	@apply link link-primary;
}
:deep(code) {
	@apply rounded bg-base-200 px-1 py-0.5;
}
</style>
