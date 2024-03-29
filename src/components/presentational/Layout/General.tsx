import { setAuthenticated, useAuthenticated } from '@contexts/AuthenticationContext';
import { mergeDiscordPack } from '@contexts/DiscordPackContext';
import Footer from '@layout/Footer';
import { Box, LinearProgress } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import { syncUser } from '@utils/util';
import sx from 'mui-sx';
import { useRouter } from 'next/router';
import { useEffect, type FC } from 'react';
import type { ReactNode } from 'react-markdown/lib/ast-to-react';
import NavBar from './Navigation/NavBar';
import ScrollToTopButton from './ScrollToTopButton';

export interface GeneralPageProps {
	loading?: boolean;
	containerProps?: BoxProps;
	children?: ReactNode;
}

const GeneralPage: FC<GeneralPageProps> = ({ children, loading = false, containerProps }) => {
	const router = useRouter();
	const authenticated = useAuthenticated();
	const writeAuthenticated = setAuthenticated();
	const setPack = mergeDiscordPack();

	useEffect(() => {
		syncUser(authenticated, setPack, writeAuthenticated, router.push);
	}, [authenticated, router.push, setPack, writeAuthenticated]);

	return (
		<>
			<Box component="section" display="flex" flexDirection="column" justifyContent="space-between" height="100vh" {...containerProps}>
				<NavBar loading={loading} />

				<Box
					component="main"
					role="contentinfo"
					sx={sx(
						{
							pt: 16
						},
						{
							condition: loading,
							sx: {
								display: 'flex',
								alignContent: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								height: 'calc(100vh - 200px)'
							}
						}
					)}
				>
					{loading ? (
						<LinearProgress
							variant="query"
							sx={{
								width: '100vw'
							}}
						/>
					) : (
						<>{children}</>
					)}
				</Box>

				<Footer />

				<Box component="span">
					<ScrollToTopButton />
				</Box>
			</Box>
		</>
	);
};

export default GeneralPage;
