import type { FlattenedCommand } from '@config/types/ApiData';
import BrushIcon from '@mui/icons-material/BrushTwoTone';
import CodeIcon from '@mui/icons-material/CodeTwoTone';
import CreateIcon from '@mui/icons-material/CreateTwoTone';
import ExamplesIcon from '@mui/icons-material/EmojiObjects';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chips from '@presentational/CommandsPage/Chips';
import { reactStringReplace } from '@utils/reactStringReplace';
import ReminderIcon from 'mdi-react/BellAlertIcon';
import HelpRhombusIcon from 'mdi-react/HelpRhombusIcon';
import { memo, type FC } from 'react';
import ExtendedHelpBody from './ExtendedHelpBody';
import ExtendedHelpSectionHeader from './ExtendedHelpSectionHeader';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';

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
	return (
		<Grid
			item
			sx={{
				flex: '1 1 30%',
				minWidth: '100%',
				my: 2,
				transition: 'width 0.2s ease-in-out',
				maxWidth: {
					sm: 'inherit',
					xs: 'none'
				},
				mx: {
					sm: 'inherit',
					xs: 0
				}
			}}
		>
			<Accordion TransitionProps={{ unmountOnExit: true }} elevation={4} sx={{ bgcolor: 'secondary.light' }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Grid container direction="row" alignItems="center" justifyContent="flex-start" alignContent="flex-start">
						<Grid item xs={12} md={3}>
							<Typography
								sx={{
									fontSize: (theme) => theme.typography.pxToRem(20),
									fontWeight: 'bolder'
								}}
							>
								{reactStringReplace(`s!${command.name}`, /(.{10})/g, (match, index) => (
									<span key={index}>
										<wbr />
										{match}
									</span>
								))}
							</Typography>
						</Grid>
						<Grid item xs={12} md={9}>
							<Typography
								component="span"
								sx={{
									fontSize: (theme) => theme.typography.pxToRem(15),
									color: 'text.secondary'
								}}
							>
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
								<Grid
									item
									sx={{
										...(Boolean(command.extendedHelp.usages) && { mt: 4 })
									}}
								>
									<ExtendedHelpSectionHeader icon={<HelpRhombusIcon />} header="Extended Help" />
								</Grid>
								<Grid item>
									<ExtendedHelpBody body={resolveMultilineString(command.extendedHelp.extendedHelp, true)} />
								</Grid>
							</>
						)}

						{command.extendedHelp.explainedUsage && (
							<>
								<Grid item sx={{ mt: 4 }}>
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
								<Grid item sx={{ mt: 4 }}>
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
								<Grid item sx={{ mt: 4 }}>
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
								<Grid item sx={{ mt: 4 }}>
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
