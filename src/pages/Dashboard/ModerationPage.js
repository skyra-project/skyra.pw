import React, { Fragment } from 'react';

import SelectRole from 'components/SelectRole';
import SelectChannel from 'components/SelectChannel';

import Section from './components/Section';
import SimpleGrid from './components/SimpleGrid';

const SettingsPage = props => {
	return (
		<Fragment>
			{/* Roles */}
			<Section title="Staff Roles">
				<SimpleGrid>
					{['admin', 'moderator', 'staff'].map(role => {
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
								title={role}
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
								title={channel}
							/>
						);
					})}
				</SimpleGrid>
			</Section>
			{/* EndOf Channels */}
		</Fragment>
	);
};

export default SettingsPage;
