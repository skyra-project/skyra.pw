import SkyraLogo from '@assets/skyraLogo';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Hidden from '@mui/material/Hidden';
import Typography from '@mui/material/Typography';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Link from '@routing/Link';
import { CLIENT_ID, inviteURL } from '@utils/constants';
import React, { memo } from 'react';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: '50px 0px',
			background: theme.palette.secondary.main,
			height: 200,
			[theme.breakpoints.down('sm')]: {
				height: 'auto'
			}
		},
		container: {
			display: 'flex',
			justifyContent: 'space-around',
			[theme.breakpoints.down('sm')]: {
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
		<Link href="https://donate.skyra.pw/patreon" text="Patreon" />
		<Link href="https://donate.skyra.pw/paypal" text="PayPal" />
		<Link href="https://donate.skyra.pw/kofi" text="Ko-fi" />
		<Link href={`https://top.gg/bot/${CLIENT_ID}`} text="Vote" />
	</Box>
);
const Right = () => (
	<Box textAlign="right" display="flex" flexDirection="column">
		<Link href="https://join.skyra.pw" text="Support Server" />
		<Link href="/privacy" text="Privacy Policy" />
		<Link href={inviteURL.toString()} text="Invite Link" />
		<Link href="https://github.com/skyra-project/skyra" text="Github" />
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
				<Hidden smDown>
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

export default memo(Footer);
