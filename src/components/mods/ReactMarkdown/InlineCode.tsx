import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type { CodeComponent } from 'react-markdown/src/ast-to-react';

const useStyles = makeStyles(() =>
	createStyles({
		brokenWordText: {
			wordBreak: 'break-word'
		},
		code: {
			padding: '0.2em',
			margin: '-0.2em 0',
			fontFamily:
				'Consolas, Andale Mono WT, Andale Mono, Lucida Console, Lucida Sans Typewriter, DejaVu Sans Mono, Bitstream Vera Sans Mono, Liberation Mono, Nimbus Mono L, Monaco, Courier New, Courier, monospace',
			textIndent: 0,
			border: 'none',
			whiteSpace: 'pre-wrap',
			backgroundColor: '#202225'
		}
	})
);

const InlineCode: CodeComponent = forwardRef<HTMLSpanElement, Parameters<CodeComponent>[0]>(({ inline, children }, ref) => {
	const classes = useStyles();

	if (inline) {
		return (
			<Typography ref={ref} component="span" color="textPrimary" variant="body2" classes={{ root: clsx(classes.brokenWordText, classes.code) }}>
				{children}
			</Typography>
		);
	}

	return <>{children}</>;
});

export default InlineCode;
