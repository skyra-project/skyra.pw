import { toTitleCase } from 'lib/util/klasaUtils';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from 'components/DialogTitle';
import SearchBar from 'components/SearchBar';
import Tooltip from 'components/Tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import React, { ChangeEvent, Fragment, PropsWithChildren, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { SelectOneProps } from './SelectOne';

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
		}
	})
);

export default ({ label, value, onChange, values, name, imageInName, tooltipTitle, buttonProps }: PropsWithChildren<SelectManyProps>) => {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(value);
	const [search, setSearch] = useState('');
	const classes = useStyles();

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
					<Tooltip title={tooltipTitle ?? ''} placement="top">
						<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...buttonProps}>
							{label}: {name} {imageInName && <Avatar alt="Emoji" src={imageInName} className={classes.nameImage} />}
						</Button>
					</Tooltip>
				</Then>
				<Else>
					<Button variant="contained" color="primary" onClick={() => setOpen(true)} {...buttonProps}>
						{label}: {name} {imageInName && <Avatar alt="Emoji" src={imageInName} className={classes.nameImage} />}
					</Button>
				</Else>
			</If>
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
				<DialogTitle onClose={handleClose}>{toTitleCase(label)}</DialogTitle>
				{values.length > 10 && <SearchBar onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />}
				<DialogContent dividers classes={{ root: classes.dialogContent }}>
					<List>
						{values
							.filter(({ name, value }) => {
								if (!search) return true;
								return `${name} ${value}`.toLowerCase().includes(search);
							})
							.map(({ value, name, iconUrl }) => (
								<ListItem key={value} button onClick={handleToggle(value)}>
									<ListItemIcon>
										<Checkbox edge="start" checked={checked.includes(value)} tabIndex={-1} color="primary" />
									</ListItemIcon>
									<ListItemText primary={name} />
									{iconUrl && (
										<ListItemSecondaryAction>
											<Avatar alt={value} src={iconUrl} variant="square" />
										</ListItemSecondaryAction>
									)}
								</ListItem>
							))}
					</List>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActions }}>
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
