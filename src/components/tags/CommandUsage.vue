<template>
  <b-taglist v-if="usage">
    <b-tag
      v-for="(tag, index) in tags"
      :key="index"
      rounded
      type="is-light"
    >
      {{ tag }}
    </b-tag>
  </b-taglist>
</template>

<script lang="ts">
/// <reference path="../../../node_modules/vuex/types/vue.d.ts" />
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
	@Prop({ type: String, required: true }) public usage!: string;

	get tags() {
	    const split = this.usage.split(' ');
	    if (split[split.length - 1] === '[...]') {
	        split.pop();
	        split[split.length - 1] += ' [...]';
	    }
	    return split;
	}
}
</script>
