import React from 'reactn';
import styled from 'styled-components';
import { Box, Typography, Container, Hidden } from '@material-ui/core';

import SkyraLogo from 'assets/skyraLogo';
import Link from 'components/Link';
import theme from 'meta/theme';

const FooterContainer = styled.footer`
	padding: 50px 0px;
	background: ${theme.palette.secondary.main};
	height: 200px;

	${theme.breakpoints.down('xs')} {
		height: auto;
	}

	.container {
		display: flex;

		justify-content: space-around;

		${theme.breakpoints.down('xs')} {
			flex-direction: column;
			align-content: center;
			justify-content: center;
			text-align: center;
			align-items: center;

			& > *:not(:first-of-type) {
				margin-top: 20px;
			}
		}
	}
`;

const Left = () => (
	<Box textAlign="left" display="flex" flexDirection="column">
		<Link to="https://discordapp.com/invite/6gakFR2" text="Support Server" />
		<Link to="https://www.patreon.com/kyranet" text="Patreon" />
		<Link to="https://github.com/kyranet/skyra" text="Github" />
	</Box>
);
const Right = () => (
	<Box textAlign="right" display="flex" flexDirection="column">
		<Link
			to="https://discordapp.com/oauth2/authorize?client_id=266624760782258186&permissions=356904022&scope=bot"
			text="Invite Link"
		/>
		<Link to="https://www.patreon.com/kyranet" text="Donate" />
		<Link to="https://top.gg/bot/266624760782258186" text="Vote" />
	</Box>
);

const Middle = () => (
	<Box display="flex" flexDirection="column">
		<SkyraLogo />
		<Typography style={{ marginTop: 15 }} variant="caption">
			Copyright © 2019 Kyra. All rights reserved.
		</Typography>
	</Box>
);

const Footer = () => {
	return (
		<FooterContainer>
			<Container maxWidth="sm">
				<Hidden xsDown>
					<Box className="container">
						<Left />
						<Middle />
						<Right />
					</Box>
				</Hidden>
				<Hidden smUp>
					<Box className="container">
						<Box display="flex" justifyContent="space-between" width="100%" px={3}>
							<Left />
							<Right />
						</Box>
						<Middle />
					</Box>
				</Hidden>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
