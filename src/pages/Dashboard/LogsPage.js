import React, { Fragment } from 'react';

import SelectChannel from 'components/SelectChannel';
import SelectBoolean from 'components/SelectBoolean';
import Section from './components/Section';
import SimpleGrid from './components/SimpleGrid';

const SettingsPage = props => {
	return (
		<Fragment>
			<Section title="Channels">
				<SimpleGrid>
					{['image-logs', 'moderation-logs', 'nsfw-message-logs', 'message-logs', 'reaction-logs'].map(channel => {
						// Some settings have more than 1 role, such as Public Roles
						const current = props.guildData.channels.find(r => r.id === props.guildSettings.channels[channel]);
						const displayValue = current ? current.name : 'None';

						return (
							<SelectChannel
								key={channel}
								buttonText={`${channel}: ${displayValue}`}
								onChange={r =>
									props.patchGuildData({
										channels: {
											[channel]: r.id
										}
									})
								}
								guild={props.guildData}
								title={channel}
							/>
						);
					})}
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
						{ title: 'Message Delete', name: 'messageDelete' }
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
};

export default SettingsPage;
