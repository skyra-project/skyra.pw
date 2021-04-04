import type { FlattenedCommand } from '@config/types/ApiData';
import type { DisableCommands } from '@config/types/ConfigurableData';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import RefreshCommandsButton from '@layout/RefreshCommandsButton';
import Section from '@layout/Settings/Section';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loading from '@presentational/Loading';
import SelectBoolean from '@selects/SelectBoolean';
import React, { FC, memo, SetStateAction, useCallback, useEffect, useState } from 'react';

interface DisabledCommandSettingsProps {
	commands: FlattenedCommand[];
	setCommands: (value: SetStateAction<FlattenedCommand[]>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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

const DisabledCommandSettings: FC<DisabledCommandSettingsProps> = ({ commands, setCommands }) => {
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const classes = useStyles();
	const [expanded, setExpanded] = useState<string | false>(false);
	const [loading, setLoading] = useState(true);
	const [localCommands, setLocalCommands] = useState<Record<string, DisableCommands.Command>>({});
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	const parseCommandsToLocalCommands = useCallback(() => {
		setLoading(true);
		const commandsForState: Record<string, DisableCommands.Command> = {};
		for (const command of commands) {
			if (command.guarded) continue;
			commandsForState[command.name] = {
				name: command.name,
				description: command.description,
				isEnabled: !guildSettings.disabledCommands.includes(command.name),
				category: command.category
			};
		}
		setLocalCommands(commandsForState);
		setLoading(false);
	}, [commands, guildSettings.disabledCommands]);
	useEffect(() => {
		parseCommandsToLocalCommands();
	}, [parseCommandsToLocalCommands]);

	const handleToggleAccordion = (panel: string) => (_: React.ChangeEvent<unknown>, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	const categories = [...new Set(Object.values(localCommands).map((command) => command.category))];

	return (
		<>
			<Loading loading={loading} />
			<RefreshCommandsButton setCommands={setCommands} />
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
									{Object.values(localCommands)
										.filter((command) => command.category === catName)
										.map((cmd, idx) => (
											<Grid item key={idx} xs={12} md={6} lg={4} xl={3}>
												<SelectBoolean
													title={cmd.name}
													description={parseCommandDescription(cmd.description)}
													currentValue={cmd.isEnabled}
													onChange={(event) => {
														return setLocalCommands({
															...localCommands,
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
										for (const command of Object.values(localCommands)) {
											if (command.category !== catName) continue;
											changedCommands[command.name] = {
												...command,
												isEnabled: true
											};
										}

										return setLocalCommands({
											...localCommands,
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
										for (const command of Object.values(localCommands)) {
											if (command.category !== catName) continue;
											changedCommands[command.name] = {
												...command,
												isEnabled: false
											};
										}

										return setLocalCommands({
											...localCommands,
											...changedCommands
										});
									}}
								>
									{matches ? 'Disable' : 'Disable all'}
								</Button>
								<Button
									size="small"
									variant="contained"
									classes={{ root: classes.cancelButton }}
									onClick={parseCommandsToLocalCommands}
								>
									Reset
								</Button>
								<Button
									size="small"
									color="primary"
									variant="contained"
									onClick={() => {
										setGuildSettingsChanges({
											disabledCommands: Object.values(localCommands)
												.filter((cmd) => !cmd.isEnabled)
												.map((cmd) => cmd.name)
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

export default memo(DisabledCommandSettings);
