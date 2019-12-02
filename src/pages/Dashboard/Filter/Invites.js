import React, { Fragment } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import Section from '../components/Section';
import SimpleGrid from '../components/SimpleGrid';
import Select from 'components/Select';
import SelectBoolean from 'components/SelectBoolean';
import SelectDuration from 'components/SelectDuration';
import { bitwiseSet, bitwiseHas } from 'meta/util';

const InvitesFilterPage = props => {
	const { invites } = props.guildSettings.selfmod;

	return (
		<Fragment>
			<Section title="Invite Link Filter">
				<SimpleGrid>
					<SelectBoolean
						title={`Filter ${invites.enabled ? 'Enabled' : 'Disabled'}`}
						onChange={bool => props.patchGuildData({ selfmod: { invites: { enabled: bool } } })}
						currentValue={invites.enabled}
						description="Whether or not this system should be enabled."
					/>
					<SelectBoolean
						title={`Alerts ${bitwiseHas(invites.softAction, 0b001) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { invites: { softAction: bitwiseSet(invites.softAction, 0b001, bool) } } })
						}
						currentValue={bitwiseHas(invites.softAction, 0b001)}
						description="Toggle message alerts in the channel the infraction took place."
					/>
					<SelectBoolean
						title={`Logs ${bitwiseHas(invites.softAction, 0b010) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { invites: { softAction: bitwiseSet(invites.softAction, 0b010, bool) } } })
						}
						currentValue={bitwiseHas(invites.softAction, 0b010)}
						description="Toggle message logs in the moderation logs channel."
					/>
					<SelectBoolean
						title={`Deletes ${bitwiseHas(invites.softAction, 0b100) ? 'Enabled' : 'Disabled'}`}
						onChange={bool =>
							props.patchGuildData({ selfmod: { invites: { softAction: bitwiseSet(invites.softAction, 0b100, bool) } } })
						}
						currentValue={bitwiseHas(invites.softAction, 0b100)}
						description="Toggle message deletions."
					/>
				</SimpleGrid>
			</Section>
			<Section title="Punishments">
				<SimpleGrid gridProps={{ direction: 'row', justify: 'flex-start' }}>
					<Select
						title="Action"
						value={invites.hardAction}
						onChange={e => props.patchGuildData({ selfmod: { invites: { hardAction: e.target.value } } })}
					>
						<option value={0}>None</option>
						<option value={1}>Warning</option>
						<option value={2}>Kick</option>
						<option value={3}>Mute</option>
						<option value={4}>Softban</option>
						<option value={5}>Ban</option>
					</Select>
					<SelectDuration
						value={invites.hardActionDuration}
						min={1000}
						onChange={duration => props.patchGuildData({ selfmod: { invites: { hardActionDuration: duration } } })}
					></SelectDuration>
				</SimpleGrid>
				<Typography>Maximum Threshold</Typography>
				<Slider
					value={invites.thresholdMaximum}
					onChange={(_, e) => props.patchGuildData({ selfmod: { invites: { thresholdMaximum: e } } })}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					min={0}
					max={60}
					label="The amount of infractions that can be done within Threshold Duration before taking action, instantly if 0."
				/>
				<Typography>Threshold Duration</Typography>
				<Slider
					value={invites.thresholdDuration}
					onChange={(_, e) => props.patchGuildData({ selfmod: { invites: { thresholdDuration: e } } })}
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

export default InvitesFilterPage;
