import React, { Component } from 'reactn';
import styled from 'styled-components';
import { Box, Typography, Button, Container, LinearProgress, Hidden } from '@material-ui/core';

import { oauthURL } from 'meta/constants';
import UserMenu from 'components/UserMenu';
import SkyraLogo from 'assets/skyraLogo';
import Footer from 'components/Footer';
import { syncUser, navigate } from 'meta/util';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100vh;
`;

class GeneralPage extends Component {
	componentDidMount() {
		syncUser();
	}

	render() {
		const { children, loading = false } = this.props;
		const { authenticated } = this.global;
		return (
			<PageContainer>
				<Container>
					<Box p={1} my={3} display="flex" justifyContent="space-between" alignContent="center" alignItems="center">
						<Button onClick={navigate('/')} style={{ textAlign: 'left', textTransform: 'unset' }}>
							<Box display="flex" justifyContent="space-around" alignContent="center" alignItems="center" minWidth={120}>
								<SkyraLogo />
								<Box display="flex" flexDirection="column" ml={3}>
									<Typography variant="h5">Skyra</Typography>
									<Hidden smDown>
										<Typography variant="caption">The most advanced moderation bot.</Typography>
									</Hidden>
								</Box>
							</Box>
						</Button>
						{authenticated && <UserMenu />}

						{!authenticated && !loading && (
							<Button href={oauthURL.toString()} variant="contained" color="primary">
								Log In
							</Button>
						)}
					</Box>
				</Container>
				{loading ? <LinearProgress variant="query" /> : children}
				<Footer />
			</PageContainer>
		);
	}
}

export default GeneralPage;
