import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link from '@routing/Link';
import React, { forwardRef, memo, ReactElement } from 'react';

export interface MenuItemLinkProps {
	Icon: ReactElement;
	text: string;
	href: string;
	/** Force the link to open in the same tab */
	forceSameTab?: boolean;
}

const useStyles = makeStyles(() =>
	createStyles({
		menuLink: {
			color: 'inherit',
			'&:hover': {
				color: 'inherit'
			},
			'&:visited': {
				color: 'inherit'
			}
		}
	})
);

const MenuItemLink = forwardRef<HTMLAnchorElement, MenuItemLinkProps>(({ href, text, forceSameTab = false, Icon }, ref) => {
	const classes = useStyles();

	return (
		<Link href={href} forceSameTab={forceSameTab} className={classes.menuLink} ref={ref}>
			<MenuItem>
				<ListItemIcon>{Icon}</ListItemIcon>
				<Typography variant="inherit">{text}</Typography>
			</MenuItem>
		</Link>
	);
});

export default memo(MenuItemLink, () => true);
