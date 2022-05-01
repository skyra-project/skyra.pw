import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
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
						title={`Filter ${guildSettings.selfmodInvitesEnabled ? 'Enabled' : 'Disabled'}`}
						onChange={(event) => setGuildSettingsChanges({ selfmodInvitesEnabled: event.target.checked })}
						currentValue={guildSettings.selfmodInvitesEnabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(guildSettings.selfmodInvitesSoftAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodInvitesSoftAction: bitwiseSet(guildSettings.selfmodInvitesSoftAction, 0b100, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodInvitesSoftAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(guildSettings.selfmodInvitesSoftAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodInvitesSoftAction: bitwiseSet(guildSettings.selfmodInvitesSoftAction, 0b010, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodInvitesSoftAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(guildSettings.selfmodInvitesSoftAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodInvitesSoftAction: bitwiseSet(guildSettings.selfmodInvitesSoftAction, 0b001, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodInvitesSoftAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justifyContent="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={guildSettings.selfmodInvitesHardAction}
						onChange={(e) => setGuildSettingsChanges({ selfmodInvitesHardAction: e.target.value })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={guildSettings.selfmodInvitesHardActionDuration}
						min={1000}
						onChange={(duration) => setGuildSettingsChanges({ selfmodInvitesHardActionDuration: duration })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={guildSettings.selfmodInvitesThresholdMaximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodInvitesThresholdMaximum', value))}
					aria-labelledby="Invites selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={guildSettings.selfmodInvitesThresholdDuration / 1000}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodInvitesThresholdDuration', value, 1000))}
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
