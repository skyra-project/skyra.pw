import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import { MenuItem, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import SimpleGrid from '@mui/SimpleGrid';
import Select from '@selects/Select';
import SelectBoolean from '@selects/SelectBoolean';
import SelectDuration from '@selects/SelectDuration';
import { bitwiseHas, bitwiseSet, updateSliderValueObj } from '@utils/util';
import React, { FC, Fragment, memo } from 'react';

const FilterCapitalsSettings: FC = () => {
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Fragment>
			<Section title="Capital Letters Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${guildSettings['selfmod.capitals.enabled'] ? 'Enabled' : 'Disabled'}`}
						onChange={event => setGuildSettingsChanges({ 'selfmod.capitals.enabled': event.target.checked })}
						currentValue={guildSettings['selfmod.capitals.enabled']}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(guildSettings['selfmod.capitals.softAction'], 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								'selfmod.capitals.softAction': bitwiseSet(
									guildSettings['selfmod.capitals.softAction'],
									0b100,
									event.target.checked
								)
							})
						}
						currentValue={bitwiseHas(guildSettings['selfmod.capitals.softAction'], 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(guildSettings['selfmod.capitals.softAction'], 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								'selfmod.capitals.softAction': bitwiseSet(
									guildSettings['selfmod.capitals.softAction'],
									0b010,
									event.target.checked
								)
							})
						}
						currentValue={bitwiseHas(guildSettings['selfmod.capitals.softAction'], 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(guildSettings['selfmod.capitals.softAction'], 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								'selfmod.capitals.softAction': bitwiseSet(
									guildSettings['selfmod.capitals.softAction'],
									0b001,
									event.target.checked
								)
							})
						}
						currentValue={bitwiseHas(guildSettings['selfmod.capitals.softAction'], 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={guildSettings['selfmod.capitals.hardAction']}
						onChange={e => setGuildSettingsChanges({ 'selfmod.capitals.hardAction': e.target.value })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={guildSettings['selfmod.capitals.hardActionDuration']}
						min={1000}
						onChange={duration => setGuildSettingsChanges({ 'selfmod.capitals.hardActionDuration': duration })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={guildSettings['selfmod.capitals.thresholdMaximum']}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmod.capitals.thresholdMaximum', value))}
					aria-labelledby="Capitals selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={guildSettings['selfmod.capitals.thresholdDuration'] / 1000}
					onChange={(_, value) =>
						setGuildSettingsChanges(updateSliderValueObj('selfmod.capitals.thresholdDuration', value, 1000))
					}
					aria-labelledby="Capitals selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
			<Section title="Options">
				<Typography>Minimum Characters</Typography>
				<Slider
					value={guildSettings['selfmod.capitals.minimum']}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmod.capitals.minimum', value))}
					aria-labelledby="Capitals selfmod filter minimum characters slider"
					valueLabelDisplay="auto"
					min={5}
					max={2000}
				/>
				<Typography>Maximum Uppercase Characters (%)</Typography>
				<Slider
					value={guildSettings['selfmod.capitals.maximum']}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmod.capitals.maximum', value))}
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
