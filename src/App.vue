<template>
  <div
    id="app"
    class="site"
    :class="theme"
  >
    <AppNavbar />
    <div class="title is-hidden-touch banner is-marginless is-vcentered">
      <img
        src="img/icons/icon-32x32.png"
        alt="Logo"
        width="32"
        height="32"
      >
      <router-link
        to="/"
        class="is-inline-flex"
      >
        Skyra
      </router-link>
    </div>
    <img
      id="left"
      class="is-unselectable"
      alt="left-circle"
    >
    <img
      id="right"
      class="is-unselectable"
      alt="right-circle"
    >
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
  span.icon.background-rounded {
    padding: 1em;
    background-color: $red;
    color: whitesmoke;
    border-radius: 100%;
    margin-bottom: 0.56em;
  }
  a.navbar-item {
    &:hover, &:focus {
      color: $red !important;
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
  @import './style.scss';
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
  $cyan:  hsl(204, 86%, 45%);
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
      color: $red !important;
    }
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
  @import './style.scss';
}
.dark {
  background-color: hsl(210, 4%, 10%);
  @extend %dark-shared;
}
.black {
  background-color: hsl(0, 0%, 0%);
  @extend %dark-shared;
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
  background: hsl(0, 100%, 29%);
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
  img#left, img#right {
    display: none;
  }
}
@include desktop {
  .site {
    background-image: url('../public/svg/bg.svg');
    background-repeat: no-repeat;
    background-size: 100vw 24em;
    h1.site-header {
      padding-top: 1em;
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
  img#left {
    content:url('../public/svg/left.svg');
    position: absolute;
    top: 9em;
    height: 11em;
  }
  img#right {
    content:url('../public/svg/right.svg');
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
    &:hover {
      color: hsl(49, 80%, 50%) !important;
    }
    img {
      display: inline-block;
      width: 32px !important;
      height: 32px !important;
    }
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
