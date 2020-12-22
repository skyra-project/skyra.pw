import GeneralPage from '#presentational/Layout/General';
import { navigate } from '#utils/util';
import { ButtonGroup, createStyles, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ForumIcon from '@material-ui/icons/Forum';
import HomeIcon from '@material-ui/icons/Home';
import React, { memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			overflowY: 'hidden'
		},
		text: {
			lineHeight: theme.spacing(0.2),
			textAlign: 'center',
			marginBottom: theme.spacing(5)
		}
	})
);

const NotFoundPage = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<GeneralPage>
			<Container maxWidth="md">
				<Grid container direction="column" justify="center" alignContent="stretch" alignItems="center" classes={{ root: classes.root }}>
					<Grid item>
						<Typography variant={isOnMobile ? 'h5' : 'h4'} color="textPrimary" classes={{ root: classes.text }}>
							Woah! Looks like you just ran into a non-existant page. If you think you found this page by mistake then feel free to join
							the support server on Discord using the button below and let us know.
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
	);
};

export default memo(NotFoundPage);
