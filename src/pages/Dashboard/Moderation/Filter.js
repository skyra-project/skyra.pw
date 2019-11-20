import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Chip, Paper, TextField, Button, Box } from '@material-ui/core';

import theme from 'meta/theme';
import Section from '../components/Section';
import Select from 'components/Select';
import SelectBoolean from 'components/SelectBoolean';
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
			<Section title="Filter">
				<SelectBoolean
					title={`Filter ${filter.enabled ? 'Enabled' : 'Disabled'}`}
					onChange={bool => props.patchGuildData({ selfmod: { filter: { enabled: bool } } })}
					currentValue={filter.enabled}
				/>
				<SelectBoolean
					title={`Alerts ${bitwiseHas(filter.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
					onChange={bool => props.patchGuildData({ selfmod: { filter: { softAction: bitwiseSet(filter.softAction, 0b001, bool) } } })}
					currentValue={bitwiseHas(filter.softAction, 0b001)}
					label="Toggle message alerts in the channel the infraction took place."
				/>
				<SelectBoolean
					title={`Logs ${bitwiseHas(filter.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
					onChange={bool => props.patchGuildData({ selfmod: { filter: { softAction: bitwiseSet(filter.softAction, 0b010, bool) } } })}
					currentValue={bitwiseHas(filter.softAction, 0b010)}
					label="Toggle message logs in the moderation logs channel."
				/>
				<SelectBoolean
					title={`Deletes ${bitwiseHas(filter.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
					onChange={bool => props.patchGuildData({ selfmod: { filter: { softAction: bitwiseSet(filter.softAction, 0b100, bool) } } })}
					currentValue={bitwiseHas(filter.softAction, 0b100)}
					label="Toggle message deletions."
				/>
			</Section>
			<Section title="Punishments">
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
