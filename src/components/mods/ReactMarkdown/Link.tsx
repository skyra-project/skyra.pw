import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RouterLink from '@routing/Link';
import { AnyRef, cast } from '@utils/util';
import React, { forwardRef } from 'react';
import type { NormalComponents } from 'react-markdown/src/ast-to-react';

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

const SkyraPwPathRegex = /<?https:\/\/skyra\.pw(?<path>\/[a-z]+)?>?/;

const Link = forwardRef<HTMLAnchorElement, Parameters<Exclude<NormalComponents['link'], 'link'>>[0]>(({ children, ...props }, ref) => {
	const classes = useStyles();
	const { href } = cast<LinkProps>(props);

	// If there is no href then this is actually referring to an optional argument so we parse it literally
	if (!href) {
		return (
			<Typography component="span" color="textPrimary" variant="body2" ref={ref as AnyRef}>
				{'['}
				{children}
				{']'}
			</Typography>
		);
	}

	// If the link starts with a / then it is an internal link
	if (href.startsWith('https://skyra.pw')) {
		return (
			<RouterLink
				href={href.endsWith('pw') ? '/' : SkyraPwPathRegex.exec(href)?.groups?.path ?? href}
				ref={ref as AnyRef}
				text={children}
				TextTypographyProps={{ classes: { root: classes.brokenWordText } }}
			/>
		);
	}

	// If the href doesn't start with `http` then it's not a valid URL so we don't want to parse it as a clickable link
	if (!href.startsWith('http')) {
		return (
			<Typography ref={ref as AnyRef} component="span" color="primary" variant="body2" classes={{ root: classes.brokenWordText }}>
				{children}
			</Typography>
		);
	}

	// Otherwise show a link
	return <RouterLink href={href} ref={ref as AnyRef} text={children} TextTypographyProps={{ classes: { root: classes.brokenWordText } }} />;
});

export default Link;
