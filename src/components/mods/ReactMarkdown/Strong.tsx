import Typography from '@mui/material/Typography';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React, { DetailedHTMLProps, forwardRef, HTMLAttributes, ReactNodeArray } from 'react';
import type { WithReactMarkdownChildren } from './types';

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

type StrongProps = WithReactMarkdownChildren<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>>;

const Strong = forwardRef<HTMLSpanElement, StrongProps>(({ children }, ref) => {
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
