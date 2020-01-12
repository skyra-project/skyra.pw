import React, { Fragment } from 'react';

import SelectRole from 'components/Select/SelectRole';
import SelectChannel from 'components/Select/SelectChannel';
import SelectBoolean from 'components/Select/SelectBoolean';

import Section from 'components/Section';
import SimpleGrid from 'components/SimpleGrid';

const IndexPage = props => (
	<Fragment>
		<Section title="Staff Roles">
			<SimpleGrid>
				{['admin', 'moderator'].map(role => (
					<SelectRole
						key={role}
						title={role}
						value={props.guildSettings.roles[role]}
						onChange={r =>
							props.patchGuildData({
								roles: {
									[role]: r
								}
							})
						}
						guild={props.guildData}
					/>
				))}
			</SimpleGrid>
		</Section>

		<Section title="Channels">
			<SimpleGrid>
				{['nsfw-message-logs', 'moderation-logs', 'image-logs', 'message-logs', 'member-logs'].map(channel => (
					<SelectChannel
						key={channel}
						title={channel}
						value={props.guildSettings.channels[channel]}
						onChange={c =>
							props.patchGuildData({
								channels: {
									[channel]: c
								}
							})
						}
						guild={props.guildData}
					/>
				))}
			</SimpleGrid>
		</Section>

		<Section title="Punishment Settings">
			<p>These settings effect what Skyra does when you're punishing (ban, kick, mute, etc) someone.</p>
			<SimpleGrid>
				{[
					{ name: 'Hide Message', key: 'moderation-auto-delete', description: 'Will delete your message to hide the mod.' },
					{ name: 'Message User', key: 'moderation-dm', description: "DM's the punished person with the reason/duration." },
					{
						name: 'Send Punishment Response',
						key: 'moderation-message-display',
						description: 'Responds to the punishment command.'
					},
					{
						name: 'Show Reason',
						key: 'moderation-reason-display',
						description: 'Whether to show the reason in the response.'
					},
					{
						name: 'Show Mod Name',
						key: 'moderator-name-display',
						description: 'Whether to show the moderators name in the DM.'
					}
				].map(setting => (
					<SelectBoolean
						key={setting.key}
						title={setting.name}
						onChange={bool =>
							props.patchGuildData({
								messages: {
									[setting.key]: bool
								}
							})
						}
						currentValue={props.guildSettings.messages[setting.key]}
						description={setting.description}
					/>
				))}
			</SimpleGrid>
		</Section>
	</Fragment>
);

export default IndexPage;
