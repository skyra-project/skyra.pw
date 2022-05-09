import DialogSearchBar from '@material/DialogSearchBar';
import DialogTitle from '@material/DialogTitle';
import LazyAvatar from '@material/LazyAvatar';
import Tooltip from '@material/Tooltip';
import {
	List,
	useTheme,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText
} from '@mui/material';
import { toTitleCase } from '@sapphire/utilities';
import { Time } from '@utils/skyraUtils';
import { sleep } from '@utils/util';
import React, { ChangeEvent, FC, forwardRef, Fragment, useCallback, useMemo, useState } from 'react';
import { Virtuoso, type Components } from 'react-virtuoso';
import type { SelectOneProps } from './SelectOne';

export interface SelectManyProps extends SelectOneProps {
	value: string[];
}

const SelectMany: FC<SelectManyProps> = ({ label, value, onChange, values, name, imageInName, tooltipTitle, ButtonProps }) => {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(value);
	const [search, setSearch] = useState('');
	const theme = useTheme();

	const filteredValues = values.filter(({ name, value }) => {
		if (!search) return true;
		return `${name} ${value}`.toLowerCase().includes(search.toLowerCase());
	});

	const handleClose = async () => {
		// Close the dialog
		setOpen(!open);

		// Wait 1 second before clearing search because otherwise the resutls pop up while the dialog is animating away
		await sleep(Time.Second);

		// Clear the search
		setSearch('');
	};

	const handleToggle = useCallback(
		(value: string) => () => {
			const currentIndex = checked.indexOf(value);
			const newChecked = [...checked];

			if (currentIndex === -1) {
				newChecked.push(value);
			} else {
				newChecked.splice(currentIndex, 1);
			}

			setChecked(newChecked);
		},
		[checked]
	);

	const VirtuosoComponents = useMemo<Components>(
		() => ({
			List: forwardRef(({ style, children }, listRef) => (
				<List style={{ ...style, width: '100%' }} ref={listRef} component="nav">
					{children}
				</List>
			)),

			Item: ({ children, ...props }) => (
				<ListItem {...props} button style={{ margin: 0 }} onClick={handleToggle(filteredValues[props['data-index']].value)}>
					{children}
				</ListItem>
			)
		}),
		[filteredValues, handleToggle]
	);

	return (
		<Fragment>
			{Boolean(tooltipTitle) ? (
				<Tooltip title={tooltipTitle ?? ''} placement="top">
					<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...ButtonProps}>
						{label}: {name}{' '}
						{imageInName && (
							<LazyAvatar
								imgProps={{ height: theme.spacing(2), width: theme.spacing(2) }}
								alt="Emoji"
								src={imageInName}
								sx={{
									display: 'inline-flex',
									height: (theme) => theme.spacing(2),
									width: (theme) => theme.spacing(2)
								}}
							/>
						)}
					</Button>
				</Tooltip>
			) : (
				<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...ButtonProps}>
					{label}: {name}{' '}
					{imageInName && (
						<LazyAvatar
							imgProps={{ height: theme.spacing(2), width: theme.spacing(2) }}
							alt="Emoji"
							src={imageInName}
							sx={{
								display: 'inline-flex',
								height: (theme) => theme.spacing(2),
								width: (theme) => theme.spacing(2)
							}}
						/>
					)}
				</Button>
			)}
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
				<DialogTitle onClose={handleClose}>{toTitleCase(label)}</DialogTitle>
				{values.length > 10 && <DialogSearchBar onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />}
				<DialogContent
					dividers
					sx={{
						padding: 2
					}}
				>
					<Virtuoso
						totalCount={filteredValues.length}
						overscan={30}
						style={{
							height: theme.spacing(50),
							margin: theme.spacing(1),
							width: '100%'
						}}
						components={VirtuosoComponents}
						itemContent={(index) => (
							<>
								<ListItemIcon>
									<Checkbox edge="start" checked={checked.includes(filteredValues[index].value)} tabIndex={-1} color="primary" />
								</ListItemIcon>
								<ListItemText primary={filteredValues[index].name} />
								{filteredValues[index].iconUrl && (
									<ListItemSecondaryAction>
										<LazyAvatar alt={filteredValues[index].value} src={filteredValues[index].iconUrl} variant="square" />
									</ListItemSecondaryAction>
								)}
							</>
						)}
					/>
				</DialogContent>
				<DialogActions
					sx={{
						margin: 0,
						padding: 1
					}}
				>
					<Button onClick={() => setChecked([])} color="error">
						Clear selected
					</Button>
					<Button
						onClick={() => {
							onChange(checked);
							void handleClose();
						}}
						color="success"
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default SelectMany;
