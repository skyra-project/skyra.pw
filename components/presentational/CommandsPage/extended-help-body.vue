<template>
	<gfm-vue-markdown :source="processedBody" />
</template>

<script lang="ts" setup>
import GfmVueMarkdown from '@/components/mods/markdown/gfm-vue-markdown.vue';
import { EmojiRegexExtractName } from '@/utils/constants';

interface ExtendedHelpBodyProps {
	body: string;
}

const props = defineProps<ExtendedHelpBodyProps>();

const processedBody = computed(() => {
	return props.body.replace(EmojiRegexExtractName, '$1');
});
</script>

<style scoped>
/* Aggiungi eventuali stili personalizzati */
</style>
