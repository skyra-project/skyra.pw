import React, { FC, memo } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingProps {
	loading: boolean;
}

const Loading: FC<LoadingProps> = ({ loading }) => (
	<Backdrop
		sx={{
			zIndex: (theme) => theme.zIndex.drawer + 1,
			color: 'primary.contrastText'
		}}
		open={loading}
		unmountOnExit
		mountOnEnter
	>
		<CircularProgress color="primary" />
	</Backdrop>
);

export default memo(Loading);
