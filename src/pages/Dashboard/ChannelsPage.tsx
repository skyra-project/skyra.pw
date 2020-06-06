import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Section from 'components/Section';
import SelectChannel from 'components/Select/SelectChannel';
import SelectChannels from 'components/Select/SelectChannels';
import SimpleGrid from 'components/SimpleGrid';
import { Channels, SettingsPageProps } from 'lib/types/GuildSettings';
import React, { PropsWithChildren } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			[theme.breakpoints.only('md')]: {
				minHeight: 60
			}
		},
		buttonText: {
			display: 'block',
			textAlign: 'left'
		}
	})
);

export default (props: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();

	return (
		<>
			<Section title="Channels">
				<SimpleGrid
					direction="row"
					justify="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 4,
						lg: 4,
						xl: 4
					}}
				>
					{CHANNELS.map(({ name, description, key }, index) => (
						<SelectChannel
							key={index}
							tooltipTitle={description}
							value={props.guildSettings.channels[key]}
							onChange={(channel: typeof props.guildSettings.channels[typeof key]) =>
								props.patchGuildData({
									channels: {
										[key]: channel
									}
								})
							}
							guild={props.guildData}
							label={name}
							buttonProps={{
								fullWidth: true,
								classes: {
									root: classes.button,
									label: classes.buttonText
								}
							}}
						/>
					))}
					<SelectChannels
						key={CHANNELS.length + 1}
						tooltipTitle={DISABLED_CHANNELS.description}
						value={props.guildSettings.disabledChannels}
						onChange={(channels: typeof props.guildSettings.disabledChannels) =>
							props.patchGuildData({
								disabledChannels: channels
							})
						}
						guild={props.guildData}
						label={DISABLED_CHANNELS.name}
						buttonProps={{
							fullWidth: true,
							classes: {
								root: classes.button,
								label: classes.buttonText
							}
						}}
					/>
				</SimpleGrid>
			</Section>
		</>
	);
};

const DISABLED_CHANNELS: Channel = {
	name: 'Disabled Channels',
	description: [
		'A list of channels for disabled commands, for example,',
		'setting up a channel called general will forbid all users',
		'from using my commands there. Moderators+ override this',
		'purposedly to allow them to moderate without switching channels.'
	].join(' '),
	key: 'spam'
};

const CHANNELS: Channel[] = [
	{ name: 'Announcements', description: 'The channel for announcements', key: 'announcements' },
	{ name: 'Greetings', description: 'The channel I will use to send greetings', key: 'greeting' },
	{ name: 'Farewells', description: 'The channel I will use to send farewells', key: 'farewell' },
	{ name: 'Message Logs', description: 'The channel for (non-NSFW) message logs', key: 'message-logs' },
	{
		name: 'Member Logs',
		description: 'The channel for member logs, once enabled, I will post all member related events there.',
		key: 'member-logs'
	},
	{
		name: 'Moderation Logs',
		description: 'The channel for moderation logs, once enabled, I will post all my moderation cases there.',
		key: 'moderation-logs'
	},
	{
		name: 'NSFW Logs',
		description: 'The channel for NSFW message logs, same requirement as normal message logs, but will only send NSFW messages.',
		key: 'nsfw-message-logs'
	},
	{ name: 'Image Logs', description: 'The channel I will use to re-upload all images I see.', key: 'image-logs' },
	{
		name: 'Prune Logs',
		description: 'The channel for prune logs, same requirement as normal mesasge logs, but will only send prune messages.',
		key: 'prune-logs'
	},
	{
		name: 'Reaction Logs',
		description: 'The channel for the reaction logs, same requirement as normal message logs, but will only send message reactions',
		key: 'reaction-logs'
	},
	{ name: 'Spam', description: 'The channel for me to redirect users to when they use commands I consider spammy.', key: 'spam' }
];

interface Channel {
	name: string;
	key: keyof Channels;
	description: string;
}
