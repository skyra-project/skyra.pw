import React, { forwardRef } from 'react';
import type { UnorderedListProps } from 'react-markdown/lib/ast-to-react';
import { List as MuiList } from '@mui/material';

const UnorderedList = forwardRef<HTMLUListElement, UnorderedListProps>(({ children }, ref) => (
	<MuiList
		ref={ref}
		dense
		disablePadding
		sx={{
			pr: {
				md: (theme) => theme.spacing(75)
			}
		}}
	>
		{children}
	</MuiList>
));

export default UnorderedList;
