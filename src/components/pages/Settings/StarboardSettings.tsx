import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SimpleGrid from '@mui/SimpleGrid';
import SelectChannel from '@selects/SelectChannel';
import SelectChannels from '@selects/SelectChannels';
import SelectInteger from '@selects/SelectInteger';
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
		}
	})
);

const StarboardSettings: FC = () => {
	const classes = useStyles();
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Section title="Starboard Settings">
			<SimpleGrid
				direction="row"
				justify="flex-start"
				gridItemProps={{
					xs: 12,
					sm: 12,
					md: 12,
					lg: 12,
					xl: 12
				}}
			>
				<SelectInteger
					value={guildSettings['starboard.minimum']}
					label="Minimum Stars"
					min={1}
					max={100}
					fullWidth
					onChange={event =>
						setGuildSettingsChanges({
							'starboard.minimum': event.target.value
						})
					}
				/>
				<SelectChannel
					value={guildSettings['starboard.channel']}
					label="Starboard Channel"
					onChange={newChannel =>
						setGuildSettingsChanges({
							'starboard.channel': newChannel
						})
					}
					guild={guildData}
					buttonProps={{
						fullWidth: true,
						classes: {
							root: classes.button,
							label: classes.buttonText
						}
					}}
				/>
				<SelectChannels
					value={guildSettings['starboard.ignoreChannels']}
					onChange={newChannels =>
						setGuildSettingsChanges({
							'starboard.ignoreChannels': newChannels
						})
					}
					guild={guildData}
					label="Ignored Channels"
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
	);
};

export default memo(StarboardSettings);
