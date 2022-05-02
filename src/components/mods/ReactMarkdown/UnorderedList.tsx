import MuiList from '@mui/material/List';
import React, { forwardRef } from 'react';
import type { UnorderedListProps } from 'react-markdown/lib/ast-to-react';

const UnorderedList = forwardRef<HTMLUListElement, UnorderedListProps>(({ children }, ref) => (
	<MuiList
		ref={ref}
		dense
		disablePadding
		sx={{
			paddingRight: {
				md: (theme) => theme.spacing(75)
			}
		}}
	>
		{children}
	</MuiList>
));

export default UnorderedList;
