import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React from 'reactn';
import { useServiceWorker } from 'ServiceWorkerContext';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default () => {
	const sw = useServiceWorker();

	return (
		<Snackbar open={sw.assetsUpdateReady} TransitionComponent={Grow}>
			<Alert
				severity="info"
				action={
					<Button color="inherit" size="small" onClick={() => sw.updateAssets()}>
						Yes, update!
					</Button>
				}
			>
				<AlertTitle>Update Available!</AlertTitle>
				An update is available, do you want to install it?
			</Alert>
		</Snackbar>
	);
};
