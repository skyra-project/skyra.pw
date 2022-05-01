import { Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import RouterLink from '@routing/Link';
import React, { AnchorHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
import type { WithReactMarkdownChildren } from './types';

const useStyles = makeStyles(() =>
	createStyles({
		brokenWordText: {
			wordBreak: 'break-word'
		}
	})
);

const SkyraPwPathRegex = /<?https:\/\/skyra\.pw(?<path>\/[a-z]+)?>?/;

type LinkProps = WithReactMarkdownChildren<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ children, href }, ref) => {
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

	// If the link starts with a / then it is an internal link
	if (href.startsWith('https://skyra.pw')) {
		return (
			<RouterLink
				href={href.endsWith('pw') ? '/' : SkyraPwPathRegex.exec(href)?.groups?.path ?? href}
				ref={ref}
				text={children}
				TextTypographyProps={{ classes: { root: classes.brokenWordText } }}
			/>
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
