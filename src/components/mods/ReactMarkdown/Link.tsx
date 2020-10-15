import RouterLink from '@routing/Link';
import React, { forwardRef } from 'react';

interface LinkProps {
	href: string;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, children }, ref) => {
	// If there is no href then this is actually referring to an optional argument so we parse it literally
	if (!href) {
		return (
			<span ref={ref}>
				{'['}
				{children}
				{']'}
			</span>
		);
	}

	// If the href doesn't start with `http` then it's not a valid URL so we don't want to parse it as a clickable link
	if (!href.startsWith('http')) {
		return <span ref={ref}>{children}</span>;
	}

	// Otherwise show a link
	return (
		<RouterLink href={href} ref={ref}>
			{children}
		</RouterLink>
	);
});

export default Link;
