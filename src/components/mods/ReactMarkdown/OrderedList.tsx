import MuiList from '@mui/material/List';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React, { forwardRef } from 'react';
import type { OrderedListProps } from 'react-markdown/lib/ast-to-react';

const useStyles = makeStyles((theme) =>
	createStyles({
		list: {
			[theme.breakpoints.up('md')]: {
				paddingRight: theme.spacing(75)
			}
		}
	})
);

const OrderedList = forwardRef<HTMLUListElement, OrderedListProps>(({ children }, ref) => {
	const classes = useStyles();
	return (
		<MuiList classes={{ root: classes.list }} ref={ref} dense disablePadding>
			{children}
		</MuiList>
	);
});

export default OrderedList;
