import React from 'react';
import { Grid } from '@material-ui/core';

export default ({ children, gridProps }) => (
	<Grid spacing={1} container direction="column" justify="space-around" alignItems="flex-start" {...gridProps}>
		{React.Children.map(children, item => (
			<Grid item>{item}</Grid>
		))}
	</Grid>
);
