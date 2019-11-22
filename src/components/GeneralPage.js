import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import { Box, Typography, Button, Container } from '@material-ui/core';

import { oauthURL } from 'meta/constants';
import UserMenu from 'components/UserMenu';
import SkyraLogo from 'assets/skyraLogo';
import Footer from 'components/Footer';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100vh;
`;

export default ({ children }) => {
	const [global] = useGlobal();
	const { authenticated } = global;
	return (
		<PageContainer>
			<Container>
				<Box p={1} my={3} display="flex" justifyContent="space-between" alignContent="center" alignItems="center">
					<Box display="flex" justifyContent="space-around" alignContent="center" alignItems="center" minWidth={120}>
						<SkyraLogo />
						<Box display="flex" flexDirection="column" ml={3}>
							<Typography variant="h5">Skyra</Typography>
							<Typography variant="caption">The most advanced moderation bot.</Typography>
						</Box>
					</Box>
					{authenticated ? (
						<UserMenu />
					) : (
						<Button href={oauthURL} variant="contained" color="secondary">
							Log In
						</Button>
					)}
				</Box>
			</Container>
			{children}
			<Footer />
		</PageContainer>
	);
};
