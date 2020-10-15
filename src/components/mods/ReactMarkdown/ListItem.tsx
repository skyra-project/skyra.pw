import MuiListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { forwardRef } from 'react';

const ListItem = forwardRef<HTMLLIElement>(({ children }, ref) => (
	<MuiListItem ref={ref} dense divider alignItems="flex-start">
		<ListItemText>{children}</ListItemText>
	</MuiListItem>
));

export default ListItem;
