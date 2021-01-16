/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
import { Typography } from '@material-ui/core';
import NextLink from 'next/link';
import React, { forwardRef, PropsWithChildren } from 'react';
import type { UrlObject } from 'url';

interface NextComposedProps {
	as?: string | UrlObject;
	href: string | UrlObject;
	className?: string;
	prefetch?: boolean;
}

export default forwardRef<HTMLAnchorElement, PropsWithChildren<NextComposedProps>>(({ as, href, prefetch, children, className }, ref) => (
	<NextLink href={href} prefetch={prefetch} as={as}>
		<Typography component="span" variant="body2" color="textPrimary">
			<a ref={ref} className={className}>
				{children}
			</a>
		</Typography>
	</NextLink>
));
