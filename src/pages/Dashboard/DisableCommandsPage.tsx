import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Section from 'components/Section';
import SelectBoolean from 'components/Select/SelectBoolean';
import { FlattenedCommand } from 'meta/typings/ApiData';
import { SettingsPageProps } from 'meta/typings/GuildSettings';
import { apiFetch } from 'meta/util';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: theme.palette.primary.contrastText
		},
		expansionPanels: {
			marginTop: theme.spacing(3)
		},
		cancelButton: {
			backgroundColor: theme.palette.error.main,

			'&:hover': {
				backgroundColor: theme.palette.error.dark
			}
		},
		disableAllButton: {
			backgroundColor: theme.palette.secondary.main,
			color: theme.palette.text.primary,

			'&:hover': {
				backgroundColor: theme.palette.secondary.dark,
				color: theme.palette.text.primary
			}
		},
		enableAllButton: {
			backgroundColor: green[600],
			color: theme.palette.text.primary,

			'&:hover': {
				backgroundColor: green[800],
				color: theme.palette.text.primary
			}
		}
	})
);

export default ({ guildSettings: { disabledCommands }, patchGuildData }: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState<string | false>(false);
	const [loading, setLoading] = useState(true);
	const [commands, setCommands] = useState<Record<string, Command>>({});

	const fetchCommands = useCallback(async () => {
		const commands: FlattenedCommand[] = await apiFetch('/commands');
		const commandsForState: Record<string, Command> = {};
		for (const command of commands) {
			if (command.guarded) continue;
			commandsForState[command.name] = {
				name: command.name,
				description: command.description,
				isEnabled: !disabledCommands.includes(command.name),
				category: command.category
			};
		}
		setCommands(commandsForState);
		setLoading(false);
	}, [disabledCommands]);

	useEffect(() => {
		fetchCommands();
	}, [fetchCommands]);

	const handleToggleExpansionPanel = (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	const categories = [...new Set(Object.values(commands).map(command => command.category))];

	return (
		<>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="primary" />
			</Backdrop>
			<Section title="Commands">
				<Typography variant="subtitle2" color="textPrimary">
					On this page you can disable commands on your server
				</Typography>
				<Box className={classes.expansionPanels}>
					{categories.map((catName, catIndex) => (
						<ExpansionPanel
							key={catIndex}
							expanded={expanded === catName}
							onChange={handleToggleExpansionPanel(catName)}
							TransitionProps={{ unmountOnExit: true }}
						>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={`${catName}-content`}
								id={`${catName}-header`}
							>
								<Typography variant="body1">{catName}</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container spacing={1} direction="row" justify="flex-start" alignItems="center" alignContent="center">
									{Object.values(commands)
										.filter(command => command.category === catName)
										.map((cmd, idx) => (
											<Grid item key={idx} xs={4}>
												<SelectBoolean
													title={cmd.name}
													description={cmd.description}
													currentValue={cmd.isEnabled}
													onChange={isEnabled => {
														return setCommands({ ...commands, [cmd.name]: { ...cmd, isEnabled } });
													}}
												/>
											</Grid>
										))}
								</Grid>
							</ExpansionPanelDetails>
							<Divider />
							<ExpansionPanelActions>
								<Button
									size="small"
									variant="contained"
									classes={{ root: classes.enableAllButton }}
									onClick={() => {
										const changedCommands: Record<string, Command> = {};
										for (const command of Object.values(commands)) {
											if (command.category !== catName) continue;
											changedCommands[command.name] = {
												...command,
												isEnabled: true
											};
										}

										return setCommands({
											...commands,
											...changedCommands
										});
									}}
								>
									Enable all
								</Button>
								<Button
									size="small"
									variant="contained"
									classes={{ root: classes.disableAllButton }}
									onClick={() => {
										const changedCommands: Record<string, Command> = {};
										for (const command of Object.values(commands)) {
											if (command.category !== catName) continue;
											changedCommands[command.name] = {
												...command,
												isEnabled: false
											};
										}

										return setCommands({
											...commands,
											...changedCommands
										});
									}}
								>
									Disable all
								</Button>
								<Button size="small" variant="contained" classes={{ root: classes.cancelButton }} onClick={fetchCommands}>
									Reset
								</Button>
								<Button
									size="small"
									color="primary"
									variant="contained"
									onClick={() => {
										patchGuildData({
											disabledCommands: Object.values(commands)
												.filter(cmd => !cmd.isEnabled)
												.map(cmd => cmd.name)
										});
									}}
								>
									Save
								</Button>
							</ExpansionPanelActions>
						</ExpansionPanel>
					))}
				</Box>
			</Section>
		</>
	);
};

interface Command {
	name: string;
	description: string;
	isEnabled: boolean;
	category: string;
}
