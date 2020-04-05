import { TextField } from '@material-ui/core';
import Section from 'components/Section';
import SelectBoolean from 'components/Select/SelectBoolean';
import SelectChannels from 'components/Select/SelectChannels';
import SimpleGrid from 'components/SimpleGrid';
import { Time } from 'meta/constants';
import { Messages, SettingsPageProps } from 'meta/typings/GuildSettings';
import React, { PropsWithChildren } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { PickByValue } from 'utility-types';

export default (props: PropsWithChildren<SettingsPageProps>) => {
	const [debouncedCallback] = useDebouncedCallback((value: string, key: keyof PickByValue<Messages, string>) => {
		props.patchGuildData({
			messages: {
				[key]: value
			}
		});
	}, Time.Second * 2);

	return (
		<>
			<Section title="Experience">
				<SimpleGrid>
					<SelectChannels
						tooltipTitle="The channels configured to not increase the point counter for users."
						value={props.guildSettings.messages.ignoreChannels}
						onChange={(channels: typeof props.guildSettings.messages.ignoreChannels) =>
							props.patchGuildData({
								messages: {
									ignoreChannels: channels
								}
							})
						}
						guild={props.guildData}
						label="Ignored Channels"
					/>
				</SimpleGrid>
			</Section>

			<Section title="Messages I can send">
				<SimpleGrid direction="row" gridItemProps={{ xs: 12 }}>
					{CONFIGURABLE_MESSAGES.map(({ key, name, placeholder }, index) => (
						<TextField
							multiline
							fullWidth
							key={index}
							helperText={placeholder}
							label={name}
							value={props.guildSettings.messages[key] ?? ''}
							onChange={e => debouncedCallback(e.target.value, key)}
							margin="normal"
							rows="3"
						/>
					))}
				</SimpleGrid>
			</Section>

			<Section title="Announcement Messages">
				<SimpleGrid>
					<SelectBoolean
						title="Send announcements in Message Embeds"
						currentValue={props.guildSettings.messages['announcement-embed']}
						description="Whether announcement messages should be send in Message Embeds"
						onChange={bool =>
							props.patchGuildData({
								messages: {
									'announcement-embed': bool
								}
							})
						}
					/>
				</SimpleGrid>
			</Section>
		</>
	);
};

const CONFIGURABLE_MESSAGES: Message[] = [
	{ name: 'Join DMs', key: 'join-dm', placeholder: 'The message I shall send to when a user joins in DMs.' },
	{
		name: 'Greeting',
		key: 'greeting',
		placeholder: [
			'The message I shall send when a user joins. You must set up the greeting channel in channels',
			'page and Member Join on the Events page.'
		].join(' ')
	},
	{
		name: 'Farewell',
		key: 'farewell',
		placeholder: [
			'The message I shall send to when a user leaves. You must setup the farewell channel in the channels',
			'page and Member Leave on the Events page.'
		].join(' ')
	}
];

interface Message {
	name: string;
	placeholder: string;
	key: keyof PickByValue<Messages, string>;
}
