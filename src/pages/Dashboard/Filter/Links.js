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
import { bitwiseSet, bitwiseHas } from 'meta/util';

const WordsContainer = styled(Paper)`
	padding: ${theme.spacing(1)}px;

	& > * {
		margin: ${theme.spacing(1)}px;
	}
`;

const IndexPage = props => {
	const { links } = props.guildSettings.selfmod;
	const [newWord, setNewWord] = useState('');

	return (
		<Fragment>
			<Section title="Links">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${links.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={bool => props.patchGuildData({ selfmod: { links: { enabled: bool } } })}
						currentValue={links.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(links.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { links: { softAction: bitwiseSet(links.softAction, 0b001, bool) } } })
						}
						currentValue={bitwiseHas(links.softAction, 0b001)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(links.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { links: { softAction: bitwiseSet(links.softAction, 0b010, bool) } } })
						}
						currentValue={bitwiseHas(links.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(links.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { links: { softAction: bitwiseSet(links.softAction, 0b100, bool) } } })
						}
						currentValue={bitwiseHas(links.softAction, 0b100)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid gridProps={{ direction: 'row', justify: 'flex-start' }}>
					<Select
						title="Action"
						value={links.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { links: { hardAction: e.target.value } } })}
					>
						<option value={0}>None</option>
						<option value={1}>Warning</option>
						<option value={2}>Kick</option>
						<option value={3}>Mute</option>
						<option value={4}>Softban</option>
						<option value={5}>Ban</option>
					</Select>
					<SelectDuration
						value={links.hardActionDuration}
						min={1000}
						onChange={duration => props.patchGuildData({ selfmod: { links: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={links.thresholdMaximum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { links: { thresholdMaximum: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
					label="The amount of infractions that can be done within Threshold Duration before taking action, instantly if 0."
				/>
				<Typography>Threshold Duration</Typography>
				<Slider
					value={links.thresholdDuration}
					onChange={(_, e) => props.patchGuildData({ selfmod: { links: { thresholdDuration: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
					label="The time in which infractions will accumulate before taking action, instantly if 0."
				/>
			</Section>
			<Section title="Options">
				<form
					onSubmit={e => {
						e.preventDefault();
						try {
							const { hostname } = new URL(/^https?:\/\//.test(newWord) ? newWord : `https://${newWord}`);
							if (hostname.length <= 128 && !links.whitelist.includes(hostname)) {
								props.patchGuildData({ selfmod: { links: { whitelist: [...links.whitelist, hostname] } } });
								setNewWord('');
							}
						} catch {}
					}}
				>
					<Box display="flex" mb={2} alignContent="center" alignItems="center" justifyContent="flex-start">
						<TextField
							style={{ marginRight: 20 }}
							label="Add Link"
							value={newWord}
							onChange={e => setNewWord(e.target.value)}
							variant="outlined"
						/>
						<Button type="submit" variant="contained" color="primary">
							Add URL
						</Button>
					</Box>
				</form>

				<WordsContainer>
					{links.whitelist.map(word => (
						<Chip
							color="primary"
							key={word}
							label={word}
							onDelete={() =>
								props.patchGuildData({ selfmod: { links: { whitelist: links.whitelist.filter(item => item !== word) } } })
							}
						/>
					))}
				</WordsContainer>
			</Section>
		</Fragment>
	);
};

export default IndexPage;
