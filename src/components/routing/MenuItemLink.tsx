import Link from '@routing/Link';
import { forwardRef, memo, type ReactElement } from 'react';
import styles from './MenuItemLink.module.css';

import { ListItemIcon, MenuItem, Typography } from '@mui/material';

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
