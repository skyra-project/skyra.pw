import MuiLink, { LinkProps as MLinkProps } from '@mui/material/Link';
import Typography, { TypographyProps } from '@mui/material/Typography';
import NextLinkComposed, { NextLinkComposedProps } from '@next/NextComposed';
import clsx from 'clsx';
import type { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { CSSProperties, forwardRef, PropsWithChildren, ReactNode } from 'react';
import styles from './Link.module.css';

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
		const pathname = typeof href === 'string' ? href : href.pathname;
		const className = clsx(styles.link, classNameProps, {
			[activeClassName]: router.pathname === pathname && activeClassName
		});

		if (forceSameTab || pathname?.startsWith('/')) {
			return (
				<NextLinkComposed className={className} ref={ref} to={href} {...other}>
					{Boolean(text) ? (
						<Typography component="span" color="primary" variant="body2" {...TextTypographyProps}>
							{text}
						</Typography>
					) : (
						<>{children}</>
					)}
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
				{Boolean(text) ? (
					<Typography component="span" color="primary" variant="body2" {...TextTypographyProps}>
						{text}
					</Typography>
				) : (
					<>{children}</>
				)}
			</MuiLink>
		);
	}
);
