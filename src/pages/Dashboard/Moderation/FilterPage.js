import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Chip, Paper, TextField, Button, Grid, Box } from '@material-ui/core';

import theme from 'meta/theme';
import Section from '../components/Section';
import SelectBoolean from 'components/SelectBoolean';
import SimpleGrid from '../components/SimpleGrid';
import { removeNonAlphaNumeric } from 'meta/util';

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
			</Section>
			<Section title="Filtered Words">
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
				<Box display="flex" p={1} m={3} alignContent="center" alignItems="center" justifyContent="flex-start" justifyItems="center">
					<TextField label="Add Word" value={newWord} onChange={e => setNewWord(e.target.value)} variant="outlined" />
					<Button
						onClick={() => {
							const word = removeNonAlphaNumeric(newWord).toLowerCase();
							if (word.length < 3 || filter.raw.includes(word)) return;
							props.patchGuildData({ selfmod: { filter: { raw: [...filter.raw, word] } } });
							setNewWord('');
						}}
						variant="contained"
						color="primary"
					>
						Add Word
					</Button>
				</Box>
			</Section>
			<pre>{JSON.stringify(filter, null, 2)}</pre>
		</Fragment>
	);
};

export default IndexPage;
