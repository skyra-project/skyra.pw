import {
	ConfigurableChannels,
	ConfigurableDisabledChannels,
	ConfigurableIgnoreChannels,
	ConfigurableLoggingChannels
} from '#config/SettingsDataEntries';
import { useGuildDataContext } from '#contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '#contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '#contexts/Settings/GuildSettingsContext';
import PageHeader from '#layout/Settings/PageHeader';
import Section from '#layout/Settings/Section';
import SimpleGrid from '#mui/SimpleGrid';
import SelectChannel from '#selects/SelectChannel';
import SelectChannels from '#selects/SelectChannels';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
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

const ChannelSettings: FC = () => {
	const classes = useStyles();
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

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
					{ConfigurableLoggingChannels.map(({ name, description, key }, index) => (
						<SelectChannel
							key={index}
							tooltipTitle={description}
							value={guildSettings[key]}
							onChange={(channel: typeof guildSettings[typeof key]) => setGuildSettingsChanges({ [key]: channel })}
							guild={guildData}
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
					{ConfigurableIgnoreChannels.map(({ name, description, key }, index) => (
						<SelectChannels
							key={index}
							tooltipTitle={description}
							value={guildSettings[key]}
							onChange={(channel: typeof guildSettings[typeof key]) => setGuildSettingsChanges({ [key]: channel })}
							guild={guildData}
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
					{ConfigurableChannels.map(({ name, description, key }, index) => (
						<SelectChannel
							key={index}
							tooltipTitle={description}
							value={guildSettings[key]}
							onChange={(channel: typeof guildSettings[typeof key]) => setGuildSettingsChanges({ [key]: channel })}
							guild={guildData}
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
						key={ConfigurableChannels.length + 1}
						tooltipTitle={ConfigurableDisabledChannels.description}
						value={guildSettings.disabledChannels}
						onChange={(channels: typeof guildSettings.disabledChannels) =>
							setGuildSettingsChanges({
								disabledChannels: channels
							})
						}
						guild={guildData}
						label={ConfigurableDisabledChannels.name}
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

export default memo(ChannelSettings);
