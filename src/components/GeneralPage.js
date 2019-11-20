import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import { Box, Typography, Button, Container } from '@material-ui/core';

import { oauthURL } from 'meta/constants';
import UserMenu from 'components/UserMenu';
import SkyraLogo from 'assets/skyraLogo';
import theme from 'meta/theme';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100vh;
`;

const Footer = styled.footer`
	padding: 30px 0px;
	background: ${theme.palette.secondary.main};
	height: 200px;
`;

export default ({ children }) => {
	const [global] = useGlobal();
	const { authenticated } = global;
	return (
		<PageContainer>
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
			</Container>
			{children}
			<Footer>
				<Container maxWidth="sm">
					<Box display="flex" justifyContent="space-around">
						<Box textAlign="left">
							<Typography>Support Server</Typography>
							<Typography>Invite Link</Typography>
							<Typography>Patreon</Typography>
						</Box>
						<Box display="flex" flexDirection="column">
							<SkyraLogo />
							<Typography style={{ marginTop: 15 }} variant="caption">
								Copyright © 2019 Kyra. All rights reserved.
							</Typography>
						</Box>
						<Box textAlign="right">
							<Typography>Support Server</Typography>
							<Typography>Invite Link</Typography>
							<Typography>Patreon</Typography>
						</Box>
					</Box>
				</Container>
			</Footer>
		</PageContainer>
	);
};
