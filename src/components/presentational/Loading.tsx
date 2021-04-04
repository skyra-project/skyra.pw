import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
