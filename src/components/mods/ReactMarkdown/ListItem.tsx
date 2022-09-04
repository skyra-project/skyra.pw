import { forwardRef } from 'react';
import type { LiProps } from 'react-markdown/lib/ast-to-react';

import { ListItem as MuiListItem, ListItemText } from '@mui/material';

const ListItem = forwardRef<HTMLLIElement, LiProps>(({ children }, ref) => {
	return (
		<MuiListItem ref={ref} dense divider disableGutters alignItems="flex-start">
			<ListItemText disableTypography>{children}</ListItemText>
		</MuiListItem>
	);
});

export default ListItem;
