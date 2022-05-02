import GeneralPage from '@layout/General';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import { ButtonGroup, useMediaQuery, useTheme, Box, Button, Container, Grid, Typography } from '@mui/material';
import { navigate } from '@utils/util';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const AuthFailedPage: NextPage = () => {
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<>
			<NextSeo title="Authentication Failed" description="Woops, the authentication failed :(" />
			<GeneralPage>
				<Container
					maxWidth="md"
					sx={{
						height: 'calc(100vh - 200px - 128px)',
						display: 'flex'
					}}
				>
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignContent="stretch"
						alignItems="center"
						sx={{
							overflowY: 'hidden'
						}}
					>
						<Grid item>
							<Typography
								variant={isOnMobile ? 'h5' : 'h4'}
								color="textPrimary"
								sx={{
									lineHeight: (theme) => theme.spacing(0.2),
									textAlign: 'center',
									marginBottom: (theme) => theme.spacing(5)
								}}
							>
								Well that's very odd. It looks like the authentication failed! Our best recommendation is to try again. If that still
								fails then please join the support server.
							</Typography>
						</Grid>
						<Grid item>
							<Box>
								<ButtonGroup variant="contained" color="primary" size={isOnMobile ? 'small' : 'large'}>
									<Button onClick={navigate('https://join.skyra.pw')} startIcon={<ForumIcon />}>
										Join Support Server
									</Button>
									<Button onClick={navigate('/')} startIcon={<HomeIcon />}>
										Go Back Home
									</Button>
								</ButtonGroup>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</GeneralPage>
		</>
	);
};

export default AuthFailedPage;
