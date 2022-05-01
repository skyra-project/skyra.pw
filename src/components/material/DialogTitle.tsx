import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
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
			<IconButton classes={{ root: classes.dialogClose }} onClick={onClose} size="large">
				<CloseIcon />
			</IconButton>
		</MuiDialogTitle>
	);
};

export default memo(DialogTitle);
