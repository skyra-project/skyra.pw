import React, { Fragment } from 'react';
import { DialogActions, DialogContent, ListItemText, ListItemIcon, ListItem, List, Button, Checkbox } from '@material-ui/core';

import DialogTitle from './DialogTitle';
import Dialog from './Dialog';
import { toTitleCase } from 'meta/util';

export default function SelectMany({ title, value, onChange, values, name }) {
	const [open, setOpen] = React.useState(false);
	const [checked, setChecked] = React.useState(value);

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
			<Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
				{title}: {name}
			</Button>
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
				<DialogTitle onClose={handleClose}>{toTitleCase(title)}</DialogTitle>
				<DialogContent dividers>
					<List>
						{values.map(({ value, name }) => (
							<ListItem key={value} button onClick={handleToggle(value)}>
								<ListItemIcon>
									<Checkbox edge="start" checked={checked.includes(value)} tabIndex={-1} disableRipple />
								</ListItemIcon>
								<ListItemText primary={name} />
							</ListItem>
						))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setChecked([]);
						}}
						color="primary"
					>
						Reset
					</Button>
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
