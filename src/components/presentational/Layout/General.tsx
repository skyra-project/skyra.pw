import { setAuthenticated, useAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack } from '@contexts/DiscordPackContext';
import Footer from '@layout/Footer';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box, { BoxProps } from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { syncUser } from '@utils/util';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { Else, If, Then } from 'react-if';
import NavBar from './Navigation/NavBar';
import ScrollToTopButton from './ScrollToTopButton';

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
			height: '100vh',
			width: '100vw'
		},
		contentBox: {
			paddingTop: theme.spacing(16)
		},
		loadingBox: {
			display: 'flex',
			alignContent: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			height: 'calc(100vh - 200px)'
		},
		loadingIndicator: {
			width: '100vw'
		}
	})
);

const GeneralPage: FC<GeneralPageProps> = ({ children, loading = false, containerProps, ...props }) => {
	const classes = useStyles();
	const router = useRouter();
	const authenticated = useAuthenticated();
	const writeAuthenticated = setAuthenticated();
	const setPack = mergeDiscordPack();

	useEffect(() => {
		syncUser(authenticated, setPack, writeAuthenticated, router.push);
	}, [authenticated, router.push, setPack, writeAuthenticated]);

	return (
		<>
			<Box component="section" className={classes.container} {...containerProps}>
				<NavBar loading={loading} />

				<Box component="main" role="contentinfo" className={clsx(classes.contentBox, { [classes.loadingBox]: loading })}>
					<If condition={loading}>
						<Then>
							<LinearProgress variant="query" classes={{ root: classes.loadingIndicator }} />
						</Then>
						<Else>{children}</Else>
					</If>
				</Box>

				<Footer />

				<Box component="span">
					<ScrollToTopButton {...props}>
						<Fab color="primary" size="small" aria-label="scroll back to top">
							<KeyboardArrowUpIcon />
						</Fab>
					</ScrollToTopButton>
				</Box>
			</Box>
		</>
	);
};

export default GeneralPage;
