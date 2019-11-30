import React, { Fragment, useState } from 'react';
import { DialogActions, DialogContent, ListItemText, ListItemIcon, ListItem, List, Button, Checkbox } from '@material-ui/core';

import DialogTitle from './DialogTitle';
import Dialog from './Dialog';
import SearchBar from './SearchBar';
import { toTitleCase } from 'meta/util';

export default function SelectMany({ title, value, onChange, values, name }) {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(value);
	const [search, setSearch] = useState(null);

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
				{values.length > 10 && <SearchBar onChange={e => setSearch(e.target.value)} />}
				<DialogContent dividers>
					<List>
						{values
							.filter(({ name, value }) => {
								if (!search) return true;
								return `${name} ${value}`.toLowerCase().includes(search);
							})
							.map(({ value, name }) => (
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
