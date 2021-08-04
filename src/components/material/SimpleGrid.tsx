import Grid, { GridProps } from '@material-ui/core/Grid/Grid';
import React, { Children, FC, memo } from 'react';
import { When } from 'react-if';

interface SimpleGridProps extends GridProps {
	gridItemProps?: GridProps;
}

const SimpleGrid: FC<SimpleGridProps> = ({ children, gridItemProps, ...props }) => (
	<Grid spacing={1} container direction="column" justifyContent="space-around" alignItems="flex-start" {...props}>
		<When condition={Boolean(children)}>
			{Children.map(children, (item, index) => (
				<Grid item key={index} {...gridItemProps}>
					{item}
				</Grid>
			))}
		</When>
	</Grid>
);

export default memo(SimpleGrid);
