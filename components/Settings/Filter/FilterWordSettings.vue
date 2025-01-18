<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGuildSettingsChanges } from '@/composables/settings/useGuildSettingsChanges';
import { useGuildSettings } from '@/composables/settings/useGuildSettings';
import { bitwiseHas, bitwiseSet, removeNonAlphaNumeric, updateSliderValueObj } from '@/utils/util';

const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const newWord = ref('');

const addWord = () => {
	const word = removeNonAlphaNumeric(newWord.value).toLowerCase();
	if (word.length < 3 || guildSettings.value.selfmodFilterRaw.includes(word)) return;
	setGuildSettingsChanges({
		selfmodFilterRaw: [...guildSettings.value.selfmodFilterRaw, word]
	});
	newWord.value = '';
};

const removeWord = (wordToRemove: string) => {
	setGuildSettingsChanges({
		selfmodFilterRaw: guildSettings.value.selfmodFilterRaw.filter((word) => word !== wordToRemove)
	});
};

const updateSoftAction = (bit: number, checked: boolean) => {
	setGuildSettingsChanges({
		selfmodFilterSoftAction: bitwiseSet(guildSettings.value.selfmodFilterSoftAction, bit, checked)
	});
};

const thresholdMaximum = computed({
	get: () => guildSettings.value.selfmodFilterThresholdMaximum,
	set: (value) => setGuildSettingsChanges(updateSliderValueObj('selfmodFilterThresholdMaximum', value))
});

const thresholdDuration = computed({
	get: () => guildSettings.value.selfmodFilterThresholdDuration / 1000,
	set: (value) => setGuildSettingsChanges(updateSliderValueObj('selfmodFilterThresholdDuration', value, 1000))
});
</script>

<template>
	<div>
		<PresentationalLayoutsSettingsSection title="Word Filter">
			<div class="grid grid-cols-1 gap-4">
				<SelectsSelectBoolean
					:title="`Filter ${guildSettings.selfmodFilterEnabled ? 'Enabled' : 'Disabled'}`"
					@change="setGuildSettingsChanges({ selfmodFilterEnabled: $event })"
					:current-value="guildSettings.selfmodFilterEnabled"
					description="Whether or not this system should be enabled."
				/>
				<SelectsSelectBoolean
					:title="`Alerts ${bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b100) ? 'Enabled' : 'Disabled'}`"
					@change="updateSoftAction(0b100, $event)"
					:current-value="bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b100)"
					description="Toggle message alerts in the channel the infraction took place."
				/>
				<SelectsSelectBoolean
					:title="`Logs ${bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b010) ? 'Enabled' : 'Disabled'}`"
					@change="updateSoftAction(0b010, $event)"
					:current-value="bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b010)"
					description="Toggle message logs in the moderation logs channel."
				/>
				<SelectsSelectBoolean
					:title="`Deletes ${bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b001) ? 'Enabled' : 'Disabled'}`"
					@change="updateSoftAction(0b001, $event)"
					:current-value="bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b001)"
					description="Toggle message deletions."
				/>
			</div>
		</PresentationalLayoutsSettingsSection>

		<PresentationalLayoutsSettingsSection title="Punishments">
			<div class="grid grid-cols-2 gap-4">
				<SelectsSelect
					title="Action"
					helper-text="The action to perform as punishment"
					:value="guildSettings.selfmodFilterHardAction"
					@change="setGuildSettingsChanges({ selfmodFilterHardAction: $event as number | undefined })"
				>
					<option :value="0">None</option>
					<option :value="1">Warning</option>
					<option :value="2">Kick</option>
					<option :value="3">Mute</option>
					<option :value="4">Softban</option>
					<option :value="5">Ban</option>
				</SelectsSelect>
				<SelectsSelectDuration
					:value="guildSettings.selfmodFilterHardActionDuration"
					:min="1000"
					@change="setGuildSettingsChanges({ selfmodFilterHardActionDuration: $event })"
				/>
			</div>

			<div class="mt-4">
				<p>Maximum Threshold</p>
				<input v-model="thresholdMaximum" type="range" min="0" max="60" class="w-full" />
			</div>

			<div class="mt-4">
				<p>Threshold Duration (in seconds)</p>
				<input v-model="thresholdDuration" type="range" min="0" max="120" class="w-full" />
			</div>
		</PresentationalLayoutsSettingsSection>

		<PresentationalLayoutsSettingsSection title="Filtered Words">
			<form @submit.prevent="addWord">
				<div class="mb-2 flex items-center">
					<input v-model="newWord" class="mb-1 mr-1" placeholder="Add Word" />
					<button type="submit" class="btn btn-primary">Confirm</button>
				</div>
			</form>

			<div v-if="guildSettings.selfmodFilterRaw.length !== 0" class="p-1">
				<span
					v-for="word in guildSettings.selfmodFilterRaw"
					:key="word"
					class="badge badge-primary m-1 cursor-pointer"
					@click="removeWord(word)"
				>
					{{ word }}
				</span>
			</div>
		</PresentationalLayoutsSettingsSection>
	</div>
</template>
