import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'components/Link';
import { FlattenedGuild } from 'meta/typings/ApiData';
import { displayIconURL, getAcronym } from 'meta/util';
import React, { Fragment, PropsWithChildren } from 'react';

interface GuildIconProps {
	guild?: FlattenedGuild;
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

export default ({ guild, sizeClass, size = 128 }: PropsWithChildren<GuildIconProps>) => {
	const classes = useStyles();

	if (!guild) {
		return <Fragment />;
	}

	return (
		<Link to={`/guilds/${guild.id}`}>
			<Avatar classes={{ root: clsx(classes.avatar, sizeClass) }} src={displayIconURL(guild, { size })}>
				{getAcronym(guild.name)}
			</Avatar>
		</Link>
	);
};
