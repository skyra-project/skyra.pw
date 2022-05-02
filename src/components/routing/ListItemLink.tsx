import type { SxProps, Theme } from '@mui/material/styles';
import Link from '@routing/Link';
import { useRouter } from 'next/router';
import React, { forwardRef, ReactElement } from 'react';
import styles from './ListItemLink.module.css';

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface ListItemLinkProps {
	href: string;
	itemText: string;
	listItemDisabled: boolean;
	listItemDense?: boolean;
	listItemSx?: SxProps<Theme>;
	Icon?: ReactElement;
	listItemOnClick(): void;
}

const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>(
	({ href, itemText, listItemDense = false, listItemDisabled = false, listItemOnClick, listItemSx, Icon }, ref) => {
		const router = useRouter();

		return (
			<Link href={href} className={styles.menuItem} ref={ref}>
				<ListItem
					button
					dense={listItemDense}
					disabled={listItemDisabled}
					onClick={listItemOnClick}
					sx={{
						color: 'inherit',
						'&:hover': {
							color: 'inherit'
						},
						'&:visited': {
							color: 'inherit'
						},
						...(href === router.asPath && {
							backgroundColor: 'rgba(150, 150, 150, 0.3)'
						}),
						...listItemSx
					}}
				>
					{Boolean(Icon) && <ListItemIcon>{Icon}</ListItemIcon>}
					<ListItemText primary={itemText} />
				</ListItem>
			</Link>
		);
	}
);

export default ListItemLink;
