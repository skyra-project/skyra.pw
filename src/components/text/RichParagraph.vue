<template>
  <p>
    <template v-for="tag in parsed">
      <RichEmoji
        v-if="tag.type === 'emoji'"
        :key="tag.value"
        :emoji="tag.value"
      />
      <template v-else>
        {{ tag.value }}
      </template>
    </template>
  </p>
</template>

<script lang="ts">
/// <reference path="../../../node_modules/vuex/types/vue.d.ts" />
import { Component, Vue, Prop } from 'vue-property-decorator';
import RichEmoji from './RichEmoji.vue';

@Component({ components: { RichEmoji } })
export default class extends Vue {
	@Prop({ type: String, required: true }) public value!: string;

	get parsed(): Tag[] {
	    const regExp = /<a?:\w{2,32}:\d{17,18}>/g;
	    const parsed: Tag[] = [];

	    let previous = 0;
	    let match: RegExpExecArray | null;
	    while ((match = regExp.exec(this.value)) !== null) {
	        if (previous !== match.index) {
	            parsed.push({ type: 'text', value: this.value.slice(previous, match.index) });
	        }
	        previous = regExp.lastIndex;
	        parsed.push({ type: 'emoji', value: match[0] });
	    }
	    if (previous < this.value.length) parsed.push({ type: 'text', value: this.value.slice(previous) });
	    return parsed;
	}
}

interface Tag {
    type: string;
    value: string;
}
</script>
