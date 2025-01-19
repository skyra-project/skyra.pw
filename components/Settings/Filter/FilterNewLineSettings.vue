<script setup lang="ts">
import { useGuildSettings } from '~/composables/settings/useGuildSettings';
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';

import SelectsSelect from '~/components/SelectsSelects/SelectsSelect.vue';
import SelectsSelectDuration from '~/components/SelectsSelects/SelectsSelect-duration.vue';
import { bitwiseHas, bitwiseSet, updateSliderValueObj } from '~/utils/util';

const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const softActionEnabled = computed(() => ({
	alerts: bitwiseHas(guildSettings.value.selfmodNewlinesSoftAction, 0b100),
	logs: bitwiseHas(guildSettings.value.selfmodNewlinesSoftAction, 0b010),
	deletes: bitwiseHas(guildSettings.value.selfmodNewlinesSoftAction, 0b001)
}));

const updateSoftAction = (bit: number, checked: boolean) => {
	setGuildSettingsChanges({
		selfmodNewlinesSoftAction: bitwiseSet(guildSettings.value.selfmodNewlinesSoftAction, bit, checked)
	});
};
</script>

<template>
	<div>
		<PresentationalLayoutsSettingsSection title="Line Spam Filter">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<SelectsSelectBoolean
					:title="`Filter ${guildSettings.selfmodNewlinesEnabled ? 'Enabled' : 'Disabled'}`"
					:current-value="guildSettings.selfmodNewlinesEnabled"
					description="Whether or not this system should be enabled."
					@change="(value) => setGuildSettingsChanges({ selfmodNewlinesEnabled: value })"
				/>
				<SelectsSelectBoolean
					:title="`Alerts ${softActionEnabled.alerts ? 'Enabled' : 'Disabled'}`"
					:current-value="softActionEnabled.alerts"
					description="Toggle message alerts in the channel the infraction took place."
					@change="(value) => updateSoftAction(0b100, value)"
				/>
				<SelectsSelectBoolean
					:title="`Logs ${softActionEnabled.logs ? 'Enabled' : 'Disabled'}`"
					:current-value="softActionEnabled.logs"
					description="Toggle message logs in the moderation logs channel."
					@change="(value) => updateSoftAction(0b010, value)"
				/>
				<SelectsSelectBoolean
					:title="`Deletes ${softActionEnabled.deletes ? 'Enabled' : 'Disabled'}`"
					:current-value="softActionEnabled.deletes"
					description="Toggle message deletions."
					@change="(value) => updateSoftAction(0b001, value)"
				/>
			</div>
		</PresentationalLayoutsSettingsSection>

		<PresentationalLayoutsSettingsSection title="Punishments">
			<div class="flex flex-col gap-4 md:flex-row">
				<SelectsSelect
					title="Action"
					helper-text="The action to perform as punishment"
					:value="guildSettings.selfmodNewlinesHardAction"
					@change="
						(value: string | number | undefined) =>
							value && setGuildSettingsChanges({ selfmodNewlinesHardAction: typeof value === 'string' ? +value : value })
					"
				>
					<option :value="0">None</option>
					<option :value="1">Warning</option>
					<option :value="2">Kick</option>
					<option :value="3">Mute</option>
					<option :value="4">Softban</option>
					<option :value="5">Ban</option>
				</SelectsSelect>
				<SelectsSelectDuration
					:value="guildSettings.selfmodNewlinesHardActionDuration"
					:min="1000"
					@change="(duration: any) => setGuildSettingsChanges({ selfmodNewlinesHardActionDuration: duration })"
				/>
			</div>

			<div class="mt-4">
				<p>Maximum Threshold</p>
				<input
					type="range"
					min="0"
					max="60"
					:value="guildSettings.selfmodNewlinesThresholdMaximum"
					class="range"
					@input="
						(e) =>
							setGuildSettingsChanges(
								updateSliderValueObj('selfmodNewlinesThresholdMaximum', Number((e.target as HTMLInputElement).value))
							)
					"
				/>
			</div>

			<div class="mt-4">
				<p>Threshold Duration (in seconds)</p>
				<input
					type="range"
					min="0"
					max="120"
					:value="guildSettings.selfmodNewlinesThresholdDuration / 1000"
					class="range"
					@input="
						(e) =>
							setGuildSettingsChanges(
								updateSliderValueObj('selfmodNewlinesThresholdDuration', Number((e.target as HTMLInputElement).value) * 1000)
							)
					"
				/>
			</div>
		</PresentationalLayoutsSettingsSection>

		<PresentationalLayoutsSettingsSection title="Options">
			<div class="mt-4">
				<p>Maximum amount of new lines in a message before filter is applied</p>
				<input
					type="range"
					min="10"
					max="2000"
					:value="guildSettings.selfmodNewlinesMaximum"
					class="range"
					@input="
						(e) => setGuildSettingsChanges(updateSliderValueObj('selfmodNewlinesMaximum', Number((e.target as HTMLInputElement).value)))
					"
				/>
			</div>
		</PresentationalLayoutsSettingsSection>
	</div>
</template>
