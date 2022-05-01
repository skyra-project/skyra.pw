import { ConfigurableMessageEvents, ConfigurableModerationEvents } from '@config/SettingsDataEntries';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import { Theme, Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import SimpleGrid from '@mui/SimpleGrid';
import Link from '@routing/Link';
import SelectBoolean from '@selects/SelectBoolean';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		link: {
			textDecoration: 'none',
			color: theme.palette.primary.main
		}
	})
);

const EventSettings: FC = () => {
	const classes = useStyles();
	const router = useRouter();
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	const [guildId] = router.query.id;

	return (
		<>
			<Section title="Moderation Events">
				<Typography variant="subtitle2" color="textPrimary">
					These events involve moderation actions and require that you setup the Moderation Logs channel on{' '}
					<Link className={classes.link} href={`/guilds/${guildId}/channels`}>
						the Channels page
					</Link>
				</Typography>
				<SimpleGrid>
					{ConfigurableModerationEvents.map(({ title, key, description }, index) => (
						<SelectBoolean
							key={index}
							title={title}
							description={description}
							currentValue={guildSettings[key]}
							onChange={(event) => setGuildSettingsChanges({ [key]: event.target.checked })}
						/>
					))}
				</SimpleGrid>
			</Section>

			<Section title="Message Events">
				<Typography variant="subtitle2" color="textPrimary">
					These events involve message events, the channels to set up vary on the type of event and each channel can be configured on{' '}
					<Link className={classes.link} href={`/guilds/${guildId}/channels`}>
						the Channels page
					</Link>
				</Typography>
				<SimpleGrid>
					{ConfigurableMessageEvents.map(({ title, key, description }, index) => (
						<SelectBoolean
							key={index}
							title={title}
							description={description}
							currentValue={guildSettings[key]}
							onChange={(event) => setGuildSettingsChanges({ [key]: event.target.checked })}
						/>
					))}
				</SimpleGrid>
			</Section>
		</>
	);
};

export default memo(EventSettings);
