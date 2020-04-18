import Link from '@material-ui/core/Link';
import React, { forwardRef, PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
	to: string;
	text?: string;
}

const RefLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => <RouterLink innerRef={ref} {...props} />);

const CustomLink = ({ to, text, ...props }: PropsWithChildren<LinkProps>) => {
	if (to.startsWith('/')) {
		return (
			<Link {...props} to={to ?? ''} component={RefLink}>
				{text || props.children}
			</Link>
		);
	}

	return (
		<Link {...props} component="a" href={to ?? ''} target="_blank" rel="noopener noreferrer">
			{text || props.children}
		</Link>
	);
};

export default CustomLink;
