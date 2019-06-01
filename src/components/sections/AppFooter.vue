<template>
  <footer class="footer is-unselectable">
    <div class="container is-widescreen has-text-centered">
      <div class="columns is-vcentered">
        <div class="column">
          <ToggleDark style="margin-bottom: 0.5em;" />
          <p>
            <a
              href="https://twitter.com/SkyraBot"
              class="has-text-dark"
              target="_blank"
            >
              <b-icon
                pack="fab"
                size="is-medium"
                icon="twitter-square"
              />
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToggleDark from '../buttons/ToggleDark.vue';

@Component({
    components: {
        ToggleDark
    }
})
export default class AppFooter extends Vue {}
</script>
