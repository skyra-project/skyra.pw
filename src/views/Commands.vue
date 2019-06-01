<template>
  <AppContent title="Commands">
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
  </AppContent>
</template>

<script lang="ts">
/// <reference lib="dom" />
import { Component, Vue } from 'vue-property-decorator';
import AppContent from '../components/sections/AppContent.vue';
import CommandUsage from '../components/tags/CommandUsage.vue';
import RichParagraph from '../components/text/RichParagraph.vue';

@Component({ components: { AppContent, CommandUsage, RichParagraph } })
export default class extends Vue {
    public commands: Command[] = [];
    public titles = {
        4: 'This command can only be run by staff members.',
        5: 'This command can only be run by moderators and administrators.',
        6: 'This command can only be run by administrators.'
    };

    beforeMount() {
        this.fetchCommands();
    }

    async fetchCommands() {
        this.commands = [];
        try {
            // const result = await fetch('https://api.skyra.pw/commands');
            const result = await fetch('json/commands.json');
            if (!result.ok) {
                console.error(`[${result.status}] Failed to fetch commands.`);
                return;
            }
            const response = await result.json() as { success: boolean; data: Command[] };
            console.log(response);
            for (const command of response.data) this.commands.push(command);
        } catch (error) {
            console.error('Failed to fetch commands:', error);
        }
    }
}

interface Command {
    bucket: number;
    cooldown: number;
    description: string;
    extendedHelp: string;
    guildOnly: boolean;
    name: string;
    permissionLevel: number;
    usage: string;
}
</script>
