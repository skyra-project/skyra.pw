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

const FilterInvitesSettings: FC = () => {
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Fragment>
			<Section title="Invite Link Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${guildSettings.selfmod.invites.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={event => setGuildSettingsChanges({ selfmod: { invites: { enabled: event.target.checked } } })}
						currentValue={guildSettings.selfmod.invites.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(guildSettings.selfmod.invites.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmod: {
									invites: {
										softAction: bitwiseSet(guildSettings.selfmod.invites.softAction, 0b100, event.target.checked)
									}
								}
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmod.invites.softAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(guildSettings.selfmod.invites.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmod: {
									invites: {
										softAction: bitwiseSet(guildSettings.selfmod.invites.softAction, 0b010, event.target.checked)
									}
								}
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmod.invites.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(guildSettings.selfmod.invites.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							setGuildSettingsChanges({
								selfmod: {
									invites: {
										softAction: bitwiseSet(guildSettings.selfmod.invites.softAction, 0b001, event.target.checked)
									}
								}
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmod.invites.softAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={guildSettings.selfmod.invites.hardAction}
						onChange={e => setGuildSettingsChanges({ selfmod: { invites: { hardAction: e.target.value } } })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={guildSettings.selfmod.invites.hardActionDuration}
						min={1000}
						onChange={duration => setGuildSettingsChanges({ selfmod: { invites: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={guildSettings.selfmod.invites.thresholdMaximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('invites', 'thresholdMaximum', value))}
					aria-labelledby="Invites selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={guildSettings.selfmod.invites.thresholdDuration / 1000}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('invites', 'thresholdDuration', value, 1000))}
					aria-labelledby="Invites selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
		</Fragment>
	);
};

export default memo(FilterInvitesSettings);
