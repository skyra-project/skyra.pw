import React, { Fragment } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import Section from '../components/Section';
import SimpleGrid from '../components/SimpleGrid';
import Select from 'components/Select';
import SelectBoolean from 'components/SelectBoolean';
import SelectDuration from 'components/SelectDuration';
import { bitwiseSet, bitwiseHas } from 'meta/util';

const NewLinesFilterPage = props => {
	const { newlines } = props.guildSettings.selfmod;

	return (
		<Fragment>
			<Section title="Line Spam">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${newlines.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={bool => props.patchGuildData({ selfmod: { newlines: { enabled: bool } } })}
						currentValue={newlines.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(newlines.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { newlines: { softAction: bitwiseSet(newlines.softAction, 0b001, bool) } } })
						}
						currentValue={bitwiseHas(newlines.softAction, 0b001)}
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
						title={`Deletes ${bitwiseHas(newlines.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { newlines: { softAction: bitwiseSet(newlines.softAction, 0b100, bool) } } })
						}
						currentValue={bitwiseHas(newlines.softAction, 0b100)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid gridProps={{ direction: 'row', justify: 'flex-start' }}>
					<Select
						title="Action"
						value={newlines.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { newlines: { hardAction: e.target.value } } })}
					>
						<option value={0}>None</option>
						<option value={1}>Warning</option>
						<option value={2}>Kick</option>
						<option value={3}>Mute</option>
						<option value={4}>Softban</option>
						<option value={5}>Ban</option>
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
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
					label="The amount of infractions that can be done within Threshold Duration before taking action, instantly if 0."
				/>
				<Typography>Threshold Duration</Typography>
				<Slider
					value={newlines.thresholdDuration}
					onChange={(_, e) => props.patchGuildData({ selfmod: { newlines: { thresholdDuration: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
					label="The time in which infractions will accumulate before taking action, instantly if 0."
				/>
			</Section>
		</Fragment>
	);
};

export default NewLinesFilterPage;
