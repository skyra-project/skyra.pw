<template>
  <nav class="navbar is-unselectable is-transparent-navbar">
    <div class="container is-fluid">
      <div class="navbar-brand is-hidden-desktop">
        <router-link
          class="navbar-item"
          to="/"
          @click.native="showNav = false"
        >
          <img
            src="img/icons/icon-192x192.png"
            alt="Logo"
          >
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
