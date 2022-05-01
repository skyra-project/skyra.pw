import type { FlattenedCommand } from '@config/types/ApiData';
import BrushIcon from '@mui/icons-material/BrushTwoTone';
import CodeIcon from '@mui/icons-material/CodeTwoTone';
import CreateIcon from '@mui/icons-material/CreateTwoTone';
import ExamplesIcon from '@mui/icons-material/EmojiObjects';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Chips from '@presentational/CommandsPage/Chips';
import { reactStringReplace } from '@utils/reactStringReplace';
import clsx from 'clsx';
import ReminderIcon from 'mdi-react/BellAlertIcon';
import HelpRhombusIcon from 'mdi-react/HelpRhombusIcon';
import React, { FC, memo } from 'react';
import ExtendedHelpBody from './ExtendedHelpBody';
import ExtendedHelpSectionHeader from './ExtendedHelpSectionHeader';

const useStyles = makeStyles((theme) =>
	createStyles({
		commandContainer: {
			flex: '1 1 30%',
			minWidth: '100%',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			transition: 'width 0.2s ease-in-out',
			[theme.breakpoints.down('sm')]: {
				maxWidth: 'none',
				marginLeft: 0,
				marginRight: 0
			}
		},
		commandAccordion: {
			backgroundColor: theme.palette.secondary.light
		},
		commandHeading: {
			fontSize: theme.typography.pxToRem(20),
			fontWeight: 'bolder'
		},
		commandSubHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary
		},
		extendedHelpGrid: {
			marginTop: theme.spacing(4)
		}
	})
);

interface CommandProps {
	command: FlattenedCommand;
}

const resolveMultilineString = (str: string | string[], multiline = false): string => {
	return Array.isArray(str)
		? resolveMultilineString(str.join(multiline ? '\n' : ' '), multiline)
		: str
				.split('\n')
				.map((line) => line.trim())
				.join(multiline ? '\n\n' : ' ');
};

const Command: FC<CommandProps> = ({ command }) => {
	const classes = useStyles();

	return (
		<Grid item className={classes.commandContainer}>
			<Accordion TransitionProps={{ unmountOnExit: true }} elevation={4} classes={{ root: classes.commandAccordion }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Grid container direction="row" alignItems="center" justifyContent="flex-start" alignContent="flex-start">
						<Grid item xs={12} md={3}>
							<Typography className={classes.commandHeading}>
								{reactStringReplace(`s!${command.name}`, /(.{10})/g, (match, index) => (
									<span key={index}>
										<wbr />
										{match}
									</span>
								))}
							</Typography>
						</Grid>
						<Grid item xs={12} md={9}>
							<Typography component="span" className={classes.commandSubHeading}>
								<ExtendedHelpBody body={command.description} />
							</Typography>
						</Grid>
					</Grid>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container direction="column">
						{command.extendedHelp.usages && (
							<>
								<Grid item>
									<ExtendedHelpSectionHeader icon={<CreateIcon />} header="Command Usage" />
								</Grid>
								<Grid item>
									{command.extendedHelp.usages.map((usage, key) => (
										<ExtendedHelpBody key={key} body={`\`Skyra, ${command.name} ${usage}\``} />
									))}
								</Grid>
							</>
						)}

						{command.extendedHelp.extendedHelp && (
							<>
								<Grid item classes={{ root: clsx({ [classes.extendedHelpGrid]: Boolean(command.extendedHelp.usages) }) }}>
									<ExtendedHelpSectionHeader icon={<HelpRhombusIcon />} header="Extended Help" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody body={resolveMultilineString(command.extendedHelp.extendedHelp, true)} />
								</Grid>
							</>
						)}

						{command.extendedHelp.explainedUsage && (
							<>
								<Grid item classes={{ root: classes.extendedHelpGrid }}>
									<ExtendedHelpSectionHeader icon={<CodeIcon />} header="Explained Usage" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody
										body={command.extendedHelp.explainedUsage
											.map(([arg, desc]) => `- **${arg}**: ${resolveMultilineString(desc)}`)
											.join('\n')}
									/>
								</Grid>
							</>
						)}

						{command.extendedHelp.possibleFormats && (
							<>
								<Grid item classes={{ root: classes.extendedHelpGrid }}>
									<ExtendedHelpSectionHeader icon={<BrushIcon />} header="Possible Formats" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody
										body={command.extendedHelp.possibleFormats.map(([type, example]) => `- **${type}**: ${example}`).join('\n')}
									/>
								</Grid>
							</>
						)}

						{command.extendedHelp.examples && (
							<>
								<Grid item classes={{ root: classes.extendedHelpGrid }}>
									<ExtendedHelpSectionHeader icon={<ExamplesIcon />} header="Examples" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody
										body={command.extendedHelp.examples
											.map((example) => `- Skyra, ${command.name}${example ? ` *${example}*` : ''}`)
											.join('\n')}
									/>
								</Grid>
							</>
						)}

						{command.extendedHelp.reminder && (
							<>
								<Grid item classes={{ root: classes.extendedHelpGrid }}>
									<ExtendedHelpSectionHeader icon={<ReminderIcon />} header="Reminder" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody body={command.extendedHelp.reminder} />
								</Grid>
							</>
						)}
					</Grid>
				</AccordionDetails>
				<AccordionActions>
					<Chips command={command} />
				</AccordionActions>
			</Accordion>
		</Grid>
	);
};

export default memo(Command);
