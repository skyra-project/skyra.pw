<script setup lang="ts">
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';
import { useGuildSettings } from '~/composables/settings/useGuildSettings';

const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const softActionEnabled = computed(() => ({
	alerts: bitwiseHas(guildSettings.value.selfmodMessagesSoftAction, 0b100),
	logs: bitwiseHas(guildSettings.value.selfmodMessagesSoftAction, 0b010),
	deletes: bitwiseHas(guildSettings.value.selfmodMessagesSoftAction, 0b001)
}));

const updateSoftAction = (bit: number, checked: boolean) => {
	setGuildSettingsChanges({
		selfmodMessagesSoftAction: bitwiseSet(guildSettings.value.selfmodMessagesSoftAction, bit, checked)
	});
};
</script>

<template>
	<div>
		<PresentationalLayoutsSettingsSection title="Message Duplication Filter">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<SelectsSelectBoolean
					:title="`Filter ${guildSettings.selfmodMessagesEnabled ? 'Enabled' : 'Disabled'}`"
					:current-value="guildSettings.selfmodMessagesEnabled"
					description="Whether or not this system should be enabled."
					@change="(value) => setGuildSettingsChanges({ selfmodMessagesEnabled: value })"
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
					:value="guildSettings.selfmodMessagesHardAction"
					@change="(value) => setGuildSettingsChanges({ selfmodMessagesHardAction: Number(value) })"
				>
					<option :value="0">None</option>
					<option :value="1">Warning</option>
					<option :value="2">Kick</option>
					<option :value="3">Mute</option>
					<option :value="4">Softban</option>
					<option :value="5">Ban</option>
				</SelectsSelect>
				<SelectsSelectDuration
					:value="guildSettings.selfmodMessagesHardActionDuration"
					:min="1000"
					@change="
						(duration) =>
							setGuildSettingsChanges({ selfmodMessagesHardActionDuration: typeof duration === 'string' ? +duration : duration })
					"
				/>
			</div>

			<div class="mt-4">
				<p>Maximum Threshold</p>
				<input
					type="range"
					min="0"
					max="60"
					:value="guildSettings.selfmodMessagesThresholdMaximum"
					class="range"
					@input="
						(e) =>
							setGuildSettingsChanges(
								updateSliderValueObj('selfmodMessagesThresholdMaximum', Number((e.target as HTMLInputElement)?.value))
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
					:value="guildSettings.selfmodMessagesThresholdDuration / 1000"
					class="range"
					@input="
						(e) =>
							setGuildSettingsChanges(
								updateSliderValueObj('selfmodMessagesThresholdDuration', Number((e.target as HTMLInputElement)?.value) * 1000)
							)
					"
				/>
			</div>
		</PresentationalLayoutsSettingsSection>
	</div>
</template>
