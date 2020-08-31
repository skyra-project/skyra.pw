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

export default forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	const classes = useStyles();
	return (
		<a href={props.href} className={classes.link} ref={ref}>
			{props.children}
		</a>
	);
});
