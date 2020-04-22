import {
	Box,
	BoxProps,
	Button,
	ButtonGroup,
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
		loginButton: {
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0
		},
		skyraButton: {
			textAlign: 'left',
			textTransform: 'unset'
		},
		skyraGrid: {
			[theme.breakpoints.down('xs')]: {
				textAlign: 'center',
				paddingBottom: theme.spacing(2)
			}
		},
		buttonGroupGrid: {
			[theme.breakpoints.up('sm')]: {
				textAlign: 'right'
			},
			[theme.breakpoints.down('xs')]: {
				textAlign: 'center'
			}
		},
		buttonText: {
			fontWeight: 500,
			lineHeight: 1.75
		}
	})
);

export default ({ children, loading = false, containerProps = {} }: PropsWithChildren<GeneralPageProps>) => {
	const classes = useStyles();
	const [authenticated] = useGlobal('authenticated');

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
					<Grid item xs={12} sm={6} md={6} lg={6} classes={{ root: classes.skyraGrid }}>
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

					<Grid item xs={12} sm={6} md={6} lg={6} classes={{ root: classes.buttonGroupGrid }}>
						<ButtonGroup size="large" color="primary" variant="contained">
							<Button onClick={navigate('/commands')}>
								<Typography classes={{ root: classes.buttonText }} variant="body2" color="textPrimary">
									Commands
								</Typography>
							</Button>

							<When condition={authenticated}>
								<UserMenu />
							</When>

							<When condition={!authenticated && !loading}>
								<Button
									variant="contained"
									color="primary"
									onClick={navigate(oauthURL.toString())}
									classes={{ root: classes.loginButton }}
								>
									<Typography classes={{ root: classes.buttonText }} variant="body2" color="textPrimary">
										Log In
									</Typography>
								</Button>
							</When>
						</ButtonGroup>
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
