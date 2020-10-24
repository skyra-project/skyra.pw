import { CHANNELS, DISABLED_CHANNELS, IGNORE_CHANNELS, LOGGING_CHANNELS } from '@config/SettingsDataEntries';
import { SettingsPageProps } from '@config/types/GuildSettings';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import SimpleGrid from '@mui/SimpleGrid';
import SelectChannel from '@selects/SelectChannel';
import SelectChannels from '@selects/SelectChannels';
import React, { FC, memo } from 'react';

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

const Channel: FC<SettingsPageProps> = props => {
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

export default memo(Channel);
