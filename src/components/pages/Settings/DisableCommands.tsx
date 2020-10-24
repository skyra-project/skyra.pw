import { FlattenedCommand } from '@config/types/ApiData';
import { DisableCommands } from '@config/types/ConfigurableData';
import { SettingsPageProps } from '@config/types/GuildSettings';
import Section from '@layout/Settings/Section';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SelectBoolean from '@selects/SelectBoolean';
import { apiFetch } from '@utils/util';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: theme.palette.primary.contrastText
		},
		accordions: {
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

/**
 * Parses command descriptions, replacing emojis with their proper counterparts
 * @param description Command description to parse
 */
export const parseCommandDescription = (description: string) => description.replace(/<:(\w{2,32}):[0-9]{18}>/gi, '$1');

const DisableCommands: FC<SettingsPageProps> = ({ guildSettings: { disabledCommands }, patchGuildData }) => {
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const classes = useStyles();
	const [expanded, setExpanded] = useState<string | false>(false);
	const [loading, setLoading] = useState(true);
	const [commands, setCommands] = useState<Record<string, DisableCommands.Command>>({});

	const fetchCommands = useCallback(async () => {
		const commands: FlattenedCommand[] = await apiFetch('/commands');
		const commandsForState: Record<string, DisableCommands.Command> = {};
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchCommands();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleToggleAccordion = (panel: string) => (_: React.ChangeEvent<unknown>, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	const categories = [...new Set(Object.values(commands).map(command => command.category))];

	return (
		<>
			<Backdrop className={classes.backdrop} open={loading} unmountOnExit mountOnEnter>
				<CircularProgress color="primary" />
			</Backdrop>
			<Section title="Commands">
				<Typography variant="subtitle2" color="textPrimary">
					On this page you can disable commands on your server
				</Typography>
				<Box className={classes.accordions}>
					{categories.map((catName, catIndex) => (
						<Accordion
							key={catIndex}
							expanded={expanded === catName}
							onChange={handleToggleAccordion(catName)}
							TransitionProps={{ unmountOnExit: true }}
						>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${catName}-content`} id={`${catName}-header`}>
								<Typography variant="body1">{catName}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid container spacing={1} direction="row" justify="flex-start" alignItems="center" alignContent="center">
									{Object.values(commands)
										.filter(command => command.category === catName)
										.map((cmd, idx) => (
											<Grid item key={idx} xs={12} md={6} lg={4} xl={3}>
												<SelectBoolean
													title={cmd.name}
													description={parseCommandDescription(cmd.description)}
													currentValue={cmd.isEnabled}
													onChange={event => {
														return setCommands({
															...commands,
															[cmd.name]: { ...cmd, isEnabled: event.target.checked }
														});
													}}
												/>
											</Grid>
										))}
								</Grid>
							</AccordionDetails>
							<Divider />
							<AccordionActions>
								<Button
									size="small"
									variant="contained"
									classes={{ root: classes.enableAllButton }}
									onClick={() => {
										const changedCommands: Record<string, DisableCommands.Command> = {};
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
									{matches ? 'Enable' : 'Enable all'}
								</Button>
								<Button
									size="small"
									variant="contained"
									classes={{ root: classes.disableAllButton }}
									onClick={() => {
										const changedCommands: Record<string, DisableCommands.Command> = {};
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
									{matches ? 'Disable' : 'Disable all'}
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
							</AccordionActions>
						</Accordion>
					))}
				</Box>
			</Section>
		</>
	);
};

export default memo(DisableCommands);
