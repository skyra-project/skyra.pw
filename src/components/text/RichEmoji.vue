<template>
  <b-tooltip
    :label="name"
    type="is-light"
  >
    <span class="icon">
      <img
        :src="link"
        :alt="name"
      >
    </span>
  </b-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
	@Prop({ type: String, required: true }) public emoji!: string;

	get animated() {
	    return this.emoji.startsWith('<a:');
	}

	get name() {
	    const start = this.emoji.indexOf(':') + 1;
	    const end = this.emoji.lastIndexOf(':');
	    return this.emoji.slice(start, end);
	}

	get id() {
	    const start = this.emoji.lastIndexOf(':') + 1;
	    const end = this.emoji.lastIndexOf('>');
	    return this.emoji.slice(start, end);
	}

	get link() {
	    return `https://cdn.discordapp.com/emojis/${this.id}.${this.animated ? 'gif' : 'png'}`;
	}
}
</script>

<style lang="scss" scoped>
span.icon {
	height: 1em !important;
	width: 1em !important;
	img {
		height: 1em !important;
	}
}
</style>
