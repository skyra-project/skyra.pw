<template>
  <nav class="navbar is-unselectable is-transparent-navbar">
    <div class="container is-fluid">
      <div class="navbar-brand is-hidden-desktop">
        <router-link
          class="navbar-item"
          to="/"
          @click.native="showNav = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 248.5 497"
            width="1.5rem"
            height="1.5rem"
          ><defs><svg:style>.cls-1{fill:#4e5d94;}.cls-1,.cls-2{fill-opacity:1;}.cls-2{fill:#fff;}</svg:style></defs><title>Logo</title><g
            id="Layer_2"
            data-name="Layer 2"
          ><g
            id="Layer_1-2"
            data-name="Layer 1"
          ><g
            id="Capa_2"
            data-name="Capa 2"
          ><path
            class="cls-1"
            d="M15.3,139.5v30.7L124.3,0,15.3,139.5m2.6-28-2.6,2.7v19.1L124.3,0,17.9,111.5M233.2,357.4V326.8L124.3,497,233.2,357.4m0,25.4V363.7L124.3,497,230.7,385.5Z"
          /><path
            class="cls-2"
            d="M17.9,111.5l-2.6-2.6L0,124.2v30.7l15.3,15.3v-56l2.6-2.7m49.6,49.6L124.3,0,15.3,170.2l72.5,72.4L181,335.8,124.3,497,233.2,326.8,67.5,161.1M233.2,363.7v19.1l-2.5,2.7,2.5,2.5,15.3-15.3V342.1l-15.3-15.3v36.9Z"
          /></g><g
            id="Capa_5"
            data-name="Capa 5"
          ><path
            class="cls-2"
            d="M52,248.8H47.7L73,274.1H98.1L0,176.1v20.7l52,52m144.5-.7h4.4l-25.3-25.3H150.5l98,98V300.1Z"
          /></g></g></g></svg>
          <h1 class="subtitle">
            Skyra
          </h1>
        </router-link>
        <div
          class="navbar-burger"
          :class="{ 'is-active': showNav }"
          @click="showNav = !showNav"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div
        class="navbar-menu"
        :class="{ 'is-active': showNav }"
      >
        <div class="navbar-end">
          <template v-for="section in sections">
            <router-link
              v-if="!section.children"
              :key="section.name"
              :to="section.link"
              class="navbar-item is-5 is-marginless"
              @click.native="showNav = false"
            >
              {{ section.name }}
            </router-link>
            <b-dropdown
              v-else
              :key="section.name"
              class="navbar-item is-5 is-marginless"
              aria-role="list"
              hoverable
            >
              <a
                v-if="section.link"
                slot="trigger"
                :href="`#${section.link}`"
                class="navbar-item is-5 is-marginless is-paddingless"
              >{{ section.name }}</a>
              <a
                v-else
                slot="trigger"
                class="navbar-item is-5 is-marginless is-paddingless"
              >{{ section.name }}</a>

              <b-dropdown-item
                v-for="subs in section.children"
                :key="subs.name"
                aria-role="listitem"
                has-link
              >
                <router-link
                  :to="subs.link"
                  class="navbar-item"
                  @click.native="showNav = false"
                >
                  {{ subs.name }}
                </router-link>
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AppNavbar extends Vue {
    public showNav: boolean = false;
    public sections: NavbarElement[] = [
        {
            name: 'About',
            link: '/about'
        },
        {
            name: 'Commands',
            link: '/commands'
        }
    ];
}

interface NavbarElement {
    name: string;
    link: string;
    children?: NavbarElement[];
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all';
@include desktop {
  .is-transparent-navbar {
    background-color: transparent !important;
  }
}
</style>

<style lang="scss">
div.dropdown {
  padding: 0 0 0 0 !important;
  color: unset !important;
  div.dropdown-trigger {
    width: 100% !important;
    height: 100% !important;
    a.navbar-item {
      padding: 0.5rem 0.75rem !important;
    }
  }
}
</style>
