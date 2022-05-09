import DialogSearchBar from '@material/DialogSearchBar';
import DialogTitle from '@material/DialogTitle';
import LazyAvatar from '@material/LazyAvatar';
import Tooltip from '@material/Tooltip';
import { Button, Dialog, DialogActions, DialogContent, List, ListItem, ListItemSecondaryAction, ListItemText, useTheme } from '@mui/material';
import type { ButtonProps as MButtonProps } from '@mui/material/Button';
import { toTitleCase } from '@sapphire/utilities';
import { Time } from '@utils/skyraUtils';
import { sleep } from '@utils/util';
import React, { ChangeEvent, forwardRef, Fragment, ReactNode, useCallback, useMemo, useState } from 'react';
import { Virtuoso, type Components } from 'react-virtuoso';

export interface SelectOneProps {
	/** The label to show on the button */
	label: string;
	/** The name of the current value */
	name: ReactNode;
	/** Array of values */
	values: {
		/** The name of the guild settings */
		name: string;
		/** The value of the guild setting */
		value: string;
		/** Optional iconUrl to be shown next to the key (i.e. for emojis) */
		iconUrl?: string;
	}[];
	/** Content to be shown as a tooltip when hovering over the button */
	tooltipTitle?: string;
	/** Additional properties to apply to the {@link Material-UI Button} */
	ButtonProps?: MButtonProps;
	/** Whether to append an image to the end of the button, next to the value of the key */
	imageInName?: string;
	/** The callback to trigger when changing the key */

	onChange(...args: any[]): void;
	/** The callback to trigger when resetting the key */
	onReset(): void;
}

export default function SelectOne({ label, values, name = 'None', imageInName, tooltipTitle, ButtonProps, onReset, onChange }: SelectOneProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const theme = useTheme();

	const handleClose = useCallback(async () => {
		// Close the dialog
		setOpen(!open);

		// Wait 1 second before clearing search because otherwise the resutls pop up while the dialog is animating away
		await sleep(Time.Second);

		// Clear the search
		setSearch('');
	}, [open]);

	const filteredValues = values.filter(({ name, value }) => {
		if (!search) return true;
		return `${name} ${value}`.toLowerCase().includes(search.toLowerCase());
	});

	const VirtuosoComponents = useMemo<Components>(
		() => ({
			List: forwardRef(({ style, children }, listRef) => (
				<List style={{ ...style, width: '100%' }} ref={listRef} component="nav">
					{children}
				</List>
			)),

			Item: ({ children, ...props }) => (
				<ListItem
					{...props}
					button
					sx={{
						m: 0
					}}
					onClick={() => {
						onChange(filteredValues[props['data-index']].value);
						void handleClose();
					}}
				>
					{children}
				</ListItem>
			)
		}),
		[filteredValues, handleClose, onChange]
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
						p: 2
					}}
				>
					<Virtuoso
						totalCount={filteredValues.length}
						overscan={30}
						style={{
							height: theme.spacing(50),
							margin: 1,
							width: '100%'
						}}
						components={VirtuosoComponents}
						itemContent={(index) => (
							<>
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
						m: 0,
						p: 1
					}}
				>
					<Button
						onClick={() => {
							onReset();
							void handleClose();
						}}
						color="primary"
					>
						Remove setting
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
