import MuiLink from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import NextComposed from '@next/NextComposed';
import clsx from 'clsx';
import { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { Else, If, Then } from 'react-if';
import { UrlObject } from 'url';

interface LinkProps extends NextLinkProps {
	/** The href to navigate to */
	href: string | UrlObject;
	/** Force the link to open in the same tab */
	forceSameTab?: boolean;
	/** Optionally text to render inside a Typography component. If not provided then this will render children */
	text?: ReactNode;
	/** Additional props to pass to the typography component, only used when {@link LinkProps.text} is provided */
	TextTypographyProps?: TypographyProps;
	/** Class to apply when this route is the current route */
	activeClassName?: string;
	/** Additional classes to apply to each Link */
	className?: string;
	/** Additional Style properties to apply */
	style?: CSSProperties;
	/** Action to trigger when clicking this link, will trigger along with the navigation */
	onClick?: (...args: unknown[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		link: {
			cursor: 'pointer',
			color: theme.palette.primary.main,
			'&:hover': {
				color: theme.palette.primary.dark
			},
			'&:visited': {
				color: theme.palette.augmentColor({ main: theme.palette.primary.main }).dark
			}
		}
	})
);

export default forwardRef<HTMLAnchorElement, PropsWithChildren<LinkProps>>(
	(
		{ href, forceSameTab, activeClassName = 'active', className: classNameFromProps, text, children, TextTypographyProps, ...other },
		ref
	) => {
		const router = useRouter();
		const classes = useStyles();
		const pathname = typeof href === 'string' ? href : href.pathname;
		const className = clsx(classes.link, classNameFromProps, {
			[activeClassName]: router.pathname === pathname && activeClassName
		});

		if (forceSameTab || pathname?.startsWith('/')) {
			return (
				<NextComposed className={className} ref={ref} href={href} {...other}>
					<If condition={Boolean(text)}>
						<Then>
							<Typography component="span" color="primary" variant="body2" {...TextTypographyProps}>
								{text}
							</Typography>
						</Then>
						<Else>{children}</Else>
					</If>
				</NextComposed>
			);
		}

		return (
			<MuiLink target="_blank" rel="noopener noreferrer" className={className} ref={ref} href={href as string} {...other}>
				<If condition={Boolean(text)}>
					<Then>
						<Typography component="span" color="primary" variant="body2" {...TextTypographyProps}>
							{text}
						</Typography>
					</Then>
					<Else>{children}</Else>
				</If>
			</MuiLink>
		);
	}
);
