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
	const isOnMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<GeneralPage>
			<Container maxWidth="md">
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
