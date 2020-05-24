import { Box, createStyles, IconButton, List, ListItem, ListItemText, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Section from 'components/Section';
import SelectBoolean from 'components/Select/SelectBoolean';
import SelectChannels from 'components/Select/SelectChannels';
import SimpleGrid from 'components/SimpleGrid';
import Tooltip from 'components/Tooltip';
import { Messages, SettingsPageProps } from 'lib/types/GuildSettings';
import React, { PropsWithChildren } from 'react';
import { PickByValue } from 'utility-types';

enum Matches {
	Guild = '%GUILD%',
	Member = '%MEMBER%',
	MemberName = '%MEMBERNAME%',
	MemberTag = '%MEMBERTAG%',
	MemberCount = '%MEMBERCOUNT%',
	Position = '%POSITION%'
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		sectionHeader: {
			display: 'flex',
			alignContent: 'center',
			alignItems: 'center'
		},
		primaryItemText: {
			fontWeight: theme.typography.fontWeightBold
		},
		secondaryItemText: {
			color: theme.palette.primary.contrastText
		}
	})
);

export default ({ guildData, guildSettings, patchGuildData }: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();

	const CONFIGURABLE_MESSAGES: Message[] = [
		{
			name: 'Join DMs',
			key: 'join-dm',
			placeholder: [!guildSettings.events.memberAdd ? 'You must configure Member Join on the Events page.' : null].join(' '),
			tooltipText: 'This is the message I will send in a DM to a member when they join.'
		},
		{
			name: 'Greeting',
			key: 'greeting',
			placeholder: [
				!guildSettings.channels.greeting ? 'You must set up the greeting channel in channels page.' : null,
				!guildSettings.events.memberAdd ? 'You must configure Member Join on the Events page.' : null
			].join(' '),
			tooltipText: `This is the message I will send to ${
				guildData?.channels.find(c => c.id === guildSettings.channels.greeting)?.name ?? 'the configured Greeting channel'
			} when a member joins.`
		},
		{
			name: 'Farewell',
			key: 'farewell',
			placeholder: [
				!guildSettings.channels.farewell ? 'You must set up the farewell channel in channels page.' : null,
				!guildSettings.events.memberRemove ? 'You must configure Member Leave on the Events page.' : null
			].join(' '),
			tooltipText: `This is the message I will send to ${
				guildData?.channels.find(c => c.id === guildSettings.channels.farewell)?.name ?? 'the configured Farewell channel'
			} when a member leaves.`
		}
	];

	const REPLACEABLE_MATCHERS: Matcher[] = [
		{ matchKey: Matches.Guild, description: `I will replace this with ${guildData?.name}` },
		{ matchKey: Matches.Member, description: `I will replace this a mention of the member` },
		{ matchKey: Matches.MemberName, description: `I will replace this with the username of the member` },
		{ matchKey: Matches.MemberTag, description: `I will replace this with the unique tag of the member` },
		{ matchKey: Matches.MemberCount, description: `I will replace this with the amount of members currently in the server` },
		{
			matchKey: Matches.Position,
			description: `I will replace this with the ordinal position this member has in the server.`
		}
	];

	return (
		<>
			<Section title="Experience">
				<SimpleGrid>
					<SelectChannels
						tooltipTitle="The channels configured to not increase the point counter for users."
						value={guildSettings.messages.ignoreChannels}
						onChange={(channels: typeof guildSettings.messages.ignoreChannels) =>
							patchGuildData({
								messages: {
									ignoreChannels: channels
								}
							})
						}
						guild={guildData}
						label="Ignored Channels"
					/>
				</SimpleGrid>
			</Section>

			<Section
				title={
					<>
						<Typography variant="h5" component="span">
							Messages I can send
						</Typography>
						<Tooltip
							title={
								<Box p={1}>
									<Typography variant="body2">
										{[
											'These messages support various special texts that will be replaced',
											'when the message is triggered.',
											'You can read more about each of the replaceable bits by hovering over the text field.'
										].join(' ')}
									</Typography>
									<List dense disablePadding>
										{REPLACEABLE_MATCHERS.map((matcher, index) => (
											<ListItem key={index} dense disableGutters>
												<ListItemText
													primary={matcher.matchKey}
													secondary={matcher.description}
													primaryTypographyProps={{ variant: 'body2', className: classes.primaryItemText }}
													secondaryTypographyProps={{
														variant: 'body2',
														className: classes.secondaryItemText,
														style: { color: 'black' }
													}}
												/>
											</ListItem>
										))}
									</List>
								</Box>
							}
						>
							<IconButton disableFocusRipple disableRipple disableTouchRipple color="primary">
								<InfoIcon />
							</IconButton>
						</Tooltip>
					</>
				}
				disableTypography
				titleProps={{
					className: classes.sectionHeader
				}}
			>
				<SimpleGrid direction="row" gridItemProps={{ xs: 12 }}>
					{CONFIGURABLE_MESSAGES.map(({ key, name, placeholder, tooltipText }, index) => (
						<Tooltip title={tooltipText} placement="top-start" key={index}>
							<TextField
								multiline
								fullWidth
								helperText={placeholder}
								FormHelperTextProps={{
									error: true
								}}
								label={name}
								value={guildSettings.messages[key] ?? ''}
								onChange={e =>
									patchGuildData({
										messages: {
											[key]: e.target.value
										}
									})
								}
								margin="normal"
								rows="3"
							/>
						</Tooltip>
					))}
				</SimpleGrid>
			</Section>

			<Section title="Announcement Messages">
				<SimpleGrid>
					<SelectBoolean
						title="Send announcements in Message Embeds"
						currentValue={guildSettings.messages['announcement-embed']}
						description="Whether announcement messages should be send in Message Embeds"
						onChange={event =>
							patchGuildData({
								messages: {
									'announcement-embed': event.target.checked
								}
							})
						}
					/>
				</SimpleGrid>
			</Section>
		</>
	);
};

interface Message {
	name: string;
	placeholder: string;
	tooltipText: string;
	key: keyof PickByValue<Messages, string>;
}

interface Matcher {
	matchKey: Matches;
	description: string;
}
