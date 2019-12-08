import React from 'react';

import GeneralPage from 'components/GeneralPage';
import { Box, Button, Typography } from '@material-ui/core';
import { navigate } from 'meta/util';

const NotFoundPage = () => (
	<GeneralPage>
		<Box alignSelf="center" textAlign="center" display="flex" flexDirection="column" justifyContent="space-around" height="50%">
			<Typography variant="h1">Not Found</Typography>
			<Box alignItems="center">
				<Button onClick={navigate('/')} color="primary" variant="contained">
					Back Home
				</Button>
			</Box>
		</Box>
	</GeneralPage>
);

export default NotFoundPage;
