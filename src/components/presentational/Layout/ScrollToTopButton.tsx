import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
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
