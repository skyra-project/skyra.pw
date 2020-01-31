import Grid, { GridProps as MGridProps } from '@material-ui/core/Grid/Grid';
import React, { Children, FC } from 'react';
import { When } from 'react-if';

export interface GridProps {
	gridProps?: MGridProps;
}

export const SimpleGrid: FC<GridProps> = ({ children, gridProps }) => (
	<Grid spacing={1} container direction="column" justify="space-around" alignItems="flex-start" {...gridProps}>
		<When condition={Boolean(children)}>
			{Children.map(children, (item, index) => (
				<Grid item key={index}>
					{item}
				</Grid>
			))}
		</When>
	</Grid>
);

export default SimpleGrid;
