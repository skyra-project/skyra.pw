import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { forwardRef } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		link: {
			color: theme.palette.primary.main,
			'&:hover': {
				color: theme.palette.primary.dark
			}
		}
	})
);

interface LinkProps {
	href: string;
}

export default forwardRef<HTMLLinkElement, LinkProps>(props => {
	const classes = useStyles();
	return (
		<a href={props.href} className={classes.link}>
			{props.children}
		</a>
	);
});
