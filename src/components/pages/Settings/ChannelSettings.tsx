import { ConfigurableIgnoreChannels, ConfigurableLoggingChannels } from '@config/SettingsDataEntries';
import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import SimpleGrid from '@mui/SimpleGrid';
import SelectChannel from '@selects/SelectChannel';
import SelectChannels from '@selects/SelectChannels';
import { handleResetKey } from '@utils/util';
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
			[theme.breakpoints.down('lg')]: {
				marginTop: theme.spacing(5)
			}
		}
	})
);

const ChannelSettings: FC = () => {
	const classes = useStyles();
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<>
			<PageHeader
				title="Channels"
				subtitle={
					<>
						Here you can configure different kinds of channels for Skyra. Hover over a button to get more information for that specific
						channel.
					</>
				}
			/>

			<Section title="Logging Channels">
				<SimpleGrid
					direction="row"
					justifyContent="flex-start"
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
							onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, key)}
							onChange={(channel: typeof guildSettings[typeof key]) => {
								return setGuildSettingsChanges({ [key]: channel });
							}}
							guild={guildData}
							label={name}
							ButtonProps={{
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
					justifyContent="flex-start"
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
							onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, key)}
							onChange={(channel: typeof guildSettings[typeof key]) => setGuildSettingsChanges({ [key]: channel })}
							guild={guildData}
							label={name}
							ButtonProps={{
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
		</>
	);
};

export default memo(ChannelSettings);
