import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Section from 'components/Section';
import Select from 'components/Select/Select';
import SelectBoolean from 'components/Select/SelectBoolean';
import SelectDuration from 'components/Select/SelectDuration';
import SimpleGrid from 'components/SimpleGrid';
import Slider from 'components/Slider';
import { SettingsPageProps } from 'lib/types/GuildSettings';
import { bitwiseHas, bitwiseSet, removeNonAlphaNumeric, updateSliderValueObj } from 'lib/util/util';
import React, { Fragment, PropsWithChildren, useState } from 'react';
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

export default (props: PropsWithChildren<SettingsPageProps>) => {
	const { filter } = props.guildSettings.selfmod;
	const [newWord, setNewWord] = useState('');
	const classes = useStyles();

	return (
		<Fragment>
			<Section title="Word Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${filter.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={event => props.patchGuildData({ selfmod: { filter: { enabled: event.target.checked } } })}
						currentValue={filter.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(filter.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							props.patchGuildData({
								selfmod: { filter: { softAction: bitwiseSet(filter.softAction, 0b100, event.target.checked) } }
							})
						}
						currentValue={bitwiseHas(filter.softAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(filter.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							props.patchGuildData({
								selfmod: { filter: { softAction: bitwiseSet(filter.softAction, 0b010, event.target.checked) } }
							})
						}
						currentValue={bitwiseHas(filter.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(filter.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={event =>
							props.patchGuildData({
								selfmod: { filter: { softAction: bitwiseSet(filter.softAction, 0b001, event.target.checked) } }
							})
						}
						currentValue={bitwiseHas(filter.softAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={filter.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { filter: { hardAction: e.target.value } } })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={filter.hardActionDuration}
						min={1000}
						onChange={duration => props.patchGuildData({ selfmod: { filter: { hardActionDuration: duration } } })}
					/>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={filter.thresholdMaximum}
					onChange={(_, value) => props.patchGuildData(updateSliderValueObj('filter', 'thresholdMaximum', value))}
					aria-labelledby="Words selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration (in seconds)</Typography>
				<Slider
					value={filter.thresholdDuration / 1000}
					onChange={(_, value) => props.patchGuildData(updateSliderValueObj('filter', 'thresholdDuration', value, 1000))}
					aria-labelledby="Word selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
			<Section title="Filtered Words">
				<form
					onSubmit={e => {
						e.preventDefault();
						const word = removeNonAlphaNumeric(newWord).toLowerCase();
						if (word.length < 3 || filter.raw.includes(word)) return;
						props.patchGuildData({ selfmod: { filter: { raw: [...filter.raw, word] } } });
						setNewWord('');
					}}
				>
					<Box display="flex" mb={2} alignContent="center" alignItems="center" justifyContent="flex-start">
						<TextField
							classes={{ root: classes.textField }}
							label="Add Word"
							value={newWord}
							onChange={e => setNewWord(e.target.value)}
						/>
						<Button type="submit" variant="contained" color="primary">
							Confirm
						</Button>
					</Box>
				</form>

				<When condition={filter.raw.length !== 0}>
					<Paper classes={{ root: classes.words }}>
						{filter.raw.map(word => (
							<Chip
								color="primary"
								key={word}
								label={word}
								onDelete={() =>
									props.patchGuildData({ selfmod: { filter: { raw: filter.raw.filter(item => item !== word) } } })
								}
							/>
						))}
					</Paper>
				</When>
			</Section>
		</Fragment>
	);
};
