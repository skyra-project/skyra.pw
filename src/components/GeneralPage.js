import React, { useGlobal } from 'reactn';
import { Box, Container, Typography, Button } from '@material-ui/core';

import { oauthURL } from 'meta/constants';
import { navigate } from 'meta/util';
import UserMenu from 'components/UserMenu';
import SkyraLogo from 'assets/skyraLogo';

export default ({ children }) => {
	const [global] = useGlobal();
	const { authenticated } = global;
	console.log(oauthURL);
	return (
		<Container>
			<Box p={1} mt={3} mb={3} display="flex" justifyContent="space-between" alignContent="center" alignItems="center">
				<Box display="flex" justifyContent="space-around" alignContent="center" alignItems="center" minWidth={120}>
					<SkyraLogo />
					<Typography variant="h5">Skyra</Typography>
				</Box>
				{authenticated ? (
					<UserMenu />
				) : (
					<Button href={oauthURL} variant="contained" color="secondary">
						Log In
					</Button>
				)}
			</Box>
			{children}
		</Container>
	);
};
