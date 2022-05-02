import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { forwardRef, PropsWithChildren, AnchorHTMLAttributes } from 'react';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

export interface NextLinkComposedProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>, Omit<NextLinkProps, 'href' | 'as'> {
	to: NextLinkProps['href'];
	linkAs?: NextLinkProps['as'];
}

const NextLinkComposed = forwardRef<HTMLAnchorElement, PropsWithChildren<NextLinkComposedProps>>(
	({ to, linkAs, replace, scroll, shallow, prefetch, locale, ...other }, ref) => (
		<NextLink href={to} prefetch={prefetch} as={linkAs} replace={replace} scroll={scroll} shallow={shallow} passHref locale={locale}>
			<Typography component="span" variant="body2" color="textPrimary">
				<Anchor ref={ref} {...other} />
			</Typography>
		</NextLink>
	)
);

export default NextLinkComposed;
