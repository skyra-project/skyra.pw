import Grid from '@material-ui/core/Grid/Grid';
import React, { Children } from 'react';
import { When } from 'react-if';

export default ({ children, gridProps }) => (
	<Grid spacing={1} container direction="column" justify="space-around" alignItems="flex-start" {...gridProps}>
		<When condition={children && children.length !== 0}>
			{Children.map(children, (item, index) => (
				<Grid item key={index}>
					{item}
				</Grid>
			))}
		</When>
	</Grid>
);
