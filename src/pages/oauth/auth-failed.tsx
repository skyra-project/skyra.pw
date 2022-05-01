import GeneralPage from '@layout/General';
import { ButtonGroup, Theme, useMediaQuery, useTheme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import { navigate } from '@utils/util';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			overflowY: 'hidden'
		},
		container: {
			height: 'calc(100vh - 200px - 128px)',
			display: 'flex'
		},
		text: {
			lineHeight: theme.spacing(0.2),
			textAlign: 'center',
			marginBottom: theme.spacing(5)
		}
	})
);

const AuthFailedPage: NextPage = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<>
			<NextSeo title="Authentication Failed" description="Woops, the authentication failed :(" />
			<GeneralPage>
				<Container maxWidth="md" classes={{ root: classes.container }}>
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignContent="stretch"
						alignItems="center"
						classes={{ root: classes.root }}
					>
						<Grid item>
							<Typography variant={isOnMobile ? 'h5' : 'h4'} color="textPrimary" classes={{ root: classes.text }}>
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
