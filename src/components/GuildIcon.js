import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { history } from 'meta/constants';
import { getAcronym } from 'meta/util';

const useStyles = makeStyles(theme => ({
	defaultIcon: {
		color: theme.palette.primary.contrastText,
		background: 'transparent'
	}
}));

const GuildIcon = ({ guild }) => {
	const classes = useStyles();
	return (
		<Avatar onClick={() => history.push(`/guilds/${guild.id}`)} src={guild.iconURL} className={classes.defaultIcon}>
			{getAcronym(guild.name)}
		</Avatar>
	);
};

export default GuildIcon;
