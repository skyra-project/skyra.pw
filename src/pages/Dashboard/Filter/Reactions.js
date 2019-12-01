import React, { Fragment } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import Section from '../components/Section';
import SimpleGrid from '../components/SimpleGrid';
import Select from 'components/Select';
import SelectBoolean from 'components/SelectBoolean';
import SelectDuration from 'components/SelectDuration';
import { bitwiseSet, bitwiseHas } from 'meta/util';

const ReactionsFilterPage = props => {
	const { reactions } = props.guildSettings.selfmod;

	return (
		<Fragment>
			<Section title="Reactions">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${reactions.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={bool => props.patchGuildData({ selfmod: { reactions: { enabled: bool } } })}
						currentValue={reactions.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(reactions.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { reactions: { softAction: bitwiseSet(reactions.softAction, 0b001, bool) } } })
						}
						currentValue={bitwiseHas(reactions.softAction, 0b001)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(reactions.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { reactions: { softAction: bitwiseSet(reactions.softAction, 0b010, bool) } } })
						}
						currentValue={bitwiseHas(reactions.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(reactions.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { reactions: { softAction: bitwiseSet(reactions.softAction, 0b100, bool) } } })
						}
						currentValue={bitwiseHas(reactions.softAction, 0b100)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid gridProps={{ direction: 'row', justify: 'flex-start' }}>
					<Select
						title="Action"
						value={reactions.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { reactions: { hardAction: e.target.value } } })}
					>
						<option value={0}>None</option>
						<option value={1}>Warning</option>
						<option value={2}>Kick</option>
						<option value={3}>Mute</option>
						<option value={4}>Softban</option>
						<option value={5}>Ban</option>
					</Select>
					<SelectDuration
						value={reactions.hardActionDuration}
						min={1000}
						onChange={duration => props.patchGuildData({ selfmod: { reactions: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={reactions.thresholdMaximum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { reactions: { thresholdMaximum: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
					label="The amount of infractions that can be done within Threshold Duration before taking action, instantly if 0."
				/>
				<Typography>Threshold Duration</Typography>
				<Slider
					value={reactions.thresholdDuration}
					onChange={(_, e) => props.patchGuildData({ selfmod: { reactions: { thresholdDuration: e } } })}
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

export default ReactionsFilterPage;
