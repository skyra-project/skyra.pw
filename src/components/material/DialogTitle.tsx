import CloseIcon from '@mui/icons-material/Close';
import { memo, type PropsWithChildren } from 'react';

import { DialogTitle as MuiDialogTitle, IconButton, Typography } from '@mui/material';

interface DialogTitleProps {
	onClose: () => void;
}

const DialogTitle = ({ children, onClose }: PropsWithChildren<DialogTitleProps>) => (
	<MuiDialogTitle>
		<Typography variant="h6">{children}</Typography>
		<IconButton
			sx={{
				position: 'absolute',
				right: (theme) => theme.spacing(1),
				top: (theme) => theme.spacing(1),
				color: (theme) => theme.palette.grey[500]
			}}
			onClick={onClose}
			size="large"
		>
			<CloseIcon />
		</IconButton>
	</MuiDialogTitle>
);

export default memo(DialogTitle);
