import mergeSeoProps from '@config/SEO/MergeSeoProps';
import { ButtonGroup, createStyles, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ForumIcon from '@material-ui/icons/Forum';
import HomeIcon from '@material-ui/icons/Home';
import GeneralPage from '@presentational/Layout/General';
import { navigate } from '@utils/util';
import type { InferGetStaticPropsType, NextPage } from 'next';
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

const AuthFailedPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ seoTags }) => {
	const classes = useStyles();
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<NextSeo {...seoTags} />
			<GeneralPage>
				<Container maxWidth="md" classes={{ root: classes.container }}>
					<Grid container direction="column" justify="center" alignContent="stretch" alignItems="center" classes={{ root: classes.root }}>
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

export async function getStaticProps() {
	const seoTags = mergeSeoProps({
		title: 'Authentication Failed',
		description: 'Woops, the authentication failed :('
	});

	return {
		props: { seoTags } // will be passed to the page component as props
	};
}

export default AuthFailedPage;
