import type { FlattenedCommand } from '@config/types/ApiData';
import type { DisableCommands } from '@config/types/ConfigurableData';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import RefreshCommandsButton from '@layout/RefreshCommandsButton';
import Section from '@layout/Settings/Section';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Divider,
	Grid,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { green } from '@mui/material/colors';
import Loading from '@presentational/Loading';
import SelectBoolean from '@selects/SelectBoolean';
import { memo, SetStateAction, useCallback, useEffect, useState, type FC } from 'react';

interface DisabledCommandSettingsProps {
	commands: FlattenedCommand[];
	setCommands: (value: SetStateAction<FlattenedCommand[]>) => void;
}

/**
 * Parses command descriptions, replacing emojis with their proper counterparts
 * @param description Command description to parse
 */
export const parseCommandDescription = (description: string) => description.replace(/<:(\w{2,32}):[0-9]{18}>/gi, '$1');

const DisabledCommandSettings: FC<DisabledCommandSettingsProps> = ({ commands, setCommands }) => {
	const theme = useTheme();
	const matches = useMediaQuery(() => theme.breakpoints.down('md'));

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
				<Box mt={3}>
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
								<Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center" alignContent="center">
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
									sx={{
										backgroundColor: green[600],
										color: 'text.primary',
										'&:hover': {
											backgroundColor: green[800],
											color: 'text.primary'
										}
									}}
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
									sx={{
										bgcolor: 'secondary.main',
										color: 'text.primary',
										'&:hover': {
											bgcolor: 'secondary.dark',
											color: 'text.primary'
										}
									}}
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
									sx={{
										bgcolor: 'error.main',
										'&:hover': {
											bgcolor: 'error.dark'
										}
									}}
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
