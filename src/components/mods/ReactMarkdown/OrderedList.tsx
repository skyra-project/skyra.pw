import React, { forwardRef } from 'react';
import type { OrderedListProps } from 'react-markdown/lib/ast-to-react';
import { List as MuiList } from '@mui/material';

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
