import { useGuildSettingsChangesContext } from '#contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '#contexts/Settings/GuildSettingsContext';
import Section from '#layout/Settings/Section';
import SimpleGrid from '#mui/SimpleGrid';
import Select from '#selects/Select';
import SelectBoolean from '#selects/SelectBoolean';
import SelectDuration from '#selects/SelectDuration';
import { bitwiseHas, bitwiseSet, updateSliderValueObj } from '#utils/util';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { FC, Fragment, memo, useState } from 'react';
import { When } from 'react-if';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		words: {
			padding: theme.spacing(1),
			'& > *': {
				margin: theme.spacing(1)
			}
		},
		textField: {
			marginRight: theme.spacing(1),
			marginBottom: theme.spacing(1)
		}
	})
);

const FilterLinksSettings: FC = () => {
	const [newWord, setNewWord] = useState('');
	const classes = useStyles();
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Fragment>
			<Section title="Link Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${guildSettings.selfmodLinksEnabled ? 'Enabled' : 'Disabled'}`}
						onChange={(event) => setGuildSettingsChanges({ selfmodLinksEnabled: event.target.checked })}
						currentValue={guildSettings.selfmodLinksEnabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(guildSettings.selfmodLinksSoftAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodLinksSoftAction: bitwiseSet(guildSettings.selfmodLinksSoftAction, 0b100, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodLinksSoftAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(guildSettings.selfmodLinksSoftAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodLinksSoftAction: bitwiseSet(guildSettings.selfmodLinksSoftAction, 0b010, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodLinksSoftAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(guildSettings.selfmodLinksSoftAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={(event) =>
							setGuildSettingsChanges({
								selfmodLinksSoftAction: bitwiseSet(guildSettings.selfmodLinksSoftAction, 0b001, event.target.checked)
							})
						}
						currentValue={bitwiseHas(guildSettings.selfmodLinksSoftAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={guildSettings.selfmodLinksHardAction}
						onChange={(e) => setGuildSettingsChanges({ selfmodLinksHardAction: e.target.value })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={guildSettings.selfmodLinksHardActionDuration}
						min={1000}
						onChange={(duration) => setGuildSettingsChanges({ selfmodLinksHardActionDuration: duration })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={guildSettings.selfmodLinksThresholdMaximum}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodLinksThresholdMaximum', value))}
					aria-labelledby="Links selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={guildSettings.selfmodLinksThresholdDuration / 1000}
					onChange={(_, value) => setGuildSettingsChanges(updateSliderValueObj('selfmodLinksThresholdDuration', value, 1000))}
					aria-labelledby="Links selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
			<Section title="Options">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						try {
							const { hostname } = new URL(/^https?:\/\//.test(newWord) ? newWord : `https://${newWord}`);
							if (hostname.length <= 128 && !guildSettings.selfmodLinksWhitelist.includes(hostname)) {
								setGuildSettingsChanges({
									selfmodLinksWhitelist: [...guildSettings.selfmodLinksWhitelist, hostname]
								});
								setNewWord('');
							}
						} catch {
							// intentionally empty
						}
					}}
				>
					<Box display="flex" mb={2} alignContent="center" alignItems="center" justifyContent="flex-start">
						<TextField
							classes={{ root: classes.textField }}
							label="Add Link"
							value={newWord}
							onChange={(e) => setNewWord(e.target.value)}
						/>
						<Button type="submit" variant="contained" color="primary">
							Confirm
						</Button>
					</Box>
				</form>

				<When condition={guildSettings.selfmodLinksWhitelist.length !== 0}>
					<Paper classes={{ root: classes.words }}>
						{guildSettings.selfmodLinksWhitelist.map((word) => (
							<Chip
								color="primary"
								key={word}
								label={word}
								onDelete={() =>
									setGuildSettingsChanges({
										selfmodLinksWhitelist: guildSettings.selfmodLinksWhitelist.filter((item) => item !== word)
									})
								}
							/>
						))}
					</Paper>
				</When>
			</Section>
		</Fragment>
	);
};

export default memo(FilterLinksSettings);
