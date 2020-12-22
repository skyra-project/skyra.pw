import Link from '#routing/Link';
import { createStyles, makeStyles } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React, { forwardRef, memo, ReactElement } from 'react';

export interface MenuItemLinkProps {
	Icon: ReactElement;
	text: string;
	href: string;
	/** Force the link to open in the same tab */
	forceSameTab?: boolean;
	menuItemDisabled?: boolean;
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

const MenuItemLink = forwardRef<HTMLAnchorElement, MenuItemLinkProps>(({ href, text, forceSameTab = false, menuItemDisabled = false, Icon }, ref) => {
	const classes = useStyles();

	return (
		<Link href={href} forceSameTab={forceSameTab} className={classes.menuLink} ref={ref}>
			<MenuItem disabled={menuItemDisabled}>
				<ListItemIcon>{Icon}</ListItemIcon>
				<Typography variant="inherit">{text}</Typography>
			</MenuItem>
		</Link>
	);
});

export default memo(MenuItemLink, () => true);
