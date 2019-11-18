import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';

import SelectChannels from 'components/SelectChannels';
import SelectChannel from 'components/SelectChannel';
import SimpleGrid from './components/SimpleGrid';
import Section from './components/Section';

const SettingsPage = props => {
	return (
		<Fragment>
			<Section title="Starboard Settings">
				<SimpleGrid>
					<TextField
						value={props.guildSettings.starboard.minimum}
						label="Minimum Stars"
						type="number"
						margin="normal"
						variant="outlined"
						onChange={r =>
							props.patchGuildData({
								starboard: {
									minimum: r.target.value
								}
							})
						}
					/>
					<SelectChannel
						value={props.guildSettings.starboard.channel}
						buttonText="Starboard Channel"
						onChange={r =>
							props.patchGuildData({
								starboard: {
									channel: r.id
								}
							})
						}
						guild={props.guildData}
					/>
					<SelectChannels
						value={props.guildSettings.starboard.ignoreChannels}
						buttonText="Ignored Channels"
						onChange={channels =>
							props.patchGuildData({
								starboard: {
									ignoreChannels: channels
								}
							})
						}
						guild={props.guildData}
						title="Ignored Channels"
					/>
				</SimpleGrid>
			</Section>
		</Fragment>
	);
};

export default SettingsPage;
