import { DialogActions, DialogContent, List, ListItem, ListItemText } from '@material-ui/core';
import Button, { ButtonProps as MButtonProps } from '@material-ui/core/Button';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/DialogTitle';
import SearchBar from 'components/SearchBar';
import Tooltip from 'components/Tooltip';
import { toTitleCase } from 'meta/util';
import React, { ChangeEvent, Fragment, ReactNode, useState } from 'react';
import { Else, If, Then } from 'react-if';

export interface SelectOneProps {
	label: ReactNode;
	name: ReactNode;
	values: {
		name: string;
		value: string;
	}[];
	tooltipTitle?: string;
	buttonProps?: MButtonProps;

	onChange(...args: any[]): void;
}

export default function SelectOne({ label, onChange, values, name = 'None', tooltipTitle, buttonProps }: SelectOneProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');

	const handleClose = () => setOpen(!open);

	return (
		<Fragment>
			<If condition={Boolean(tooltipTitle)}>
				<Then>
					<Tooltip
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						title={tooltipTitle!}
						placement="top"
					>
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
					<List component="nav">
						{values
							.filter(({ name, value }) => {
								if (!search) return true;
								return `${name} ${value}`.toLowerCase().includes(search);
							})
							.map(({ name, value }) => (
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
