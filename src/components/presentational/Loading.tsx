import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React, { FC, memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: theme.palette.primary.contrastText
		}
	})
);

interface LoadingProps {
	loading: boolean;
}

const Loading: FC<LoadingProps> = ({ loading }) => {
	const classes = useStyles();

	return (
		<Backdrop className={classes.backdrop} open={loading} unmountOnExit mountOnEnter>
			<CircularProgress color="primary" />
		</Backdrop>
	);
};

export default memo(Loading);
