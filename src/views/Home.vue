<template>
  <AppContent title="Home">
    <p class="subtitle has-text-centered">
      Skyra is a feature rich multipurpose Discord Bot. With over 150 commands, you won't regret trying Skyra today.
    </p>
    <div class="columns is-centered">
      <div class="column is-half">
        <a
          class="button is-fullwidth"
          href="https://skyra.pw/join"
        >Support Server</a>
        <a
          class="button is-fullwidth"
          href="https://skyra.pw/invite"
        >Invite Skyra</a>
        <a
          class="button is-fullwidth"
          href="https://www.patreon.com/kyranet"
        >Donate</a>
      </div>
    </div>
  </AppContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppContent from '../components/sections/AppContent.vue';
@Component({ components: { AppContent } })
export default class extends Vue {}
</script>

<style lang="scss" scoped>
a.button {
  border-radius: 4px;
  padding: .5em 1em;
  text-align: center;
  justify-content: center;
  margin: 4px 0px 4px 0px;
  transition: 0.3s;
}

div.light a.button {
  color: rgb(74, 74, 74);
  background-color: rgba(209, 209, 209, 0.2);

  &:hover {
    color: deepskyblue;
    background-color: rgba(255, 255, 255, 1);
  }
}

div.dark a.button {
  color: rgb(204, 204, 204);
  background-color: rgba(56, 56, 56, 0.2);

  &:hover {
    color: deepskyblue;
    background-color: rgba(255, 255, 255, 1);
  }
}
</style>
