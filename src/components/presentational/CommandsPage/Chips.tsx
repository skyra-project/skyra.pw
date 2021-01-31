import type { FlattenedCommand } from '@config/types/ApiData';
import Chip from '@material-ui/core/Chip';
import { amber, deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LockIcon from '@material-ui/icons/Lock';
import { useMobileContext } from 'contexts/MobileContext';
import DiscordIcon from 'mdi-react/DiscordIcon';
import React, { FC, memo, useMemo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		chip: {
			padding: theme.spacing(0.2),
			marginLeft: theme.spacing(1)
		},
		rankIcon: {
			transform: 'rotate(-90deg)',
			color: amber[500]
		},
		discordIcon: {
			color: '#7289DA' // Discord Blurple
		},
		guardedIcon: {
			color: deepOrange[500]
		}
	})
);

interface ChipsProps {
	command: FlattenedCommand;
}

const Chips: FC<ChipsProps> = ({ command }) => {
	const classes = useStyles();
	const { isMobile } = useMobileContext();

	const titles = useMemo<Record<number, string>>(
		() => ({
			4: 'This command can only be run by staff members.',
			5: 'This command can only be run by moderators and administrators.',
			6: 'This command can only be run by administrators.'
		}),
		[]
	);

	const mobileTitles = useMemo<Record<number, string>>(
		() => ({
			4: 'Only for staff members',
			5: 'moderators & administrators only',
			6: 'Only for administrators'
		}),
		[]
	);

	return (
		<Grid container spacing={1} direction="row" alignContent="center" alignItems="center" justify="flex-start">
			{command.permissionLevel > 0 && (
				<Grid item xs={12} md={5}>
					<Chip
						size="small"
						label={isMobile ? mobileTitles[command.permissionLevel] : titles[command.permissionLevel]}
						icon={<DoubleArrowIcon />}
						color="secondary"
						classes={{
							root: classes.chip,
							iconSmall: classes.rankIcon
						}}
					/>
				</Grid>
			)}
			{command.guildOnly && (
				<Grid item xs={12} md={5}>
					<Chip
						size="small"
						label={isMobile ? 'Unusable in DMs.' : 'This command cannot be used in DMs.'}
						icon={<DiscordIcon />}
						color="secondary"
						classes={{
							root: classes.chip,
							iconSmall: classes.discordIcon
						}}
					/>
				</Grid>
			)}
			{command.guarded && (
				<Grid item xs={12} md={5}>
					<Chip
						size="small"
						label="This command cannot be disabled."
						color="secondary"
						icon={<LockIcon />}
						classes={{
							root: classes.chip,
							iconSmall: classes.guardedIcon
						}}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default memo(Chips);
