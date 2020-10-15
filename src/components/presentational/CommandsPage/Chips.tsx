import { FlattenedCommand } from '@config/types/ApiData';
import Chip from '@material-ui/core/Chip';
import { amber, deepOrange } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LockIcon from '@material-ui/icons/Lock';
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

	const titles = useMemo<Record<number, string>>(
		() => ({
			4: 'This command can only be run by staff members.',
			5: 'This command can only be run by moderators and administrators.',
			6: 'This command can only be run by administrators.'
		}),
		[]
	);

	return (
		<>
			{command.permissionLevel > 0 && (
				<Chip
					size="small"
					label={titles[command.permissionLevel]}
					icon={<DoubleArrowIcon />}
					color="secondary"
					classes={{
						root: classes.chip,
						iconSmall: classes.rankIcon
					}}
				/>
			)}
			{command.guildOnly && (
				<Chip
					size="small"
					label="This command cannot be used in DMs."
					icon={<DiscordIcon />}
					color="secondary"
					classes={{
						root: classes.chip,
						iconSmall: classes.discordIcon
					}}
				/>
			)}
			{command.guarded && (
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
			)}
		</>
	);
};

export default memo(Chips);
