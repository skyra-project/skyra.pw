import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RouterLink from '@routing/Link';
import React, { forwardRef } from 'react';

interface LinkProps {
	href: string;
}

const useStyles = makeStyles(() =>
	createStyles({
		brokenWordText: {
			wordBreak: 'break-word'
		}
	})
);

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, children }, ref) => {
	const classes = useStyles();

	// If there is no href then this is actually referring to an optional argument so we parse it literally
	if (!href) {
		return (
			<Typography component="span" color="textPrimary" variant="body2" ref={ref}>
				{'['}
				{children}
				{']'}
			</Typography>
		);
	}

	// If the href doesn't start with `http` then it's not a valid URL so we don't want to parse it as a clickable link
	if (!href.startsWith('http')) {
		return (
			<Typography ref={ref} component="span" color="primary" variant="body2" classes={{ root: classes.brokenWordText }}>
				{children}
			</Typography>
		);
	}

	// Otherwise show a link
	return <RouterLink href={href} ref={ref} text={children} TextTypographyProps={{ classes: { root: classes.brokenWordText } }} />;
});

export default Link;
