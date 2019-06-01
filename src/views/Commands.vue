<template>
  <AppContent title="Commands">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
    />
    <div
      v-for="([title, visible, commands], index) in categories"
      :key="title"
    >
      <b-collapse
        :aria-id="title"
        :open.sync="categories[index][1]"
      >
        <div
          slot="trigger"
        >
          <div class="has-text-centered">
            <b-button :type="visible ? 'is-success' : 'is-light'">
              {{ title }}
            </b-button>
            <p><br></p>
          </div>
        </div>
        <div class="columns is-multiline">
          <div
            v-for="command in commands"
            :key="command.name"
            class="column is-half"
          >
            <div class="box">
              <div class="level">
                <div class="level-left">
                  <h2 class="subtitle">
                    {{ command.name }}
                  </h2>
                </div>
                <div class="level-right">
                  <b-tooltip
                    v-if="command.permissionLevel"
                    :label="titles[command.permissionLevel]"
                    type="is-light"
                  >
                    <b-tag type="is-info">
                      {{ command.permissionLevel }}
                    </b-tag>
										&nbsp;
                  </b-tooltip>
                  <b-tooltip
                    v-if="!command.guildOnly"
                    label="This command can be run in Direct Messages."
                    type="is-light"
                  >
                    <b-tag type="is-success">
                      <b-icon
                        pack="fas"
                        icon="user-check"
                        size="is-small"
                      />
                    </b-tag>
										&nbsp;
                  </b-tooltip>
                  <b-tooltip
                    v-if="command.guarded"
                    label="This command cannot be disabled."
                    type="is-light"
                  >
                    <b-tag type="is-warning">
                      <b-icon
                        pack="fas"
                        icon="user-shield"
                        size="is-small"
                      />
                    </b-tag>
										&nbsp;
                  </b-tooltip>
                  <template v-if="command.cooldown">
                    <b-tooltip
                      :label="`Can be used ${command.bucket} ${command.bucket === 1 ? 'time' : 'times'} every ${command.cooldown} seconds.`"
                      type="is-light"
                    >
                      <b-taglist attached>
                        <b-tag type="is-light">
                          {{ command.cooldown }}
                        </b-tag>
                        <b-tag type="is-info">
                          {{ command.bucket }}
                        </b-tag>
                      </b-taglist>
                    </b-tooltip>
                  </template>
                </div>
              </div>
              <hr>
              <CommandUsage :usage="command.usage" />
              <RichParagraph :value="command.description" />
            </div>
          </div>
        </div>
        <hr>
      </b-collapse>
    </div>
  </AppContent>
</template>

<script lang="ts">
/// <reference path="../../../node_modules/vuex/types/vue.d.ts" />
/// <reference lib="dom" />
import { Component, Vue } from 'vue-property-decorator';
import AppContent from '../components/sections/AppContent.vue';
import CommandUsage from '../components/tags/CommandUsage.vue';
import RichParagraph from '../components/text/RichParagraph.vue';

@Component({ components: { AppContent, CommandUsage, RichParagraph } })
export default class extends Vue {
    public readonly resetTime = 1000 * 60 * 60 * 24;
    public titles = {
        4: 'This command can only be run by staff members.',
        5: 'This command can only be run by moderators and administrators.',
        6: 'This command can only be run by administrators.'
    };
    public isLoading = false;

    beforeMount() {
        if (!this.$store.state.session.commands
			|| !this.$store.state.session.lastFetched
			|| this.$store.state.session.lastFetched < Date.now() - this.resetTime)
            this.fetchCommands();
    }

    get categories() {
        return this.$store.state.session.commands;
    }

    async fetchCommands() {
        this.isLoading = true;
        this.$store.commit('clearCommands');
        const categories: [string, boolean, Command[]][] = [];
        try {
            const result = await fetch('https://api.skyra.pw/commands');
            if (!result.ok) {
                throw result.statusText;
            }
            const response = await result.json() as { success: boolean; data: Command[] };
            for (const command of response.data) {
                const category = categories.find(([name]) => command.category === name);
                if (category) {
                    category[2].push(command);
                } else {
                    const index = categories.findIndex(([name]) => name > command.category);
                    if (index === -1) categories.push([command.category, false, [command]]);
                    else categories.splice(index, 0, [command.category, false, [command]]);
                }
            }
            categories[0][1] = true;
            this.$store.commit('setCommands', categories);
        } catch (error) {
            console.error('Failed to fetch commands:', error);
        }
        this.isLoading = false;
    }
}

interface Command {
    bucket: number;
    category: string;
    cooldown: number;
    description: string;
    guarded: boolean;
    guildOnly: boolean;
    name: string;
    permissionLevel: number;
    requiredPermissions: string[];
    usage: string;
}
</script>
