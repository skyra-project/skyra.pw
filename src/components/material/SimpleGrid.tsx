import type { GridProps } from '@mui/material/Grid/Grid';
import { Children as ReactChildren, memo, type FC } from 'react';

import { Grid } from '@mui/material';

interface SimpleGridProps extends GridProps {
	gridItemProps?: GridProps;
}

const SimpleGrid: FC<SimpleGridProps> = ({ children, gridItemProps, ...props }) => (
	<Grid spacing={1} container direction="column" justifyContent="space-around" alignItems="flex-start" {...props}>
		{children &&
			ReactChildren.map(children, (item, index) => (
				<Grid item key={index} {...gridItemProps}>
					{item}
				</Grid>
			))}
	</Grid>
);

export default memo(SimpleGrid);
