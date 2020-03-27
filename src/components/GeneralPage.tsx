import {
	Box,
	BoxProps,
	Button,
	Container,
	createStyles,
	Grid,
	Hidden,
	LinearProgress,
	makeStyles,
	Theme,
	Typography
} from '@material-ui/core';
import SkyraLogo from 'assets/skyraLogo';
import Footer from 'components/Footer';
import UserMenu from 'components/UserMenu';
import { oauthURL } from 'meta/constants';
import { RootState } from 'meta/typings/Reactn';
import { navigate, syncUser } from 'meta/util';
import React, { PropsWithChildren, useEffect } from 'react';
import { Else, If, Then, When } from 'react-if';
import { useGlobal } from 'reactn';
import Tooltip from './Tooltip';

export interface GeneralPageProps {
	loading?: boolean;
	containerProps?: BoxProps;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height: '100vh'
		},
		grid: {
			padding: theme.spacing(1),
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3)
		},
		svg: {
			minWidth: 120,
			display: 'flex',
			justifyContent: 'space-around',
			alignContent: 'center',
			alignItems: 'center'
		},
		button: {
			textAlign: 'right'
		},
		skyraButton: {
			textAlign: 'left',
			textTransform: 'unset'
		},
		buttonText: {
			fontWeight: 500,
			lineHeight: 1.75
		}
	})
);

export default ({ children, loading = false, containerProps = {} }: PropsWithChildren<GeneralPageProps>) => {
	const classes = useStyles();
	const [{ authenticated }] = useGlobal<RootState>();

	useEffect(() => {
		syncUser();
	}, []);

	return (
		<Box component="div" className={classes.container} {...containerProps}>
			<Container>
				<Grid
					classes={{ root: classes.grid }}
					container
					direction="row"
					justify="space-between"
					alignContent="center"
					alignItems="center"
				>
					<Grid item xs={10}>
						<Tooltip title="Click to go home" placement="bottom">
							<Button onClick={navigate('/')} classes={{ root: classes.skyraButton }}>
								<Box className={classes.svg}>
									<SkyraLogo />
									<Box display="flex" flexDirection="column" ml={3}>
										<Typography variant="h5">Skyra</Typography>
										<Hidden smDown>
											<Typography variant="caption">The most advanced moderation bot.</Typography>
										</Hidden>
									</Box>
								</Box>
							</Button>
						</Tooltip>
					</Grid>

					<Grid classes={{ root: classes.button }} item xs={1}>
						<Button onClick={navigate('/commands')} variant="contained" color="primary">
							<Typography classes={{ root: classes.buttonText }} variant="body2" color="textPrimary">
								Commands
							</Typography>
						</Button>
					</Grid>

					<Grid classes={{ root: classes.button }} item xs={1}>
						<When condition={authenticated}>
							<UserMenu />
						</When>

						<When condition={!authenticated && !loading}>
							<Button href={oauthURL.toString()} variant="contained" color="primary">
								<Typography classes={{ root: classes.buttonText }} variant="body2" color="textPrimary">
									Log In
								</Typography>
							</Button>
						</When>
					</Grid>
				</Grid>
			</Container>
			<If condition={loading}>
				<Then>
					<LinearProgress variant="query" />
				</Then>
				<Else>{children}</Else>
			</If>
			<Footer />
		</Box>
	);
};
