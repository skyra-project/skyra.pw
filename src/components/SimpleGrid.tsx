import Grid, { GridProps } from '@material-ui/core/Grid/Grid';
import React, { Children, PropsWithChildren } from 'react';
import { When } from 'react-if';

interface SimpleGridProps extends GridProps {
	gridItemProps?: GridProps;
}

export default ({ children, gridItemProps, ...props }: PropsWithChildren<SimpleGridProps>) => (
	<Grid spacing={1} container direction="column" justify="space-around" alignItems="flex-start" {...props}>
		<When condition={Boolean(children)}>
			{Children.map(children, (item, index) => (
				<Grid item key={index} {...gridItemProps}>
					{item}
				</Grid>
			))}
		</When>
	</Grid>
);
