import React from 'reactn';
import styled from 'styled-components';
import { Box, Typography, Container } from '@material-ui/core';

import SkyraLogo from 'assets/skyraLogo';
import theme from 'meta/theme';

const FooterContainer = styled.footer`
	padding: 50px 0px;
	background: ${theme.palette.secondary.main};
	height: 200px;
`;

const Footer = () => {
	return (
		<FooterContainer>
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
		</FooterContainer>
	);
};

export default Footer;
