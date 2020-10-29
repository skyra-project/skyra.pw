import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { forwardRef, ReactNodeArray } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		strongText: {
			display: 'flex',
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'flex-start',
			fontWeight: theme.typography.fontWeightBold
		},
		inlineText: {
			display: 'inline'
		}
	})
);

const Strong = forwardRef<HTMLSpanElement>(({ children }, ref) => {
	const classes = useStyles();
	return (
		<Typography
			ref={ref}
			variant="body1"
			component="span"
			classes={{
				root: clsx(classes.strongText, {
					[classes.inlineText]: (children as ReactNodeArray).length !== 3
				})
			}}
		>
			{children}
		</Typography>
	);
});

export default Strong;
