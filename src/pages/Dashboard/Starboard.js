import React, { Fragment } from 'react';

import SelectChannels from 'components/Select/SelectChannels';
import SelectChannel from 'components/Select/SelectChannel';
import SelectInteger from 'components/Select/SelectInteger';

import SimpleGrid from 'components/SimpleGrid';
import Section from 'components/Section';

const StarboardPage = props => (
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
					title="Starboard Channel"
					onChange={c =>
						props.patchGuildData({
							starboard: {
								channel: c
							}
						})
					}
					guild={props.guildData}
				/>
				<SelectChannels
					value={props.guildSettings.starboard.ignoreChannels}
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

export default StarboardPage;
