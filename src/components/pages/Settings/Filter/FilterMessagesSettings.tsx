import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import SimpleGrid from '@mui/SimpleGrid';
import Select from '@selects/Select';
import SelectBoolean from '@selects/SelectBoolean';
import SelectDuration from '@selects/SelectDuration';
import { bitwiseHas, bitwiseSet, updateSliderValueObj } from '@utils/util';
import React, { FC, Fragment, memo } from 'react';

const FilterMessagesSettings: FC = () => {
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Fragment>
			<Section title="Message Duplication Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${guildSettings.selfmodMessagesEnabled ? 'Enabled' : 'Disabled'}`}
						onChange={(event) => setGuildSettingsChanges({ selfmodMessagesEnabled: event.target.checked })}
						currentValue={guildSettings.selfmodMessagesEnabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(guildSettings.selfmodMessagesSoftAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodMessagesSoftAction: bitwiseSet(guildSettings.selfmodMessagesSoftAction, 0b100, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodMessagesSoftAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(guildSettings.selfmodMessagesSoftAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodMessagesSoftAction: bitwiseSet(guildSettings.selfmodMessagesSoftAction, 0b010, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodMessagesSoftAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(guildSettings.selfmodMessagesSoftAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodMessagesSoftAction: bitwiseSet(guildSettings.selfmodMessagesSoftAction, 0b001, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodMessagesSoftAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={guildSettings.selfmodMessagesHardAction}
						onChange={(e) => setGuildSettingsChanges({ selfmodMessagesHardAction: e.target.value })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={guildSettings.selfmodMessagesHardActionDuration}
						min={1000}
						onChange={(duration) => setGuildSettingsChanges({ selfmodMessagesHardActionDuration: duration })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={guildSettings.selfmodMessagesThresholdMaximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodMessagesThresholdMaximum', value))}
					aria-labelledby="Messages selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={guildSettings.selfmodMessagesThresholdDuration / 1000}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodMessagesThresholdDuration', value, 1000))}
					aria-labelledby="Messages selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
		</Fragment>
	);
};

export default memo(FilterMessagesSettings);
