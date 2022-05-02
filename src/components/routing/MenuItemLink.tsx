import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link from '@routing/Link';
import React, { forwardRef, memo, ReactElement } from 'react';
import styles from './MenuItemLink.module.css';

export interface MenuItemLinkProps {
	Icon: ReactElement;
	text: string;
	href: string;
	/** Force the link to open in the same tab */
	forceSameTab?: boolean;
}

const MenuItemLink = forwardRef<HTMLAnchorElement, MenuItemLinkProps>(({ href, text, forceSameTab = false, Icon }, ref) => (
	<Link href={href} forceSameTab={forceSameTab} className={styles.menuLink} ref={ref}>
		<MenuItem>
			<ListItemIcon>{Icon}</ListItemIcon>
			<Typography variant="inherit">{text}</Typography>
		</MenuItem>
	</Link>
));

export default memo(MenuItemLink, () => true);
