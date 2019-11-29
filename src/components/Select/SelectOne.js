import React, { Fragment } from 'react';
import { DialogActions, DialogContent, ListItemText, ListItem, List, Button } from '@material-ui/core';

import DialogTitle from './DialogTitle';
import Dialog from './Dialog';

export default function SelectMany({ title, value, onChange, values, name = 'None' }) {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Fragment>
			<Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
				{title}: {name}
			</Button>
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
				<DialogTitle onClose={handleClose}>{title}</DialogTitle>
				<DialogContent dividers>
					<List component="nav">
						{values.map(({ name, value }) => (
							<ListItem
								key={value}
								button
								onClick={() => {
									onChange(value);
									handleClose();
								}}
							>
								<ListItemText primary={name} />
							</ListItem>
						))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							onChange(null);
							handleClose();
						}}
						color="primary"
					>
						Reset
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
