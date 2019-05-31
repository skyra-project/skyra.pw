<template>
  <a
    class="button is-white"
    :class="{fill:dark && holdTime > 100}"
    @mousedown.left="start"
    @mouseleave.left="stop"
    @mouseup.left="stop"
    @touchstart.prevent="start"
    @touchend="stop"
    @touchcancel="stop"
  >
    <span>{{ dark ? theme === 'dark black' ? 'Noir' : 'Dark' : 'Light' }} Theme</span>
    <span class="icon">
      <i :class="dark ? 'fas fa-moon' : 'fas fa-sun'" />
    </span>
  </a>
</template>

<script lang="ts">
/// <reference path="../../../node_modules/vuex/types/vue.d.ts" />
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ToggleDark extends Vue {
    private interval: NodeJS.Timeout = null;
    private holdTime: number = 0;
    private holdFinish: boolean = false;
    private get dark() {
        return this.theme !== 'light';
    }
    private get theme() {
        return this.$store.state.local.theme;
    }
    private get darkTheme() {
        return this.$store.state.local.darkTheme;
    }
    public start() {
        if (this.interval === null) {
            const started = Date.now();
            this.interval = setInterval(() => {
                this.holdTime = Date.now() - started;
                if (this.dark && !this.holdFinish && this.holdTime > 1000) {
                    this.holdFinish = true;
                    const nextTheme = this.theme === 'black' ? 'dark' : 'dark black';
                    this.$store.commit('setTheme', nextTheme);
                    this.$store.commit('setDarkTheme', nextTheme);
                }
            }, 30);
        }
    }
    public stop() {
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
            if (this.holdTime < 200) {
                this.$store.commit('setTheme', this.dark ? 'light' : this.darkTheme);
            }
        }
        this.holdTime = 0;
        this.holdFinish = false;
    }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all';
.fill {
  animation: sweep 1s forwards;
  animation-timing-function: cubic-bezier(.64,1.65,.13,-1.21);
}
@keyframes sweep {
  0% {
    background-color: $grey-dark;
  }
  100% {
    background-color: $black;
  }
}
</style>
