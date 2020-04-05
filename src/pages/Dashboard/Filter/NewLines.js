import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Section from 'components/Section';
import Select from 'components/Select/Select';
import SelectBoolean from 'components/Select/SelectBoolean';
import SelectDuration from 'components/Select/SelectDuration';
import SimpleGrid from 'components/SimpleGrid';
import Slider from 'components/Slider';
import { bitwiseHas, bitwiseSet } from 'meta/util';
import React, { Fragment } from 'react';

const NewLinesFilterPage = props => {
	const { newlines } = props.guildSettings.selfmod;

	return (
		<Fragment>
			<Section title="Line Spam Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${newlines.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={bool => props.patchGuildData({ selfmod: { newlines: { enabled: bool } } })}
						currentValue={newlines.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(newlines.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { newlines: { softAction: bitwiseSet(newlines.softAction, 0b100, bool) } } })
						}
						currentValue={bitwiseHas(newlines.softAction, 0b100)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(newlines.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { newlines: { softAction: bitwiseSet(newlines.softAction, 0b010, bool) } } })
						}
						currentValue={bitwiseHas(newlines.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(newlines.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { newlines: { softAction: bitwiseSet(newlines.softAction, 0b001, bool) } } })
						}
						currentValue={bitwiseHas(newlines.softAction, 0b001)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid direction="row" justify="flex-start">
					<Select
						title="Action"
						helperText="The action to perform as punishment"
						value={newlines.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { newlines: { hardAction: e.target.value } } })}
					>
						<MenuItem value={0}>None</MenuItem>
						<MenuItem value={1}>Warning</MenuItem>
						<MenuItem value={2}>Kick</MenuItem>
						<MenuItem value={3}>Mute</MenuItem>
						<MenuItem value={4}>Softban</MenuItem>
						<MenuItem value={5}>Ban</MenuItem>
					</Select>
					<SelectDuration
						value={newlines.hardActionDuration}
						min={1000}
						onChange={duration => props.patchGuildData({ selfmod: { newlines: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={newlines.thresholdMaximum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { newlines: { thresholdMaximum: e } } })}
					aria-labelledby="New lines selfmod filter maximum duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
				/>
				<Typography>Threshold Duration</Typography>
				<Slider
					value={newlines.thresholdDuration}
					onChange={(_, e) => props.patchGuildData({ selfmod: { newlines: { thresholdDuration: e } } })}
					aria-labelledby="New lines selfmod filter threshold duration slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
				/>
			</Section>
		</Fragment>
	);
};

export default NewLinesFilterPage;
