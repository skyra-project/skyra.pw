import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Tooltip from '@mui/Tooltip';
import React, { FC, memo, PropsWithChildren } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		scrollToTopButton: {
			position: 'fixed',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
			zIndex: theme.zIndex.drawer + 2
		}
	})
);

const ScrollToTopButton: FC = () => {
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
			<Tooltip title="Click to scroll to the top of the page">
				<Box onClick={handleClick} className={classes.scrollToTopButton}>
					<Fab color="primary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</Box>
			</Tooltip>
		</Zoom>
	);
};

export default memo<PropsWithChildren<unknown>>(ScrollToTopButton);
