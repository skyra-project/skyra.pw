import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, TextField, FormControl, InputLabel, Select, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		padding: theme.spacing(1)
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
						<FormControl variant="outlined">
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
			</Container>
		</div>
	);
};

export default SettingsPage;
