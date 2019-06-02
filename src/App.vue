<template>
  <div
    id="app"
    class="site"
    :class="theme"
  >
    <AppNavbar />
    <div class="title is-hidden-touch banner is-marginless is-vcentered">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 248.5 497"
        width="2.5rem"
        height="2.5rem"
      ><defs><svg:style>.cls-1{fill:#4e5d94;}.cls-1,.cls-2{fill-opacity:1;}.cls-2{fill:#fff;}</svg:style></defs><title>Logo</title><g
        data-name="Layer 2"
      ><g
        data-name="Layer 1"
      ><g
        data-name="Capa 2"
      ><path
        class="cls-1"
        d="M15.3,139.5v30.7L124.3,0,15.3,139.5m2.6-28-2.6,2.7v19.1L124.3,0,17.9,111.5M233.2,357.4V326.8L124.3,497,233.2,357.4m0,25.4V363.7L124.3,497,230.7,385.5Z"
      /><path
        class="cls-2"
        d="M17.9,111.5l-2.6-2.6L0,124.2v30.7l15.3,15.3v-56l2.6-2.7m49.6,49.6L124.3,0,15.3,170.2l72.5,72.4L181,335.8,124.3,497,233.2,326.8,67.5,161.1M233.2,363.7v19.1l-2.5,2.7,2.5,2.5,15.3-15.3V342.1l-15.3-15.3v36.9Z"
      /></g><g
        data-name="Capa 5"
      ><path
        class="cls-2"
        d="M52,248.8H47.7L73,274.1H98.1L0,176.1v20.7l52,52m144.5-.7h4.4l-25.3-25.3H150.5l98,98V300.1Z"
      /></g></g></g></svg>
      <router-link
        to="/"
        class="is-inline-flex"
      >
        Skyra
      </router-link>
    </div>
    <svg
      id="left"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 242 484"
    ><defs><svg:style>.cls-1{fill:url(#bg-linear-gradient);}</svg:style><linearGradient
      id="bg-linear-gradient"
      x1="167.12"
      y1="94.65"
      x2="-52.67"
      y2="404.19"
      gradientUnits="userSpaceOnUse"
    ><stop
      offset="0"
      stop-color="#869bee"
    /><stop
      offset="1"
      stop-color="#3fffd1"
      stop-opacity="0"
    /></linearGradient></defs><title>left</title><g
      data-name="Layer 2"
    ><g
      data-name="Layer 1"
    ><path
      class="cls-1"
      d="M0,0C133.65,0,242,108.35,242,242S133.65,484,0,484"
    /></g></g></svg>
    <svg
      id="right"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 209.25 552"
    ><defs><svg:style>.cls-1{fill:url(#linear-gradient);}</svg:style><linearGradient
      id="linear-gradient"
      x1="303.65"
      y1="100.13"
      x2="67.58"
      y2="432.59"
      gradientUnits="userSpaceOnUse"
    ><stop
      offset="0"
      stop-color="#869bee"
    /><stop
      offset="1"
      stop-color="#3fffd1"
      stop-opacity="0"
    /></linearGradient></defs><title>right</title><g
      data-name="Layer 2"
    ><g
      data-name="Layer 1"
    ><path
      class="cls-1"
      d="M209.25,0A118.07,118.07,0,0,0,107,59L15.82,217a118.06,118.06,0,0,0,0,118.06L107,493a118.07,118.07,0,0,0,102.25,59"
    /></g></g></svg>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view class="site-content" />
    </transition>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppNavbar from './components/sections/AppNavbar.vue';
import AppFooter from './components/sections/AppFooter.vue';
@Component({
    components: {
        AppNavbar,
        AppFooter
    }
})
export default class Home extends Vue {
    public get theme() {
        return this.$store.state.local.theme as 'light' | 'dark' | 'black';
    }
}
</script>

<style lang="scss">
@import './style.scss';

html {
  scroll-behavior: smooth;
}
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.site-content {
  flex: 1 0 auto;
}
.light {
  $red:  hsl(0, 100%, 29%);
  $orange:  hsl(14, 100%, 47%);
  $yellow:  hsl(49, 80%, 50%);
  $cyan: hsl(204, 86%, 53%);
  span.icon.background-rounded {
    padding: 1em;
    background-color: $red;
    color: whitesmoke;
    border-radius: 100%;
    margin-bottom: 0.56em;
  }
  a.navbar-item {
    &:hover, &:focus {
      color: $cyan !important;
    }
  }
  // Import Bulma's core
  @import '~bulma/sass/utilities/_all';
  $menu-item-active-background-color: $info;
  $menu-item-hover-background-color: $light;
  $navbar-dropdown-background-color: $white-ter;
  $navbar-background-color: $white-ter;
  $footer-background-color: $white-ter;
  $table-row-active-background-color: $red;
  color: $black-ter;
  // Import Bulma and Buefy styles
  @import '~bulma';
  @import '~buefy/src/scss/buefy';
}
%dark-shared {
  $light:  hsl(0, 0%, 18%);
  $black:  hsl(0, 0%, 96%);
  $black-bis:  hsl(0, 0%, 93%);
  $black-ter:  hsl(0, 0%, 86%);
  $grey-darker:  hsl(0, 0%, 83%);
  $grey-dark:  hsl(0, 0%, 80%);
  $grey:  hsl(0, 0%, 52%);
  $grey-light:  hsl(0, 0%, 29%);
  $grey-lighter:  hsl(0, 0%, 14%);
  $white-ter:  hsl(240, 2%, 12%);
  $white-bis:  hsl(180, 2%, 9%);
  $white:  hsl(0, 0%, 6%);
  $red:  hsl(348, 92%, 49%);
  $orange:  hsl(14, 100%, 47%);
  $yellow:  hsl(49, 80%, 50%);
  $green:  hsl(141, 71%, 40%);
  $turquoise:  hsl(171, 100%, 35%);
  $cyan:  hsl(204, 86%, 53%);
  $blue:  hsl(217, 71%, 49%);
  $purple:  hsl(271, 100%, 29%);
  $message-background-color: rgba(255, 255, 255, 0.247) !important;
  $message-body-color: $black-bis !important;
  $body-background-color: $black;
  $body-color: $black-ter;
  $strong-color: $black-bis;
  $table-row-active-background-color: $red;
  color: $grey-darker;
  input[type="text"], textarea {
    background-color: $white-ter;
    color: $grey-darker;
  }
  span.icon.background-rounded {
    padding: 1em;
    background-color: $red;
    color: whitesmoke;
    border-radius: 100%;
    margin-bottom: 0.56em;
  }
  a.navbar-item {
    &:hover, &:focus {
      color: $cyan !important;
    }
  }
  div.navbar-menu {
    box-shadow: 0 0;
  }
  // Import Bulma's core
  @import '~bulma/sass/utilities/_all';
  $menu-item-active-background-color: $info;
  $menu-item-hover-background-color: $light;
  $navbar-dropdown-background-color: $white-ter;
  $navbar-background-color: $white-ter;
  $footer-background-color: $white-ter;
  // Import Bulma and Buefy styles
  @import '~bulma';
  @import '~buefy/src/scss/buefy';
}
.dark {
  background-color: hsl(210, 4%, 10%);
  @extend %dark-shared;
}
.dark.black {
  background-color: hsl(0, 0%, 0%);
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-track {
  display: none;
}
::-webkit-scrollbar-thumb {
  background: hsl(204, 86%, 53%);
}
::-webkit-scrollbar-corner {
  display: none;
}
body {
  width: 100vw;
  overflow-x: hidden;
}
p.is-multiline-text {
  white-space: pre-wrap;
}
// Add 256x256
$dimensions: 16 24 32 48 64 96 128 256 !default;
@import '~bulma';
@import '~buefy/src/scss/buefy';
@include until($desktop) {
  .site {
    h1.site-header {
      +hr {
        display: block;
        margin-bottom: 20px;
        +h2 {
          display: none;
        }
      }
    }
  }
  svg#left, svg#right {
    display: none;
  }
}

@include desktop {
  .site {
    background-image: url('../public/svg/bg.svg');
    background-repeat: no-repeat;
    background-size: 100vw 28em;
    h1.site-header {
      padding-top: 1.4em;
      padding-bottom: 0.2em;
      margin-bottom: 0px !important;
      color: whitesmoke;
      font-size: 3.5rem;
      padding-bottom: 4em;
      +hr {
        display: none;
      }
    }
  }
  svg#left {
    position: absolute;
    top: 9em;
    height: 11em;
  }
  svg#right {
    position: absolute;
    top: 4em;
    height: 14em;
    right: -6px;
  }
}
div.title.banner {
  align-items: center;
  font-size: 2.5rem;
  position: absolute;
  left: 3vw;
  top: 1em;
  a {
    display: inline-block;
    color: whitesmoke !important;
    p {
      display: inline-block;
    }
  }
  & > * {
    vertical-align: center;
  }
}
</style>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
