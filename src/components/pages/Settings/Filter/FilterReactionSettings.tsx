import { useGuildSettingsChangesContext } from '#contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '#contexts/Settings/GuildSettingsContext';
import Section from '#layout/Settings/Section';
import SimpleGrid from '#mui/SimpleGrid';
import Select from '#selects/Select';
import SelectBoolean from '#selects/SelectBoolean';
import SelectDuration from '#selects/SelectDuration';
import { bitwiseHas, bitwiseSet, updateSliderValueObj } from '#utils/util';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import React, { FC, Fragment, memo } from 'react';

const FilterReactionSettings: FC = () => {
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Fragment>
			<Section title="Reaction Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${guildSettings.selfmodReactionsEnabled ? 'Enabled' : 'Disabled'}`}
						onChange={event => setGuildSettingsChanges({ selfmodReactionsEnabled: event.target.checked })}
						currentValue={guildSettings.selfmodReactionsEnabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(guildSettings.selfmodReactionsSoftAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmodReactionsSoftAction: bitwiseSet(
									guildSettings.selfmodReactionsSoftAction,
									0b100,
									event.target.checked
								)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodReactionsSoftAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(guildSettings.selfmodReactionsSoftAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmodReactionsSoftAction: bitwiseSet(
									guildSettings.selfmodReactionsSoftAction,
									0b010,
									event.target.checked
								)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodReactionsSoftAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(guildSettings.selfmodReactionsSoftAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmodReactionsSoftAction: bitwiseSet(
									guildSettings.selfmodReactionsSoftAction,
									0b001,
									event.target.checked
								)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodReactionsSoftAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={guildSettings.selfmodReactionsHardAction}
						onChange={e => setGuildSettingsChanges({ selfmodReactionsHardAction: e.target.value })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={guildSettings.selfmodReactionsHardActionDuration}
						min={1000}
						onChange={duration => setGuildSettingsChanges({ selfmodReactionsHardActionDuration: duration })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={guildSettings.selfmodReactionsThresholdMaximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodReactionsThresholdMaximum', value))}
					aria-labelledby="Reactions selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={guildSettings.selfmodReactionsThresholdDuration / 1000}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodReactionsThresholdDuration', value, 1000))}
					aria-labelledby="Reactions selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
		</Fragment>
	);
};

export default memo(FilterReactionSettings);
