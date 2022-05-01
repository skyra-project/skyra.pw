import MuiLink, { LinkProps as MLinkProps } from '@mui/material/Link';
import Typography, { TypographyProps } from '@mui/material/Typography';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import NextLinkComposed, { NextLinkComposedProps } from '@next/NextComposed';
import clsx from 'clsx';
import type { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { CSSProperties, forwardRef, PropsWithChildren, ReactNode } from 'react';
import { Else, If, Then } from 'react-if';

type LinkProps = {
	/** The href to navigate to */
	href: NextLinkProps['href'];
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

	as?: NextLinkProps['as'];
	linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
	noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
	Omit<MLinkProps, 'href'>;

const useStyles = makeStyles((theme) =>
	createStyles({
		link: {
			cursor: 'pointer',
			color: theme.palette.primary.main,
			'&:hover': {
				color: theme.palette.primary.dark
			},
			'&:visited': {
				color: theme.palette.augmentColor({ color: { main: theme.palette.primary.main } }).dark
			}
		}
	})
);

export default forwardRef<HTMLAnchorElement, PropsWithChildren<LinkProps>>(
	(
		{
			activeClassName = 'active',
			as,
			className: classNameProps,
			href,
			linkAs: linkAsProp,
			locale,
			noLinkStyle,
			prefetch,
			replace,
			role,
			scroll,
			shallow,
			forceSameTab,
			text,
			children,
			TextTypographyProps,
			...other
		},
		ref
	) => {
		const router = useRouter();
		const classes = useStyles();
		const pathname = typeof href === 'string' ? href : href.pathname;
		const className = clsx(classes.link, classNameProps, {
			[activeClassName]: router.pathname === pathname && activeClassName
		});

		if (forceSameTab || pathname?.startsWith('/')) {
			return (
				<NextLinkComposed className={className} ref={ref} to={href} {...other}>
					<If condition={Boolean(text)}>
						<Then>
							<Typography component="span" color="primary" variant="body2" {...TextTypographyProps}>
								{text}
							</Typography>
						</Then>
						<Else>{children}</Else>
					</If>
				</NextLinkComposed>
			);
		}

		const linkAs = linkAsProp || as;
		const nextjsProps = { to: href, linkAs, replace, scroll, shallow, prefetch, locale };

		return (
			<MuiLink
				component={NextLinkComposed}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
				ref={ref}
				underline="hover"
				{...nextjsProps}
				{...other}
			>
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
