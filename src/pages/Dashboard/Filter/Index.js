import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import theme from 'meta/theme';
import Section from '../components/Section';
import SimpleGrid from '../components/SimpleGrid';
import Select from 'components/Select';
import SelectBoolean from 'components/SelectBoolean';
import SelectDuration from 'components/SelectDuration';
import { removeNonAlphaNumeric, bitwiseSet, bitwiseHas } from 'meta/util';

const WordsContainer = styled(Paper)`
	padding: ${theme.spacing(1)}px;

	& > * {
		margin: ${theme.spacing(1)}px;
	}
`;

const IndexPage = props => {
	const { filter } = props.guildSettings.selfmod;
	const [newWord, setNewWord] = useState('');

	return (
		<Fragment>
			<Section title="Word Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${filter.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={bool => props.patchGuildData({ selfmod: { filter: { enabled: bool } } })}
						currentValue={filter.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(filter.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { filter: { softAction: bitwiseSet(filter.softAction, 0b001, bool) } } })
						}
						currentValue={bitwiseHas(filter.softAction, 0b001)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(filter.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { filter: { softAction: bitwiseSet(filter.softAction, 0b010, bool) } } })
						}
						currentValue={bitwiseHas(filter.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(filter.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { filter: { softAction: bitwiseSet(filter.softAction, 0b100, bool) } } })
						}
						currentValue={bitwiseHas(filter.softAction, 0b100)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid gridProps={{ direction: 'row', justify: 'flex-start' }}>
					<Select
						title="Action"
						value={filter.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { filter: { hardAction: e.target.value } } })}
					>
						<option value={0}>None</option>
						<option value={1}>Warning</option>
						<option value={2}>Kick</option>
						<option value={3}>Mute</option>
						<option value={4}>Softban</option>
						<option value={5}>Ban</option>
					</Select>
					<SelectDuration
						value={filter.hardActionDuration}
						min={1000}
						onChange={duration => props.patchGuildData({ selfmod: { filter: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={filter.thresholdMaximum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { filter: { thresholdMaximum: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
					label="The amount of infractions that can be done within Threshold Duration before taking action, instantly if 0."
				/>
				<Typography>Threshold Duration</Typography>
				<Slider
					value={filter.thresholdDuration}
					onChange={(_, e) => props.patchGuildData({ selfmod: { filter: { thresholdDuration: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
					label="The time in which infractions will accumulate before taking action, instantly if 0."
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
							style={{ marginRight: 20 }}
							label="Add Word"
							value={newWord}
							onChange={e => setNewWord(e.target.value)}
							variant="outlined"
						/>
						<Button type="submit" variant="contained" color="primary">
							Add Word
						</Button>
					</Box>
				</form>

				<WordsContainer>
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
				</WordsContainer>
			</Section>
		</Fragment>
	);
};

export default IndexPage;
