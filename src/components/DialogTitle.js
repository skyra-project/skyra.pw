import React from 'react';
import { DialogTitle as MuiDialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const DialogTitle = ({ children, onClose }) => (
	<MuiDialogTitle disableTypography>
		<Typography variant="h6">{children}</Typography>
		{onClose ? (
			<IconButton className="close" onClick={onClose}>
				<CloseIcon />
			</IconButton>
		) : null}
	</MuiDialogTitle>
);

export default DialogTitle;
