import { setAuthenticated, useAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack } from '@contexts/DiscordPackContext';
import Footer from '@layout/Footer';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Box, { BoxProps } from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { syncUser } from '@utils/util';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { Else, If, Then } from 'react-if';
import NavBar from './Navigation/NavBar';
// import ScrollToTopButton from './ScrollToTopButton';
import type { ReactNode } from 'react-markdown/lib/ast-to-react';

export interface GeneralPageProps {
	loading?: boolean;
	containerProps?: BoxProps;
	children?: ReactNode;
}

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height: '100vh'
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

const GeneralPage: FC<GeneralPageProps> = ({ children, loading = false, containerProps }) => {
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

				{/* <Box component="span">
					<ScrollToTopButton />
				</Box> */}
			</Box>
		</>
	);
};

export default GeneralPage;
