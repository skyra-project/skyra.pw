<template>
  <section class="section columns">
    <div class="container column is-two-thirds">
      <h1 class="title site-header has-text-centered">
        {{ title }}
      </h1>
      <hr>
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class AppFooter extends Vue {
  @Prop() title!: string;
}
</script>
