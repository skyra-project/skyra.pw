import { List, Theme, useTheme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import DialogSearchBar from '@mui/DialogSearchBar';
import DialogTitle from '@mui/DialogTitle';
import LazyAvatar from '@mui/LazyAvatar';
import Tooltip from '@mui/Tooltip';
import { toTitleCase } from '@sapphire/utilities';
import { Time } from '@utils/skyraUtils';
import { AnyRef, sleep } from '@utils/util';
import React, { ChangeEvent, FC, forwardRef, Fragment, useCallback, useMemo, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { Virtuoso, type Components } from 'react-virtuoso';
import type { SelectOneProps } from './SelectOne';

export interface SelectManyProps extends SelectOneProps {
	value: string[];
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dialogContent: {
			padding: theme.spacing(2)
		},
		dialogActions: {
			margin: 0,
			padding: theme.spacing(1)
		},
		nameImage: {
			display: 'inline-flex',
			height: theme.spacing(2),
			width: theme.spacing(2)
		},
		virtualizedList: {
			margin: theme.spacing(1)
		}
	})
);

const SelectMany: FC<SelectManyProps> = ({ label, value, onChange, values, name, imageInName, tooltipTitle, ButtonProps: buttonProps }) => {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(value);
	const [search, setSearch] = useState('');
	const classes = useStyles();
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
				<List style={{ ...style, width: '100%' }} ref={listRef as AnyRef} component="nav">
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
			<If condition={Boolean(tooltipTitle)}>
				<Then>
					<Tooltip title={tooltipTitle ?? ''} placement="top">
						<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...buttonProps}>
							{label}: {name}{' '}
							{imageInName && (
								<LazyAvatar
									imgProps={{ height: theme.spacing(2), width: theme.spacing(2) }}
									alt="Emoji"
									src={imageInName}
									className={classes.nameImage}
								/>
							)}
						</Button>
					</Tooltip>
				</Then>
				<Else>
					<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...buttonProps}>
						{label}: {name}{' '}
						{imageInName && (
							<LazyAvatar
								imgProps={{ height: theme.spacing(2), width: theme.spacing(2) }}
								alt="Emoji"
								src={imageInName}
								className={classes.nameImage}
							/>
						)}
					</Button>
				</Else>
			</If>
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
				<DialogTitle onClose={handleClose}>{toTitleCase(label)}</DialogTitle>
				{values.length > 10 && <DialogSearchBar onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />}
				<DialogContent dividers classes={{ root: classes.dialogContent }}>
					<Virtuoso
						totalCount={filteredValues.length}
						overscan={30}
						style={{ height: theme.spacing(50), width: '100%' }}
						className={classes.virtualizedList}
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
				<DialogActions classes={{ root: classes.dialogActions }}>
					<Button onClick={() => setChecked([])} color="primary">
						Clear selected
					</Button>
					<Button
						onClick={() => {
							onChange(checked);
							void handleClose();
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

export default SelectMany;
