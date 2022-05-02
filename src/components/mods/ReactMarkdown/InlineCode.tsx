import { Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';

const InlineCode = forwardRef<HTMLSpanElement, CodeProps>(({ inline, children }, ref) => {
	if (inline) {
		return (
			<Typography
				ref={ref}
				component="span"
				color="textPrimary"
				variant="body2"
				sx={{
					wordBreak: 'break-word',
					padding: '0.2em',
					margin: '-0.2em 0',
					fontFamily:
						'Consolas, Andale Mono WT, Andale Mono, Lucida Console, Lucida Sans Typewriter, DejaVu Sans Mono, Bitstream Vera Sans Mono, Liberation Mono, Nimbus Mono L, Monaco, Courier New, Courier, monospace',
					textIndent: 0,
					border: 'none',
					whiteSpace: 'pre-wrap',
					backgroundColor: '#202225'
				}}
			>
				{children}
			</Typography>
		);
	}

	return <>{children}</>;
});

export default InlineCode;
