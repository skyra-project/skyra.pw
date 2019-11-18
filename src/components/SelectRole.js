import React, { Fragment } from 'reactn';
import { withStyles } from '@material-ui/core/styles';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

const filterByPosition = (a, b) => b.rawPosition - a.rawPosition;

export default function CustomizedDialogs({ title, guild, onChange, buttonText, sort, value }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	let currentValue = 'None';

	const role = guild.roles.find(r => r.id === value);
	if (role) currentValue = role.name;

	return (
		<Fragment>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				{buttonText}: {currentValue}
			</Button>
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					{title || 'Select a Role'}
				</DialogTitle>
				<DialogContent dividers>
					<List component="nav" aria-label="secondary mailbox folders">
						{guild.roles.sort(sort || filterByPosition).map(r => (
							<ListItem
								key={r.id}
								button
								onClick={() => {
									onChange(r);
									setOpen(false);
								}}
							>
								<ListItemText primary={r.name} />
							</ListItem>
						))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
