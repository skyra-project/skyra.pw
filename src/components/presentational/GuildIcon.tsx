import type { TransformedLoginData } from '#config/types/ApiData';
import LazyAvatar from '#mui/LazyAvatar';
import { displayIconURL, getAcronym } from '#utils/util';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';
import type { ValuesType } from 'utility-types';

interface GuildIconProps {
	guild?: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	size?: number;
	sizeClass?: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		avatar: {
			color: theme.palette.secondary.contrastText,
			background: theme.palette.secondary.main
		}
	})
);

const GuildIcon: FC<GuildIconProps> = ({ guild, sizeClass, size = 128 }) => {
	const classes = useStyles();

	if (!guild) {
		return null;
	}

	return (
		<LazyAvatar classes={{ root: clsx(classes.avatar, sizeClass) }} imgProps={{ height: 256, width: 256 }} src={displayIconURL(guild, { size })}>
			{getAcronym(guild.name)}
		</LazyAvatar>
	);
};

export default GuildIcon;
