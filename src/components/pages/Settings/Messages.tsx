import { CONFIGURABLE_MESSAGES, REPLACEABLE_MATCHERS } from '@config/SettingsDataEntries';
import { SettingsPageProps } from '@config/types/GuildSettings';
import Section from '@layout/Settings/Section';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import SimpleGrid from '@mui/SimpleGrid';
import Tooltip from '@mui/Tooltip';
import SelectBoolean from '@selects/SelectBoolean';
import SelectChannels from '@selects/SelectChannels';
import React, { PropsWithChildren, useMemo } from 'react';

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

	const configurableMessages = useMemo(() => CONFIGURABLE_MESSAGES(guildSettings, guildData), [guildData, guildSettings]);
	const replaceableMatchers = useMemo(() => REPLACEABLE_MATCHERS(guildData), [guildData]);

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
						<Hidden smDown>
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
											{replaceableMatchers.map((matcher, index) => (
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
						</Hidden>
					</>
				}
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
