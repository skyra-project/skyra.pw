import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SimpleGrid from '@mui/SimpleGrid';
import SelectChannel from '@selects/SelectChannel';
import SelectChannels from '@selects/SelectChannels';
import SelectInteger from '@selects/SelectInteger';
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
		}
	})
);

const StarboardSettings: FC = () => {
	const classes = useStyles();
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Section title="Starboard Settings">
			<SimpleGrid
				direction="row"
				justifyContent="flex-start"
				gridItemProps={{
					xs: 12,
					sm: 12,
					md: 12,
					lg: 12,
					xl: 12
				}}
			>
				<SelectInteger
					value={guildSettings.starboardMinimum}
					label="Minimum Stars"
					min={1}
					max={100}
					fullWidth
					onChange={(event) =>
						setGuildSettingsChanges({
							starboardMinimum: parseInt(event.target.value, 10)
						})
					}
				/>
				<SelectChannel
					value={guildSettings.starboardChannel}
					label="Starboard Channel"
					onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, 'starboardChannel')}
					onChange={(newChannel) =>
						setGuildSettingsChanges({
							starboardChannel: newChannel
						})
					}
					guild={guildData}
					ButtonProps={{
						fullWidth: true,
						classes: {
							root: classes.button,
							label: classes.buttonText
						}
					}}
				/>
				<SelectChannels
					value={guildSettings.starboardIgnoreChannels}
					onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, 'starboardIgnoreChannels')}
					onChange={(newChannels) =>
						setGuildSettingsChanges({
							starboardIgnoreChannels: newChannels
						})
					}
					guild={guildData}
					label="Ignored Channels"
					ButtonProps={{
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
