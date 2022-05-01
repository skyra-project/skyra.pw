import MuiListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { forwardRef } from 'react';
import type { LiProps } from 'react-markdown/lib/ast-to-react';

const ListItem = forwardRef<HTMLLIElement, LiProps>(({ children }, ref) => {
	return (
		<MuiListItem ref={ref} dense divider disableGutters alignItems="flex-start">
			<ListItemText disableTypography>{children}</ListItemText>
		</MuiListItem>
	);
});

export default ListItem;
