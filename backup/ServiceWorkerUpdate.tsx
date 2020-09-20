import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React from 'react';
import { useServiceWorker } from 'ServiceWorkerContext';
import BaseAlert from '../src/components/presentational/Alerts/Base';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			zIndex: theme.zIndex.snackbar + 1
		}
	})
);

export default () => {
	const classes = useStyles();
	const sw = useServiceWorker();

	return (
		<Snackbar open={sw.assetsUpdateReady} TransitionComponent={Grow} classes={{ root: classes.root }}>
			<BaseAlert
				severity="info"
				action={
					<Button color="inherit" size="small" onClick={() => sw.updateAssets()}>
						Yes, update!
					</Button>
				}
			>
				<AlertTitle>Update Available!</AlertTitle>
				An update is available, do you want to install it?
			</BaseAlert>
		</Snackbar>
	);
};
