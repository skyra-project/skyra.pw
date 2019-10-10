import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, TextField, FormControl, InputLabel, Select, Typography } from '@material-ui/core';

import SelectBoolean from 'components/SelectBoolean';
import SelectRole from 'components/SelectRole';
import SelectRoles from 'components/SelectRoles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		padding: theme.spacing(1),
		marginLeft: 'unset'
	},
	section: {
		marginRight: theme.spacing(4),
		'& > h1': {
			borderBottom: `2px solid ${theme.palette.primary.main}`,
			marginBottom: 25,
			paddingBottom: 10
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			marginRight: 0,
			'&:not(:first-child)': {
				marginTop: theme.spacing(3)
			}
		}
	},
	inputContainer: {
		display: 'flex',
		'& > *': {
			marginRight: theme.spacing(2)
		}
	}
}));

const SettingsPage = props => {
	const classes = useStyles();
	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);
	return (
		<div>
			<Container className={classes.container}>
				{/* General Settings */}
				<div className={classes.section}>
					<Typography variant="h5" component="h1">
						General Settings
					</Typography>
					<div className={classes.inputContainer}>
						<TextField
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck="false"
							label="Prefix"
							value={props.guildSettings.prefix}
							onChange={e => props.patchGuildData({ prefix: e.target.value })}
							variant="outlined"
						/>
						<FormControl variant="filled">
							<InputLabel ref={inputLabel}>Language</InputLabel>
							<Select
								native
								value={props.guildSettings.language}
								onChange={e => props.patchGuildData({ language: e.target.value })}
								labelWidth={labelWidth}
							>
								<option value="en-US">en-US</option>
								<option value="es-ES">es-ES</option>
							</Select>
						</FormControl>
					</div>
				</div>
				{/* EndOf General */}
				{/* Events */}
				<div className={classes.section}>
					<Typography variant="h5" component="h1">
						Events
					</Typography>

					<div className={classes.section}>
						{[
							{ title: 'Ban Added', name: 'banAdd' },
							{ title: 'Ban Revoked', name: 'banRemove' },
							{ title: 'Member Join', name: 'memberAdd' },
							{ title: 'Member Leave', name: 'memberRemove' },
							{ title: 'Message Edit', name: 'messageEdit' },
							{ title: 'Message Delete', name: 'messageDelete' },
						].map(event => {
							const current = props.guildSettings.events[event.name];
							return <SelectBoolean
								key={event.name}
								title={event.title}
								currentValue={current}
								onChange={r =>
									props.patchGuildData({
										events: {
											[event.name]: r
										}
									})
								}
							/>
						})}
					</div>
				</div>
				{/* EndOf Events */}
				{/* Roles */}
				<div className={classes.section}>
					<Typography variant="h5" component="h1">
						Roles
					</Typography>

					<div className={classes.section}>
						{[
							{ name: 'admin', multi: false },
							{ name: 'moderator', multi: false },
							{ name: 'staff', multi: false },
							{ name: 'public', multi: true },
							{ name: 'initial', multi: false },
							{ name: 'subscriber', multi: false },
							{ name: 'muted', multi: false }
						].map(role => {
							if (role.multi) {
								return <SelectRoles
									key={role.name}
									currentValue={props.guildSettings.roles[role.name]}
									buttonText={`${role.name} Roles: ${props.guildSettings.roles[role.name].length}`}
									onChange={r =>
										props.patchGuildData({
											roles: {
												[role.name]: r
											}
										})
									}
									guild={props.guildData}
									title={role.name}
								/>
							}

							const current = props.guildData.roles.find(r => r.id === props.guildSettings.roles[role.name]);
							const displayValue = current ? current.name : 'None';

							return <SelectRole
								key={role.name}
								buttonText={`${role.name}: ${displayValue}`}
								onChange={r =>
									props.patchGuildData({
										roles: {
											[role.name]: r.id
										}
									})
								}
								guild={props.guildData}
								title={role.name}
							/>
						})}
					</div>
				</div>
				{/* EndOf Roles */}
			</Container>
		</div>
	);
};

export default SettingsPage;
