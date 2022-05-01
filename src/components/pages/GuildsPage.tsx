import { useAuthenticated } from '@contexts/AuthenticationContext';
import { useDiscordPack } from '@contexts/DiscordPackContext';
import { useMobileContext } from '@contexts/MobileContext';
import GeneralPage from '@layout/General';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
			[theme.breakpoints.down('sm')]: {
				height: ({ authenticated }: { authenticated: boolean }) => (authenticated ? 'unset' : 'calc(100vh - 200px - 128px)')
			}
		},
		notSignedInText: {
			fontSize: theme.typography.pxToRem(40),
			[theme.breakpoints.down('md')]: {
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
