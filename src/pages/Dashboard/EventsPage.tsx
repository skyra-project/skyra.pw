import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Section from 'components/Section';
import SelectBoolean from 'components/Select/SelectBoolean';
import SimpleGrid from 'components/SimpleGrid';
import { Events, SettingsPageProps } from 'meta/typings/GuildSettings';
import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		link: {
			textDecoration: 'none',
			color: theme.palette.primary.main
		}
	})
);

const CONFIGURABLE_MODERATION_EVENTS: Event[] = [
	{ title: 'Ban Added', key: 'banAdd', description: 'This event posts anonymous moderation logs when a user gets banned.' },
	{ title: 'Ban Revoked', key: 'banRemove', description: 'This event posts anonymous moderation logs when a user gets unbanned' }
];

const CONFIGURABLE_MEMBER_EVENTS: Event[] = [
	{ title: 'Member Join', key: 'memberAdd', description: 'This event posts member logs when a user joins' },
	{ title: 'Member Leave', key: 'memberRemove', description: 'This event posts member logs when a user leaves' },
	{ title: 'Member Role Changes', key: 'memberRoleUpdate', description: "This events posts member logs when a member's roles change" },
	{ title: 'Member Name Changes', key: 'memberNameUpdate', description: 'This events posts member logs when a member changes their name' }
];

const CONFIGURABLE_MESSAGE_EVENTS: Event[] = [
	{
		title: 'Message Edit',
		key: 'messageEdit',
		description:
			'This event logs to the Message Logs channel when a message is edited. NSFW messages will be send to the NSFW Logs channel'
	},
	{
		title: 'Message Delete',
		key: 'messageDelete',
		description:
			'This event logs to the Message Logs channel when a message is deleted. NSFW messages will be send to the NSFW Logs channel'
	},
	{
		title: 'Twemoji Reactions',
		key: 'twemoji-reactions',
		description:
			'This event posts messages whenever a member reacts to a message with a twemoji, they will be send to the Reaction Logs channel'
	}
];

export default (props: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();

	return (
		<>
			<Section title="Moderation Events">
				<Typography variant="subtitle2" color="textPrimary">
					These events involve moderation actions and require that you setup the Moderation Logs channel on{' '}
					<Link className={classes.link} to={`/guilds/${props.guildID}/channels`}>
						the Channels page
					</Link>
				</Typography>
				<SimpleGrid>
					{CONFIGURABLE_MODERATION_EVENTS.map(({ title, key, description }, index) => (
						<SelectBoolean
							key={index}
							title={title}
							description={description}
							currentValue={props.guildSettings.events[key]}
							onChange={r =>
								props.patchGuildData({
									events: {
										[key]: r
									}
								})
							}
						/>
					))}
				</SimpleGrid>
			</Section>

			<Section title="Member Events">
				<Typography variant="subtitle2" color="textPrimary">
					These events involve member actions and require that you setup the Member Logs channel on{' '}
					<Link className={classes.link} to={`/guilds/${props.guildID}/channels`}>
						the Channels page
					</Link>
				</Typography>
				<SimpleGrid>
					{CONFIGURABLE_MEMBER_EVENTS.map(({ title, key, description }, index) => (
						<SelectBoolean
							key={index}
							title={title}
							description={description}
							currentValue={props.guildSettings.events[key]}
							onChange={r =>
								props.patchGuildData({
									events: {
										[key]: r
									}
								})
							}
						/>
					))}
				</SimpleGrid>
			</Section>

			<Section title="Message Events">
				<Typography variant="subtitle2" color="textPrimary">
					These events involve message events, the channels to set up vary on the type of event and each channel can be configured
					on{' '}
					<Link className={classes.link} to={`/guilds/${props.guildID}/channels`}>
						the Channels page
					</Link>
				</Typography>
				<SimpleGrid>
					{CONFIGURABLE_MESSAGE_EVENTS.map(({ title, key, description }, index) => (
						<SelectBoolean
							key={index}
							title={title}
							description={description}
							currentValue={props.guildSettings.events[key]}
							onChange={r =>
								props.patchGuildData({
									events: {
										[key]: r
									}
								})
							}
						/>
					))}
				</SimpleGrid>
			</Section>
		</>
	);
};

interface Event {
	title: string;
	key: keyof Events;
	description: string;
}
