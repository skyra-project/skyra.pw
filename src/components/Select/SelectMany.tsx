import { Checkbox, DialogActions, DialogContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/DialogTitle';
import SearchBar from 'components/SearchBar';
import Tooltip from 'components/Tooltip';
import { toTitleCase } from 'meta/util';
import React, { ChangeEvent, Fragment, PropsWithChildren, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { SelectOneProps } from './SelectOne';

export interface SelectManyProps extends SelectOneProps {
	value: string[];
}

export default ({ label, value, onChange, values, name, tooltipTitle, buttonProps }: PropsWithChildren<SelectManyProps>) => {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(value);
	const [search, setSearch] = useState('');

	const handleClose = () => setOpen(!open);

	const handleToggle = (value: string) => () => {
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
			<If condition={Boolean(tooltipTitle)}>
				<Then>
					<Tooltip title={tooltipTitle} placement="top">
						<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...buttonProps}>
							{label}: {name}
						</Button>
					</Tooltip>
				</Then>
				<Else>
					<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...buttonProps}>
						{label}: {name}
					</Button>
				</Else>
			</If>
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
				<DialogTitle onClose={handleClose}>{toTitleCase(label)}</DialogTitle>
				{values.length > 10 && <SearchBar onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />}
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
										<Checkbox edge="start" checked={checked.includes(value)} tabIndex={-1} color="primary" />
									</ListItemIcon>
									<ListItemText primary={name} />
								</ListItem>
							))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setChecked([])} color="primary">
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
};
