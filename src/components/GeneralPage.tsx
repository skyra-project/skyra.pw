import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box, { BoxProps } from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import InviteIcon from '@material-ui/icons/Add';
import CommandsIcon from '@material-ui/icons/Extension';
import DiscordChatIcon from '@material-ui/icons/Forum';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LoginIcon from '@material-ui/icons/VpnKey';
import SkyraLogo from 'assets/skyraLogo';
import Footer from 'components/Footer';
import MobileNavMenu from 'components/MobileNavMenu';
import UserMenu from 'components/UserMenu';
import { oauthURL } from 'lib/util/constants';
import { navigate, syncUser } from 'lib/util/util';
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
		svg: {
			minWidth: 120,
			display: 'flex',
			justifyContent: 'space-around',
			alignContent: 'center',
			alignItems: 'center'
		},
		skyraButton: {
			textAlign: 'left',
			textTransform: 'unset'
		},
		scrollToTopButton: {
			position: 'fixed',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
			zIndex: theme.zIndex.drawer + 2
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		transparantButton: {
			background: 'transparent',
			boxShadow: 'none',
			'&:hover': {
				background: theme.palette.primary.dark,
				boxShadow: theme.shadows[1]
			}
		}
	})
);

const ScrollToTopButton = ({ children }: PropsWithChildren<unknown>) => {
	const classes = useStyles();
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100
	});

	const handleClick = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	};

	return (
		<Zoom in={trigger}>
			<Box onClick={handleClick} role="presentation" className={classes.scrollToTopButton}>
				{children}
			</Box>
		</Zoom>
	);
};

export default ({ children, loading = false, containerProps, ...props }: PropsWithChildren<GeneralPageProps>) => {
	const classes = useStyles();
	const [authenticated] = useGlobal('authenticated');

	useEffect(() => {
		syncUser();
	}, []);

	return (
		<Box component="section" className={classes.container} {...containerProps}>
			<Box component="nav">
				<AppBar position="fixed">
					<Toolbar>
						<Hidden mdUp>
							<MobileNavMenu />
						</Hidden>

						<Box flexGrow={1}>
							<Tooltip title="Click to go home" placement="bottom">
								<Button onClick={navigate('/')} classes={{ root: classes.skyraButton }}>
									<Box className={classes.svg}>
										<SkyraLogo />
										<Box display="flex" flexDirection="column" ml={3}>
											<Typography variant="h5">Skyra</Typography>
											<Hidden smDown>
												<Typography variant="caption">The most advanced moderation bot</Typography>
											</Hidden>
										</Box>
									</Box>
								</Button>
							</Tooltip>
						</Box>

						<Hidden smDown>
							<Tooltip title="Click to add Skyra to your server" placement="bottom">
								<Button
									color="primary"
									variant="contained"
									classes={{ root: classes.transparantButton }}
									onClick={navigate('https://invite.skyra.pw')}
									startIcon={<InviteIcon />}
								>
									<Typography variant="body2" color="textPrimary">
										Add Skyra to server
									</Typography>
								</Button>
							</Tooltip>
							<Tooltip title="Click to join Skyra Lounge Discord server" placement="bottom">
								<Button
									color="primary"
									variant="contained"
									classes={{ root: classes.transparantButton }}
									onClick={navigate('https://join.skyra.pw')}
									startIcon={<DiscordChatIcon />}
								>
									<Typography variant="body2" color="textPrimary">
										Join our Discord
									</Typography>
								</Button>
							</Tooltip>
							<Tooltip title="Click to view Skyra's commands" placement="bottom">
								<Button
									color="primary"
									variant="contained"
									classes={{ root: classes.transparantButton }}
									onClick={navigate('/commands')}
									startIcon={<CommandsIcon />}
								>
									<Typography variant="body2" color="textPrimary">
										Commands
									</Typography>
								</Button>
							</Tooltip>

							<When condition={authenticated}>
								<UserMenu />
							</When>

							<When condition={!authenticated && !loading}>
								<Tooltip title="Click to login and manage your servers" placement="bottom">
									<Button
										color="primary"
										variant="contained"
										classes={{ root: classes.transparantButton }}
										onClick={navigate(oauthURL.toString())}
										startIcon={<LoginIcon />}
									>
										<Typography variant="body2" color="textPrimary">
											Log In
										</Typography>
									</Button>
								</Tooltip>
							</When>
						</Hidden>
					</Toolbar>
				</AppBar>

				{/* These toolbars are to ensure there is some offset for the content.
			For more information see https://material-ui.com/components/app-bar/#fixed-placement */}
				<Toolbar />
				<Toolbar />
			</Box>

			<Box component="main" role="content">
				<If condition={loading}>
					<Then>
						<LinearProgress variant="query" />
					</Then>
					<Else>{children}</Else>
				</If>
			</Box>

			<Footer />

			<Box component="span" role="scroll-to-top">
				<ScrollToTopButton {...props}>
					<Fab color="primary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollToTopButton>
			</Box>
		</Box>
	);
};
