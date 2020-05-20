import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Section from 'components/Section';
import SelectChannel from 'components/Select/SelectChannel';
import SelectChannels from 'components/Select/SelectChannels';
import SelectInteger from 'components/Select/SelectInteger';
import SimpleGrid from 'components/SimpleGrid';
import { SettingsPageProps } from 'meta/typings/GuildSettings';
import React, { PropsWithChildren } from 'react';

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

const StarboardPage = (props: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();

	return (
		<Section title="Starboard Settings">
			<SimpleGrid>
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
			</SimpleGrid>
		</Section>
	);
};

export default StarboardPage;
