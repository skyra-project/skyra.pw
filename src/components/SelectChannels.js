import React, { Fragment } from 'reactn';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
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

export default function CustomizedDialogs({ title, value, guild, onChange, buttonText, sort }) {
	const [open, setOpen] = React.useState(false);
	const [checked, setChecked] = React.useState(value);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<Fragment>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				{buttonText}: {value.length}
			</Button>
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					{title || 'Select channels'}
				</DialogTitle>
				<DialogContent dividers>
					<List component="nav" aria-label="secondary mailbox folders">
						{guild.channels.sort(sort || filterByPosition).map(r => (
							<ListItem key={r.id} button onClick={handleToggle(r.id)}>
								<ListItemIcon>
									<Checkbox
										edge="start"
										checked={checked.includes(r.id)}
										tabIndex={-1}
										disableRipple
										inputProps={{ 'aria-labelledby': r.id }}
									/>
								</ListItemIcon>
								<ListItemText primary={r.name} />
							</ListItem>
						))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							onChange(checked);
							handleClose();
						}}
						color="primary"
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
