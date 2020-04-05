import Section from 'components/Section';
import SelectBoolean from 'components/Select/SelectBoolean';
import SelectRole from 'components/Select/SelectRole';
import SimpleGrid from 'components/SimpleGrid';
import { Messages, Roles, SettingsPageProps } from 'meta/typings/GuildSettings';
import React, { PropsWithChildren } from 'react';
import { PickByValue } from 'utility-types';

const CONFIGURABLE_ROLES: Array<keyof PickByValue<Roles, string>> = ['admin', 'moderator'];
const CONFIGURABLE_MESSAGES: Message[] = [
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
];
export default (props: PropsWithChildren<SettingsPageProps>) => (
	<>
		<Section title="Staff Roles">
			<SimpleGrid>
				{CONFIGURABLE_ROLES.map((role, index) => (
					<SelectRole
						key={index}
						label={role}
						value={props.guildSettings.roles[role]}
						onChange={r =>
							props.patchGuildData({
								roles: {
									[role]: r
								}
							})
						}
						guild={props.guildData}
						filterEveryone
					/>
				))}
			</SimpleGrid>
		</Section>

		<Section title="Punishment Settings">
			<p>These settings effect what Skyra does when you're punishing (ban, kick, mute, etc) someone.</p>
			<SimpleGrid>
				{CONFIGURABLE_MESSAGES.map(setting => (
					<SelectBoolean
						key={setting.key}
						title={setting.name}
						currentValue={props.guildSettings.messages[setting.key]}
						description={setting.description}
						onChange={bool =>
							props.patchGuildData({
								messages: {
									[setting.key]: bool
								}
							})
						}
					/>
				))}
			</SimpleGrid>
		</Section>
	</>
);

interface Message {
	name: string;
	description: string;
	key: keyof PickByValue<Messages, boolean>;
}
