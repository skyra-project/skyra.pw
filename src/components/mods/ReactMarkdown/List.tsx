import MuiList from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { forwardRef } from 'react';
import type { NormalComponents } from 'react-markdown/src/ast-to-react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		list: {
			[theme.breakpoints.up('md')]: {
				paddingRight: theme.spacing(75)
			}
		}
	})
);

const List = forwardRef<HTMLUListElement, Parameters<Exclude<NormalComponents['li'], 'li'>>[0]>(({ children }, ref) => {
	const classes = useStyles();
	return (
		<MuiList classes={{ root: classes.list }} ref={ref} dense disablePadding>
			{children}
		</MuiList>
	);
});

export default List;
