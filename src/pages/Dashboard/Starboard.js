import React, { Fragment } from 'react';

import SelectChannels from 'components/SelectChannels';
import SelectChannel from 'components/SelectChannel';
import SelectInteger from 'components/SelectInteger';
import SimpleGrid from './components/SimpleGrid';
import Section from './components/Section';

const SettingsPage = props => {
	return (
		<Fragment>
			<Section title="Starboard Settings">
				<SimpleGrid>
					<SelectInteger
						value={props.guildSettings.starboard.minimum}
						label="Minimum Stars"
						min={1}
						max={100}
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
						onChange={c =>
							props.patchGuildData({
								starboard: {
									channel: c ? c.id : null
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
