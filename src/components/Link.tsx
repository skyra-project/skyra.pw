import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { forwardRef, PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
	to: string;
	text?: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		link: {
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

const RefLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => <RouterLink innerRef={ref} {...props} />);

const CustomLink = ({ to, text, ...props }: PropsWithChildren<LinkProps>) => {
	const classes = useStyles();

	if (to.startsWith('/')) {
		return (
			<Link {...props} to={to ?? ''} component={RefLink} className={classes.link}>
				{text || props.children}
			</Link>
		);
	}

	return (
		<Link {...props} component="a" href={to ?? ''} target="_blank" rel="noopener noreferrer" className={classes.link}>
			{text || props.children}
		</Link>
	);
};

export default CustomLink;
