import { CONFIGURABLE_MEMBER_EVENTS, CONFIGURABLE_MESSAGE_EVENTS, CONFIGURABLE_MODERATION_EVENTS } from '@config/SettingsDataEntries';
import { SettingsPageProps } from '@config/types/GuildSettings';
import Section from '@layout/Settings/Section';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import SimpleGrid from '@mui/SimpleGrid';
import Link from '@routing/Link';
import SelectBoolean from '@selects/SelectBoolean';
import React, { PropsWithChildren } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		link: {
			textDecoration: 'none',
			color: theme.palette.primary.main
		}
	})
);

export default (props: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();

	return (
		<>
			<Section title="Moderation Events">
				<Typography variant="subtitle2" color="textPrimary">
					These events involve moderation actions and require that you setup the Moderation Logs channel on{' '}
					<Link className={classes.link} href={`/guilds/${props.guildId}/channels`}>
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
							onChange={event =>
								props.patchGuildData({
									events: {
										[key]: event.target.checked
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
					<Link className={classes.link} href={`/guilds/${props.guildId}/channels`}>
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
							onChange={event =>
								props.patchGuildData({
									events: {
										[key]: event.target.checked
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
					<Link className={classes.link} href={`/guilds/${props.guildId}/channels`}>
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
							onChange={event =>
								props.patchGuildData({
									events: {
										[key]: event.target.checked
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
