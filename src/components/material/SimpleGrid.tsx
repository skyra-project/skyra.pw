import Grid, { GridProps } from '@mui/material/Grid/Grid';
import React, { Children as ReactChildren, FC, memo } from 'react';

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
