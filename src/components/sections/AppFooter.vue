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
      <p>
        Designed by kyranet
        &nbsp;
        <b-tooltip
          label="Do you want to see my other creations? Check out all my code!"
          type="is-light"
        >
          <a
            href="https://github.com/kyranet"
            class="has-text-warning"
            target="_blank"
          >
            <b-icon
              pack="fab"
              icon="github"
              size="is-small"
            />
          </a>
        </b-tooltip>
        &nbsp;
        <b-tooltip
          label="Do you like the website? Consider donating at least 1 dollar!"
          type="is-light"
        >
          <a
            href="https://www.patreon.com/kyranet"
            class="has-text-warning"
            target="_blank"
          >
            <b-icon
              pack="fab"
              icon="patreon"
              size="is-small"
            />
          </a>
        </b-tooltip>
      </p>
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
