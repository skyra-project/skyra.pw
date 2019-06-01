<template>
  <AppContent title="404">
    <h2 class="subtitle has-text-centered">
      Hello there! Did you get lost?
    </h2>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppContent from '../components/sections/AppContent.vue';
@Component({ components: { AppContent } })
export default class extends Vue {}
</script>
