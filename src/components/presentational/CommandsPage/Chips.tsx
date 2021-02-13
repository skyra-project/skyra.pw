import type { FlattenedCommand } from '@config/types/ApiData';
import Chip from '@material-ui/core/Chip';
import { amber, deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LockIcon from '@material-ui/icons/Lock';
import { useMobileContext } from 'contexts/MobileContext';
import DiscordIcon from 'mdi-react/DiscordIcon';
import React, { FC, memo, useCallback, useMemo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		chip: {
			padding: theme.spacing(0.2),
			marginLeft: theme.spacing(1),
			width: '100%'
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

const GuildOnlyPreconditions = ['Administrator', 'DJ', 'GuildOnly', 'Moderator', 'NewsOnly', 'NSFW', 'TextOnly'];

const Chips: FC<ChipsProps> = ({ command }) => {
	const classes = useStyles();
	const { isMobile } = useMobileContext();

	const titles = useMemo<Record<number, string>>(
		() => ({
			4: 'This can only be ran by staff members.',
			5: 'This can only be ran by moderators and administrators.',
			6: 'This can only be ran by administrators.'
		}),
		[]
	);

	const mobileTitles = useMemo<Record<number, string>>(
		() => ({
			4: 'Staff members only',
			5: 'Moderators & administrators only',
			6: 'Administrators only'
		}),
		[]
	);

	const isGuildOnly = useCallback(() => {
		return command.preconditions.entries
			.flatMap((preconditionEntry) => preconditionEntry.entries)
			.filter(Boolean)
			.map((entry) => entry.name)
			.some((predicate) => GuildOnlyPreconditions.includes(predicate));
	}, [command.preconditions.entries]);

	return (
		<Grid container spacing={1} direction="row" alignContent="center" alignItems="center" justify="flex-start">
			{command.permissionLevel > 0 && (
				<Grid item xs={12} md={5} lg={4}>
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
			{isGuildOnly() && (
				<Grid item xs={12} md={5} lg={4}>
					<Chip
						size="small"
						label={isMobile ? 'Usable in servers only.' : 'This can only be used in servers.'}
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
				<Grid item xs={12} md={5} lg={4}>
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
