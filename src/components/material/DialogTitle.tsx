import { createStyles, makeStyles, Theme } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { memo, PropsWithChildren } from 'react';

interface DialogTitleProps {
	onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dialogClose: {
			position: 'absolute',
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500]
		}
	})
);

const DialogTitle = ({ children, onClose }: PropsWithChildren<DialogTitleProps>) => {
	const classes = useStyles();

	return (
		<MuiDialogTitle disableTypography>
			<Typography variant="h6">{children}</Typography>
			<IconButton classes={{ root: classes.dialogClose }} onClick={onClose}>
				<CloseIcon />
			</IconButton>
		</MuiDialogTitle>
	);
};

export default memo(DialogTitle);
