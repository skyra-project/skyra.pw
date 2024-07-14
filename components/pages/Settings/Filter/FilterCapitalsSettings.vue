<template>
	<div>
		<Section title="Capital Letters Filter">
			<SimpleGrid>
				<SelectBoolean
					:title="`Filter ${guildSettings.selfmodCapitalsEnabled ? 'Enabled' : 'Disabled'}`"
					:currentValue="guildSettings.selfmodCapitalsEnabled"
					@change="updateGuildSettings('selfmodCapitalsEnabled', $event.target.checked)"
					description="Whether or not this system should be enabled."
				/>
				<SelectBoolean
					:title="`Alerts ${bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b100) ? 'Enabled' : 'Disabled'}`"
					:currentValue="bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b100)"
					@change="
						updateGuildSettings(
							'selfmodCapitalsSoftAction',
							bitwiseSet(guildSettings.selfmodCapitalsSoftAction, 0b100, $event.target.checked)
						)
					"
					description="Toggle message alerts in the channel the infraction took place."
				/>
				<SelectBoolean
					:title="`Logs ${bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b010) ? 'Enabled' : 'Disabled'}`"
					:currentValue="bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b010)"
					@change="
						updateGuildSettings(
							'selfmodCapitalsSoftAction',
							bitwiseSet(guildSettings.selfmodCapitalsSoftAction, 0b010, $event.target.checked)
						)
					"
					description="Toggle message logs in the moderation logs channel."
				/>
				<SelectBoolean
					:title="`Deletes ${bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b001) ? 'Enabled' : 'Disabled'}`"
					:currentValue="bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b001)"
					@change="
						updateGuildSettings(
							'selfmodCapitalsSoftAction',
							bitwiseSet(guildSettings.selfmodCapitalsSoftAction, 0b001, $event.target.checked)
						)
					"
					description="Toggle message deletions."
				/>
			</SimpleGrid>
		</Section>

		<Section title="Punishments">
			<SimpleGrid direction="row" justifyContent="flex-start">
				<Select
					title="Action"
					helperText="The action to perform as punishment"
					:value="guildSettings.selfmodCapitalsHardAction"
					@change="setGuildSettingsChanges({ selfmodCapitalsHardAction: $event.target.value })"
				>
					<MenuItem value="0">None</MenuItem>
					<MenuItem value="1">Warning</MenuItem>
					<MenuItem value="2">Kick</MenuItem>
					<MenuItem value="3">Mute</MenuItem>
					<MenuItem value="4">Softban</MenuItem>
					<MenuItem value="5">Ban</MenuItem>
				</Select>
				<SelectDuration
					:value="guildSettings.selfmodCapitalsHardActionDuration"
					:min="1000"
					@change="setGuildSettingsChanges({ selfmodCapitalsHardActionDuration: $event })"
				/>
			</SimpleGrid>
			<Typography>Maximum Threshold</Typography>
			<Slider
				:value="guildSettings.selfmodCapitalsThresholdMaximum"
				@input="updateSliderValue('selfmodCapitalsThresholdMaximum', $event)"
				aria-labelledby="Capitals selfmod filter maximum threshold slider"
				valueLabelDisplay="auto"
				:min="0"
				:max="60"
			/>
			<Typography>Threshold Duration (in seconds)</Typography>
			<Slider
				:value="guildSettings.selfmodCapitalsThresholdDuration / 1000"
				@input="updateSliderValue('selfmodCapitalsThresholdDuration', $event, 1000)"
				aria-labelledby="Capitals selfmod filter threshold duration slider"
				valueLabelDisplay="auto"
				:min="0"
				:max="120"
			/>
		</Section>

		<Section title="Options">
			<Typography>Minimum Characters</Typography>
			<Slider
				:value="guildSettings.selfmodCapitalsMinimum"
				@input="updateSliderValue('selfmodCapitalsMinimum', $event)"
				aria-labelledby="Capitals selfmod filter minimum characters slider"
				valueLabelDisplay="auto"
				:min="5"
				:max="2000"
			/>
			<Typography>Maximum Uppercase Characters (%)</Typography>
			<Slider
				:value="guildSettings.selfmodCapitalsMaximum"
				@input="updateSliderValue('selfmodCapitalsMaximum', $event)"
				aria-labelledby="Capitals selfmod filter maximum uppercase characters slider"
				valueLabelDisplay="auto"
				:min="10"
				:max="100"
			/>
		</Section>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useGuildSettingsChangesContext } from '~/composables/useGuildSettingsChangesContext';
import { useGuildSettingsContext } from '~/composables/useGuildSettingsContext';
import Section from '~/components/Section.vue';
import SimpleGrid from '~/components/SimpleGrid.vue';
import Select from '~/components/Select.vue';
import SelectBoolean from '~/components/SelectBoolean.vue';
import SelectDuration from '~/components/SelectDuration.vue';
import { bitwiseHas, bitwiseSet, updateSliderValueObj } from '~/utils/util';

const { guildSettings } = useGuildSettingsContext();
const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

const updateGuildSettings = (key, value) => {
	setGuildSettingsChanges({ [key]: value });
};

const updateSliderValue = (key, value, multiplier = 1) => {
	setGuildSettingsChanges(updateSliderValueObj(key, value, multiplier));
};
</script>
