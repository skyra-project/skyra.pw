import Tooltip from '@material/Tooltip';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { FC, memo, PropsWithChildren } from 'react';

import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material';

const ScrollToTopButton: FC = () => {
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
			<div>
				<Tooltip title="Click to scroll to the top of the page">
					<Box
						onClick={handleClick}
						sx={{
							position: 'fixed',
							bottom: (theme) => theme.spacing(2),
							right: (theme) => theme.spacing(2),
							zIndex: (theme) => theme.zIndex.drawer + 2
						}}
					>
						<Fab color="primary" size="small" aria-label="scroll back to top">
							<KeyboardArrowUpIcon />
						</Fab>
					</Box>
				</Tooltip>
			</div>
		</Zoom>
	);
};

export default memo<PropsWithChildren<unknown>>(ScrollToTopButton);
