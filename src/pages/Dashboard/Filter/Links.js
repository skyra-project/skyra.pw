import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import Select from 'components/Select/Select';
import SelectBoolean from 'components/Select/SelectBoolean';
import SelectDuration from 'components/Select/SelectDuration';

import Slider from 'components/Slider';
import Section from 'components/Section';
import SimpleGrid from 'components/SimpleGrid';
import theme from 'meta/theme';
import { bitwiseSet, bitwiseHas } from 'meta/util';
import scss from 'stylesheets/modules/FilterOptions.module.scss';
import { When } from 'react-if';

const WordsContainer = styled(Paper)`
	padding: ${theme.spacing(1)}px;

	& > * {
		margin: ${theme.spacing(1)}px;
	}
`;

const LinksFilterPage = props => {
	const { links } = props.guildSettings.selfmod;
	const [newWord, setNewWord] = useState('');

	return (
		<Fragment>
			<Section title="Link Filter">
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
						helperText="The action to perform as punishment"
						value={links.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { links: { hardAction: e.target.value } } })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
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
					aria-labelledby="Links selfmod filter maximum threshold slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration</Typography>
				<Slider
					value={links.thresholdDuration}
					onChange={(_, e) => props.patchGuildData({ selfmod: { links: { thresholdDuration: e } } })}
					aria-labelledby="Links selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
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
						<TextField className={scss.textField} label="Add Link" value={newWord} onChange={e => setNewWord(e.target.value)} />
						<Button type="submit" variant="contained" color="primary">
							Confirm
						</Button>
					</Box>
				</form>

				<When condition={links.whitelist.length !== 0}>
					<WordsContainer>
						{links.whitelist.map(word => (
							<Chip
								color="primary"
								key={word}
								label={word}
								onDelete={() =>
									props.patchGuildData({
										selfmod: { links: { whitelist: links.whitelist.filter(item => item !== word) } }
									})
								}
							/>
						))}
					</WordsContainer>
				</When>
			</Section>
		</Fragment>
	);
};

export default LinksFilterPage;
