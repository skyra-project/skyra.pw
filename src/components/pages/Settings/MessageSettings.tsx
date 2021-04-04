import { ConfigurableMessageKeys } from '@config/SettingsDataEntries';
import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SimpleGrid from '@mui/SimpleGrid';
import Tooltip from '@mui/Tooltip';
import SelectBoolean from '@selects/SelectBoolean';
import SelectChannels from '@selects/SelectChannels';
import { handleResetKey } from '@utils/util';
import React, { FC, memo, useMemo } from 'react';

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

const MessageSettings: FC = () => {
	const classes = useStyles();
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

	const configurableMessages = useMemo(() => ConfigurableMessageKeys(guildSettings, guildData), [guildData, guildSettings]);

	return (
		<>
			<Section title="Experience">
				<SimpleGrid>
					<SelectChannels
						tooltipTitle="The channels configured to not increase the point counter for users."
						value={guildSettings.messagesIgnoreChannels}
						onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, 'messagesIgnoreChannels')}
						onChange={(channels: typeof guildSettings.messagesIgnoreChannels) =>
							setGuildSettingsChanges({ messagesIgnoreChannels: channels })
						}
						guild={guildData}
						label="Ignored Channels"
					/>
				</SimpleGrid>
			</Section>

			<Section
				title="Messages I can send"
				disableTypography
				titleProps={{
					className: classes.sectionHeader
				}}
			>
				<SimpleGrid direction="row" gridItemProps={{ xs: 12 }}>
					{configurableMessages.map(({ key, name, placeholder, tooltipText }, index) => (
						<Tooltip title={tooltipText} placement="top-start" key={index}>
							<TextField
								multiline
								fullWidth
								helperText={placeholder}
								FormHelperTextProps={{
									error: true
								}}
								label={name}
								value={guildSettings[key] ?? ''}
								onChange={(e) =>
									setGuildSettingsChanges({
										[key]: e.target.value
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
						currentValue={guildSettings.messagesAnnouncementEmbed}
						description="Whether announcement messages should be send in Message Embeds"
						onChange={(event) =>
							setGuildSettingsChanges({
								messagesAnnouncementEmbed: event.target.checked
							})
						}
					/>
				</SimpleGrid>
			</Section>
		</>
	);
};

export default memo(MessageSettings);
