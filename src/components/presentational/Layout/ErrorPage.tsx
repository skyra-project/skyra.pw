import GeneralPage from '@layout/General';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, ButtonGroup, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { navigate } from '@utils/util';
import { memo } from 'react';

const NotFoundPage = () => {
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
					sx={{
						overflowY: 'hidden'
					}}
				>
					<Grid item>
						<Typography
							variant={isOnMobile ? 'h5' : 'h4'}
							color="textPrimary"
							sx={{
								textAlign: 'center',
								mb: 5
							}}
						>
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
