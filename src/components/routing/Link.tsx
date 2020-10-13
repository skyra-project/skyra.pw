import MuiLink from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import NextComposed from '@next/NextComposed';
import clsx from 'clsx';
import { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, PropsWithChildren } from 'react';
import { Else, If, Then } from 'react-if';
import { UrlObject } from 'url';

interface LinkProps extends NextLinkProps {
	/** The href to navigate to */
	href: string | UrlObject;
	/** Optionally text to render inside a Typography component. If not provided then this will render children */
	text?: string;
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
	({ href, activeClassName = 'active', className: classNameFromProps, text, children, ...other }, ref) => {
		const router = useRouter();
		const classes = useStyles();
		const pathname = typeof href === 'string' ? href : href.pathname;
		const className = clsx(classNameFromProps, classes.link, {
			[activeClassName]: router.pathname === pathname && activeClassName
		});

		if (pathname?.startsWith('/')) {
			return (
				<NextComposed className={className} ref={ref} href={href} prefetch {...other}>
					<If condition={Boolean(text)}>
						<Then>
							<Typography component="span" color="primary" variant="body2">
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
						<Typography component="span" color="primary" variant="body2">
							{text}
						</Typography>
					</Then>
					<Else>{children}</Else>
				</If>
			</MuiLink>
		);
	}
);
