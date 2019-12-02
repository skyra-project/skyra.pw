import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const RefLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const CustomLink = props => {
	if (props.to.startsWith('/')) {
		return (
			<Link {...props} component={RefLink}>
				{props.text}
			</Link>
		);
	}
	return (
		<Link {...props} component="a" href={props.to} target="_blank" rel="noopener noreferrer">
			{props.text}
		</Link>
	);
};

export default CustomLink;
