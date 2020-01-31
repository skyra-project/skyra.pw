import React, { Fragment } from 'react';

import SelectChannel from 'components/Select/SelectChannel';
import SelectBoolean from 'components/Select/SelectBoolean';

import Section from 'components/Section';
import SimpleGrid from 'components/SimpleGrid';
import { FlattenedGuild } from 'meta/typings/ApiData';
import { GuildSettings } from 'meta/typings/GuildSettings';

export interface LogsPageProps {
	guildData: FlattenedGuild;
	guildSettings: GuildSettings;
	patchGuildData: (changes: any) => void;
}

const LogsPage = (props: LogsPageProps) => (
	<Fragment>
		<Section title="Channels">
			<SimpleGrid>
				{['image-logs', 'moderation-logs', 'nsfw-message-logs', 'message-logs', 'reaction-logs'].map(channel => (
					<SelectChannel
						key={channel}
						value={props.guildSettings.channels[channel]}
						onChange={c =>
							props.patchGuildData({
								channels: {
									[channel]: c
								}
							})
						}
						guild={props.guildData}
						title={channel}
					/>
				))}
			</SimpleGrid>
		</Section>

		<Section title="Log Events">
			<p>These are the events which will be logged to your message logs channel.</p>
			<SimpleGrid>
				{/* EndOf Events */}
				{[
					{ title: 'Ban Added', name: 'banAdd' },
					{ title: 'Ban Revoked', name: 'banRemove' },
					{ title: 'Member Join', name: 'memberAdd' },
					{ title: 'Member Leave', name: 'memberRemove' },
					{ title: 'Message Edit', name: 'messageEdit' },
					{ title: 'Message Delete', name: 'messageDelete' },
					{ title: 'Twemoji Reactions', name: 'twemoji-reactions' }
				].map(event => {
					const current = props.guildSettings.events[event.name];
					return (
						<SelectBoolean
							key={event.name}
							title={event.title}
							currentValue={current}
							onChange={r =>
								props.patchGuildData({
									events: {
										[event.name]: r
									}
								})
							}
						/>
					);
				})}
			</SimpleGrid>
		</Section>
	</Fragment>
);

export default LogsPage;
