import { Channels, IgnoreChannels, SettingsPageProps } from '@config/types/GuildSettings';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import SimpleGrid from '@mui/SimpleGrid';
import SelectChannel from '@selects/SelectChannel';
import SelectChannels from '@selects/SelectChannels';
import React, { PropsWithChildren } from 'react';
import { PickByValue } from 'utility-types';

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
		},
		sectionSpacer: {
			marginTop: theme.spacing(10),
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(5)
			}
		}
	})
);

export default (props: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();

	return (
		<>
			<PageHeader
				title="Channels"
				subtitle={
					<>
						Here you can configure different kinds of channels for Skyra. Hover over a button to get more information for that
						specific channel.
					</>
				}
			/>

			<Section title="Logging Channels">
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
					{LOGGING_CHANNELS.map(({ name, description, key }, index) => (
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
				</SimpleGrid>
			</Section>
			<Section title="Logging Ignore Channels" className={classes.sectionSpacer}>
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
					{IGNORE_CHANNELS.map(({ name, description, key }, index) => (
						<SelectChannels
							key={index}
							tooltipTitle={description}
							value={props.guildSettings.channels.ignore[key]}
							onChange={(channel: typeof props.guildSettings.channels.ignore[typeof key]) =>
								props.patchGuildData({
									channels: {
										ignore: {
											[key]: channel
										}
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
				</SimpleGrid>
			</Section>
			<Section title="Other Channels" className={classes.sectionSpacer}>
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
	{ name: 'Spam', description: 'The channel for me to redirect users to when they use commands I consider spammy.', key: 'spam' }
];

const LOGGING_CHANNELS: Channel[] = [
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
	}
];

const IGNORE_CHANNELS: IgnoreChannel[] = [
	{ name: 'All logs', description: 'Channels I should ignore for all types of logging.', key: 'all' },
	{
		name: 'Message delete logs',
		description: 'Channels I should ignore when checking for deleted messages to log.',
		key: 'message-delete'
	},
	{ name: 'Message edit logs', description: 'Channels I should ignore when checking for edited messags to log.', key: 'message-edit' },
	{ name: 'Reaction add logs', description: 'Channels I should ignore when checking for added reactions.', key: 'reaction-add' }
];

interface Channel {
	name: string;
	key: keyof PickByValue<Channels, string>;
	description: string;
}

interface IgnoreChannel {
	name: string;
	key: keyof IgnoreChannels;
	description: string;
}
