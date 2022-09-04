import { Typography } from '@mui/material';
import { forwardRef, type DetailedHTMLProps, type HTMLAttributes, type ReactNode } from 'react';
import type { WithReactMarkdownChildren } from './types';

type StrongProps = WithReactMarkdownChildren<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>>;

const Strong = forwardRef<HTMLSpanElement, StrongProps>(({ children }, ref) => (
	<Typography
		ref={ref}
		variant="body1"
		component="span"
		sx={{
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'flex-start',
			fontWeight: 'bolder',
			display: (children as ReactNode[]).length === 3 ? 'flex' : 'inline'
		}}
	>
		{children}
	</Typography>
));

export default Strong;
