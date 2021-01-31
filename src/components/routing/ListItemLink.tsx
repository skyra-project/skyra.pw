import { createStyles, makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@routing/Link';
import clsx from 'clsx';
import React, { forwardRef, ReactElement } from 'react';
import { When } from 'react-if';

interface ListItemLinkProps {
	href: string;
	itemText: string;
	listItemDisabled: boolean;
	listItemDense?: boolean;
	listItemClassName?: string;
	Icon?: ReactElement;
	listItemOnClick(): void;
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

const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>(
	({ href, itemText, listItemDense = false, listItemDisabled = false, listItemOnClick, listItemClassName, Icon }, ref) => {
		const classes = useStyles();

		return (
			<Link href={href} className={classes.menuLink} ref={ref}>
				<ListItem
					button
					dense={listItemDense}
					disabled={listItemDisabled}
					onClick={listItemOnClick}
					className={clsx(listItemClassName, classes.menuLink)}
				>
					<When condition={Boolean(Icon)}>
						<ListItemIcon>{Icon}</ListItemIcon>
					</When>
					<ListItemText primary={itemText} />
				</ListItem>
			</Link>
		);
	}
);

export default ListItemLink;
