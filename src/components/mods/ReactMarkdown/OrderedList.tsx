import MuiList from '@mui/material/List';
import React, { forwardRef } from 'react';
import type { OrderedListProps } from 'react-markdown/lib/ast-to-react';

const OrderedList = forwardRef<HTMLUListElement, OrderedListProps>(({ children }, ref) => (
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

export default OrderedList;
