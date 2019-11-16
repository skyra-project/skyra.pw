import React, { Fragment } from 'react';

import SelectRole from 'components/SelectRole';
import SelectChannel from 'components/SelectChannel';
import SelectBoolean from 'components/SelectBoolean';
import Section from '../components/Section';
import SimpleGrid from '../components/SimpleGrid';

const IndexPage = props => {
	return (
		<Fragment>
			{/* Roles */}
			<Section title="Staff Roles">
				<SimpleGrid>
					{['admin', 'moderator'].map(role => {
						const current = props.guildData.roles.find(r => r.id === props.guildSettings.roles[role]);
						const displayValue = current ? current.name : 'None';

						return (
							<SelectRole
								key={role}
								buttonText={`${role}: ${displayValue}`}
								onChange={r =>
									props.patchGuildData({
										roles: {
											[role]: r.id
										}
									})
								}
								guild={props.guildData}
							/>
						);
					})}
				</SimpleGrid>
			</Section>
			{/* EndOf Roles */}

			{/* Channels{ title, guild, onChange, buttonText, sort } */}
			<Section title="Channels">
				<SimpleGrid>
					{['nsfw-message-logs', 'moderation-logs', 'image-logs', 'message-logs', 'member-logs'].map(channel => {
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
							/>
						);
					})}
				</SimpleGrid>
			</Section>
			{/* EndOf Channels */}

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
					].map(setting => {
						return (
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
						);
					})}
				</SimpleGrid>
			</Section>
			{/* EndOf Roles */}
		</Fragment>
	);
};

export default IndexPage;
