import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import SkyraLogo from 'assets/skyraLogo';
import Link from 'components/Link';
import { CLIENT_ID, inviteURL } from 'lib/util/constants';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: '50px 0px',
			background: theme.palette.secondary.main,
			height: 200,
			[theme.breakpoints.down('xs')]: {
				height: 'auto'
			}
		},
		container: {
			display: 'flex',
			justifyContent: 'space-around',
			[theme.breakpoints.down('xs')]: {
				flexDirection: 'column',
				alignContent: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				alignItems: 'center',

				'& > *:not(:first-of-type)': {
					marginTop: 20
				}
			}
		}
	})
);

const Left = () => (
	<Box textAlign="left" display="flex" flexDirection="column">
		<Link to="https://donate.skyra.pw/patreon" text="Patreon" />
		<Link to="https://donate.skyra.pw/paypal" text="PayPal" />
		<Link to="https://donate.skyra.pw/kofi" text="Ko-fi" />
		<Link to={`https://top.gg/bot/${CLIENT_ID}`} text="Vote" />
	</Box>
);
const Right = () => (
	<Box textAlign="right" display="flex" flexDirection="column">
		<Link to="https://join.skyra.pw" text="Support Server" />
		<Link to="/privacy" text="Privacy Policy" />
		<Link to={inviteURL.toString()} text="Invite Link" />
		<Link to="https://github.com/skyra-project/skyra" text="Github" />
	</Box>
);

const Middle = () => (
	<Box display="flex" flexDirection="column">
		<SkyraLogo />
		<Typography style={{ marginTop: 15 }} variant="caption">
			Copyright © 2020 Skyra Project. All rights reserved.
		</Typography>
	</Box>
);

const Footer = () => {
	const classes = useStyles();

	return (
		<Box component="footer" className={classes.root}>
			<Container maxWidth="sm">
				<Hidden xsDown>
					<Box className={classes.container}>
						<Left />
						<Middle />
						<Right />
					</Box>
				</Hidden>
				<Hidden smUp>
					<Box className={classes.container}>
						<Box display="flex" justifyContent="space-between" width="100%" px={3}>
							<Left />
							<Right />
						</Box>
						<Middle />
					</Box>
				</Hidden>
			</Container>
		</Box>
	);
};

export default Footer;
