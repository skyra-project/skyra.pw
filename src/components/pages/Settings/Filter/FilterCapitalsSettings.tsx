import { useGuildSettingsChangesContext } from '#contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '#contexts/Settings/GuildSettingsContext';
import Section from '#layout/Settings/Section';
import SimpleGrid from '#mui/SimpleGrid';
import Select from '#selects/Select';
import SelectBoolean from '#selects/SelectBoolean';
import SelectDuration from '#selects/SelectDuration';
import { bitwiseHas, bitwiseSet, updateSliderValueObj } from '#utils/util';
import { MenuItem, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import React, { FC, Fragment, memo } from 'react';

const FilterCapitalsSettings: FC = () => {
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Fragment>
			<Section title="Capital Letters Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${guildSettings.selfmodCapitalsEnabled ? 'Enabled' : 'Disabled'}`}
						onChange={event => setGuildSettingsChanges({ selfmodCapitalsEnabled: event.target.checked })}
						currentValue={guildSettings.selfmodCapitalsEnabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmodCapitalsSoftAction: bitwiseSet(guildSettings.selfmodCapitalsSoftAction, 0b100, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmodCapitalsSoftAction: bitwiseSet(guildSettings.selfmodCapitalsSoftAction, 0b010, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmodCapitalsSoftAction: bitwiseSet(guildSettings.selfmodCapitalsSoftAction, 0b001, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodCapitalsSoftAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={guildSettings.selfmodCapitalsHardAction}
						onChange={e => setGuildSettingsChanges({ selfmodCapitalsHardAction: e.target.value })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={guildSettings.selfmodCapitalsHardActionDuration}
						min={1000}
						onChange={duration => setGuildSettingsChanges({ selfmodCapitalsHardActionDuration: duration })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={guildSettings.selfmodCapitalsThresholdMaximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodCapitalsThresholdMaximum', value))}
					aria-labelledby="Capitals selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={guildSettings.selfmodCapitalsThresholdDuration / 1000}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodCapitalsThresholdDuration', value, 1000))}
					aria-labelledby="Capitals selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
			<Section title="Options">
				<Typography>Minimum Characters</Typography>
				<Slider
					value={guildSettings.selfmodCapitalsMinimum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodCapitalsMinimum', value))}
					aria-labelledby="Capitals selfmod filter minimum characters slider"
					valueLabelDisplay="auto"
					min={5}
					max={2000}
				/>
				<Typography>Maximum Uppercase Characters (%)</Typography>
				<Slider
					value={guildSettings.selfmodCapitalsMaximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodCapitalsMaximum', value))}
					aria-labelledby="Capitals selfmod filter maximum uppercase characters slider"
					valueLabelDisplay="auto"
					min={10}
					max={100}
				/>
			</Section>
		</Fragment>
	);
};

export default memo(FilterCapitalsSettings);
