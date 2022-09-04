import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import SimpleGrid from '@material/SimpleGrid';
import Select from '@selects/Select';
import SelectBoolean from '@selects/SelectBoolean';
import SelectDuration from '@selects/SelectDuration';
import { bitwiseHas, bitwiseSet, removeNonAlphaNumeric, updateSliderValueObj } from '@utils/util';
import { Fragment, memo, useState, type FC } from 'react';

import { Box, Button, Chip, MenuItem, Paper, Slider, TextField, Typography } from '@mui/material';

const FilterWordSettings: FC = () => {
	const [newWord, setNewWord] = useState('');
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Fragment>
			<Section title="Word Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${guildSettings.selfmodFilterEnabled ? 'Enabled' : 'Disabled'}`}
						onChange={(event) => setGuildSettingsChanges({ selfmodFilterEnabled: event.target.checked })}
						currentValue={guildSettings.selfmodFilterEnabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodFilterSoftAction: bitwiseSet(guildSettings.selfmodFilterSoftAction, 0b100, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodFilterSoftAction: bitwiseSet(guildSettings.selfmodFilterSoftAction, 0b010, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodFilterSoftAction: bitwiseSet(guildSettings.selfmodFilterSoftAction, 0b001, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodFilterSoftAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justifyContent="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={guildSettings.selfmodFilterHardAction}
						onChange={(e) => setGuildSettingsChanges({ selfmodFilterHardAction: e.target.value })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={guildSettings.selfmodFilterHardActionDuration}
						min={1000}
						onChange={(duration) => setGuildSettingsChanges({ selfmodFilterHardActionDuration: duration })}
					/>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={guildSettings.selfmodFilterThresholdMaximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodFilterThresholdMaximum', value))}
					aria-labelledby="Words selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={guildSettings.selfmodFilterThresholdDuration / 1000}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodFilterThresholdDuration', value, 1000))}
					aria-labelledby="Word selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
			<Section title="Filtered Words">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const word = removeNonAlphaNumeric(newWord).toLowerCase();
						if (word.length < 3 || guildSettings.selfmodFilterRaw.includes(word)) return;
						setGuildSettingsChanges({
							selfmodFilterRaw: [...guildSettings.selfmodFilterRaw, word]
						});
						setNewWord('');
					}}
				>
					<Box display="flex" mb={2} alignContent="center" alignItems="center" justifyContent="flex-start">
						<TextField
							sx={{
								mr: 1,
								mb: 1
							}}
							label="Add Word"
							value={newWord}
							onChange={(e) => setNewWord(e.target.value)}
						/>
						<Button type="submit" variant="contained" color="primary">
							Confirm
						</Button>
					</Box>
				</form>

				{guildSettings.selfmodFilterRaw.length !== 0 && (
					<Paper
						sx={{
							p: 1,
							'& > *': {
								m: 1
							}
						}}
					>
						{guildSettings.selfmodFilterRaw.map((word) => (
							<Chip
								color="primary"
								key={word}
								label={word}
								onDelete={() =>
									setGuildSettingsChanges({
										selfmodFilterRaw: guildSettings.selfmodFilterRaw.filter((item) => item !== word)
									})
								}
							/>
						))}
					</Paper>
				)}
			</Section>
		</Fragment>
	);
};

export default memo(FilterWordSettings);
