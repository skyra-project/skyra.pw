import { SettingsPageProps } from '@config/types/GuildSettings';
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

const FilterMessages: FC<SettingsPageProps> = props => {
	const { messages } = props.guildSettings.selfmod;

	return (
		<Fragment>
			<Section title="Message Duplication Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${messages.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={event => props.patchGuildData({ selfmod: { messages: { enabled: event.target.checked } } })}
						currentValue={messages.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(messages.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							props.patchGuildData({
								selfmod: { messages: { softAction: bitwiseSet(messages.softAction, 0b100, event.target.checked) } }
							})
						}
						currentValue={bitwiseHas(messages.softAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(messages.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							props.patchGuildData({
								selfmod: { messages: { softAction: bitwiseSet(messages.softAction, 0b010, event.target.checked) } }
							})
						}
						currentValue={bitwiseHas(messages.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(messages.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							props.patchGuildData({
								selfmod: { messages: { softAction: bitwiseSet(messages.softAction, 0b001, event.target.checked) } }
							})
						}
						currentValue={bitwiseHas(messages.softAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={messages.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { messages: { hardAction: e.target.value } } })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={messages.hardActionDuration}
						min={1000}
						onChange={duration => props.patchGuildData({ selfmod: { messages: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={messages.thresholdMaximum}
					onChange={(_, value) => props.patchGuildData(updateSliderValueObj('messages', 'thresholdMaximum', value))}
					aria-labelledby="Messages selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={messages.thresholdDuration / 1000}
					onChange={(_, value) => props.patchGuildData(updateSliderValueObj('messages', 'thresholdDuration', value, 1000))}
					aria-labelledby="Messages selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
		</Fragment>
	);
};

export default memo(FilterMessages);
