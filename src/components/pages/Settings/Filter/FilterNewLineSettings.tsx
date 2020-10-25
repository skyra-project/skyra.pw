import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import SimpleGrid from '@mui/SimpleGrid';
import Slider from '@mui/Slider';
import Select from '@selects/Select';
import SelectBoolean from '@selects/SelectBoolean';
import SelectDuration from '@selects/SelectDuration';
import { bitwiseHas, bitwiseSet, updateSliderValueObj } from '@utils/util';
import React, { FC, Fragment, memo } from 'react';

const FilterNewLineSettings: FC = () => {
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Fragment>
			<Section title="Line Spam Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${guildSettings.selfmod.newlines.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={event => setGuildSettingsChanges({ selfmod: { newlines: { enabled: event.target.checked } } })}
						currentValue={guildSettings.selfmod.newlines.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(guildSettings.selfmod.newlines.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmod: {
									newlines: {
										softAction: bitwiseSet(guildSettings.selfmod.newlines.softAction, 0b100, event.target.checked)
									}
								}
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmod.newlines.softAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(guildSettings.selfmod.newlines.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmod: {
									newlines: {
										softAction: bitwiseSet(guildSettings.selfmod.newlines.softAction, 0b010, event.target.checked)
									}
								}
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmod.newlines.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(guildSettings.selfmod.newlines.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmod: {
									newlines: {
										softAction: bitwiseSet(guildSettings.selfmod.newlines.softAction, 0b001, event.target.checked)
									}
								}
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmod.newlines.softAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={guildSettings.selfmod.newlines.hardAction}
						onChange={e => setGuildSettingsChanges({ selfmod: { newlines: { hardAction: e.target.value } } })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={guildSettings.selfmod.newlines.hardActionDuration}
						min={1000}
						onChange={duration => setGuildSettingsChanges({ selfmod: { newlines: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={guildSettings.selfmod.newlines.thresholdMaximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('newlines', 'thresholdMaximum', value))}
					aria-labelledby="New lines selfmod filter maximum duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={guildSettings.selfmod.newlines.thresholdDuration / 1000}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('newlines', 'thresholdDuration', value, 1000))}
					aria-labelledby="New lines selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
			<Section title="Options">
				<Typography>Maximum amount of new lines in a message before filter is applied</Typography>
				<Slider
					value={guildSettings.selfmod.newlines.maximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('newlines', 'maximum', value))}
					aria-labelledby="New lines selfmod filter maximum lines slider"
					valueLabelDisplay="auto"
					min={10}
					max={2000}
				/>
			</Section>
		</Fragment>
	);
};

export default memo(FilterNewLineSettings);
