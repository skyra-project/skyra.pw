import { SettingsPageProps } from '@config/types/GuildSettings';
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

const StarboardSettings: FC<SettingsPageProps> = props => {
	const classes = useStyles();

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
					value={props.guildSettings.starboard.minimum}
					label="Minimum Stars"
					min={1}
					max={100}
					fullWidth
					onChange={r =>
						props.patchGuildData({
							starboard: {
								minimum: r.target.value
							}
						})
					}
				/>
				<SelectChannel
					value={props.guildSettings.starboard.channel}
					label="Starboard Channel"
					onChange={c =>
						props.patchGuildData({
							starboard: {
								channel: c
							}
						})
					}
					guild={props.guildData}
					buttonProps={{
						fullWidth: true,
						classes: {
							root: classes.button,
							label: classes.buttonText
						}
					}}
				/>
				<SelectChannels
					value={props.guildSettings.starboard.ignoreChannels}
					onChange={channels =>
						props.patchGuildData({
							starboard: {
								ignoreChannels: channels
							}
						})
					}
					guild={props.guildData}
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
