import { useAuthenticated } from '@contexts/AuthenticationContext';
import { useDiscordPack } from '@contexts/DiscordPackContext';
import { useMobileContext } from '@contexts/MobileContext';
import GeneralPage from '@layout/General';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { FilteredGuildCards } from '@presentational/GuildCard';
import type { NextPage } from 'next';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignContent: 'center',
			alignItems: 'center',
			[theme.breakpoints.up('sm')]: {
				height: 'calc(100vh - 200px - 128px)'
			},
			[theme.breakpoints.down('xs')]: {
				height: ({ authenticated }: { authenticated: boolean }) => (authenticated ? 'unset' : 'calc(100vh - 200px - 128px)')
			}
		},
		notSignedInText: {
			fontSize: theme.typography.pxToRem(40),
			[theme.breakpoints.down('sm')]: {
				fontSize: theme.typography.pxToRem(30)
			}
		}
	})
);

const GuildsPage: NextPage = () => {
	const authenticated = useAuthenticated();
	const classes = useStyles({ authenticated });
	const pack = useDiscordPack();
	const { isMobile } = useMobileContext();

	return (
		<>
			<GeneralPage>
				<Container classes={{ root: classes.container }}>
					<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
						{authenticated ? (
							FilteredGuildCards(pack)
						) : (
							<Typography variant="h1" classes={{ root: classes.notSignedInText }}>
								Sorry, you are not logged in and can therefore not view this page. Please{' '}
								{isMobile ? 'open the menu button at the top left then click "Login"' : 'click the "Login" button at the top right'}{' '}
								to login with Discord
							</Typography>
						)}
					</Box>
				</Container>
			</GeneralPage>
		</>
	);
};

export default GuildsPage;
