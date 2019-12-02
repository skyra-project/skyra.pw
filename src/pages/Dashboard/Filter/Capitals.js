import React, { Fragment } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import Section from '../components/Section';
import SimpleGrid from '../components/SimpleGrid';
import Select from 'components/Select';
import SelectBoolean from 'components/SelectBoolean';
import SelectDuration from 'components/SelectDuration';
import { bitwiseSet, bitwiseHas } from 'meta/util';

const IndexPage = props => {
	const { capitals } = props.guildSettings.selfmod;

	return (
		<Fragment>
			<Section title="Capital Letters Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${capitals.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={bool => props.patchGuildData({ selfmod: { capitals: { enabled: bool } } })}
						currentValue={capitals.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(capitals.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { capitals: { softAction: bitwiseSet(capitals.softAction, 0b001, bool) } } })
						}
						currentValue={bitwiseHas(capitals.softAction, 0b001)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(capitals.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { capitals: { softAction: bitwiseSet(capitals.softAction, 0b010, bool) } } })
						}
						currentValue={bitwiseHas(capitals.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(capitals.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { capitals: { softAction: bitwiseSet(capitals.softAction, 0b100, bool) } } })
						}
						currentValue={bitwiseHas(capitals.softAction, 0b100)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid gridProps={{ direction: 'row', justify: 'flex-start' }}>
					<Select
						title="Action"
						value={capitals.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { capitals: { hardAction: e.target.value } } })}
					>
						<option value={0}>None</option>
						<option value={1}>Warning</option>
						<option value={2}>Kick</option>
						<option value={3}>Mute</option>
						<option value={4}>Softban</option>
						<option value={5}>Ban</option>
					</Select>
					<SelectDuration
						value={capitals.hardActionDuration}
						min={1000}
						onChange={duration => props.patchGuildData({ selfmod: { capitals: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={capitals.thresholdMaximum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { capitals: { thresholdMaximum: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
					label="The amount of infractions that can be done within Threshold Duration before taking action, instantly if 0."
				/>
				<Typography>Threshold Duration</Typography>
				<Slider
					value={capitals.thresholdDuration}
					onChange={(_, e) => props.patchGuildData({ selfmod: { capitals: { thresholdDuration: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={120}
					label="The time in which infractions will accumulate before taking action, instantly if 0."
				/>
			</Section>
			<Section title="Options">
				<Typography>Minimum Characters</Typography>
				<Slider
					value={capitals.minimum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { capitals: { minimum: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={5}
					max={2000}
					label="The amount of letters a message should have before scanning for capital letters."
				/>
				<Typography>Maximum Uppercase Characters (%)</Typography>
				<Slider
					value={capitals.maximum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { capitals: { maximum: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={10}
					max={100}
					label="The percentage of uppercase characters allowed after Minimum Characters."
				/>
			</Section>
		</Fragment>
	);
};

export default IndexPage;
