import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import React, { forwardRef, ReactNodeArray } from 'react';
import type { NormalComponents } from 'react-markdown/src/ast-to-react';

const useStyles = makeStyles(() =>
	createStyles({
		strongText: {
			display: 'flex',
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'flex-start',
			fontWeight: 'bolder'
		},
		inlineText: {
			display: 'inline'
		}
	})
);

const Strong = forwardRef<HTMLSpanElement, Parameters<Exclude<NormalComponents['strong'], 'strong'>>[0]>(({ children }, ref) => {
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
