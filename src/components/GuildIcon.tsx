import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import Link from 'components/Link';
import { FlattenedGuild } from 'meta/typings/ApiData';
import { displayIconURL, getAcronym } from 'meta/util';
import React, { PropsWithChildren } from 'react';

interface GuildIconProps {
	guild: FlattenedGuild;
	size?: number;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		avatar: {
			color: theme.palette.secondary.contrastText,
			background: theme.palette.secondary.main
		}
	})
);

export default ({ guild, size = 128 }: PropsWithChildren<GuildIconProps>) => {
	const classes = useStyles();

	return (
		<Link to={`/guilds/${guild.id}`}>
			<Avatar classes={{ root: classes.avatar }} src={displayIconURL(guild, { size })}>
				{getAcronym(guild.name)}
			</Avatar>
		</Link>
	);
};
