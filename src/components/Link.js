import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const RefLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const CustomLink = ({ to, text }) => {
	if (to.startsWith('/')) {
		return (
			<Link component={RefLink} to="/">
				{text}
			</Link>
		);
	}
	return (
		<Link component="a" href={to} target="_blank" rel="noopener noreferrer">
			{text}
		</Link>
	);
};

export default CustomLink;
