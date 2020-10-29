import { FlattenedCommand } from '@config/types/ApiData';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Command from '@presentational/CommandsPage/Command';
import React, { FC, memo, useCallback } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		categoryAccordion: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
			borderRadius: theme.spacing(0.5)
		},
		categoryHeading: {
			fontSize: theme.typography.pxToRem(20),
			fontWeight: theme.typography.fontWeightRegular
		}
	})
);

interface CategoryProps {
	categoryName: string;
	searchValue: string;
	commands: FlattenedCommand[];
}

const Category: FC<CategoryProps> = ({ categoryName, commands, searchValue }) => {
	const classes = useStyles();

	const filterCommands = useCallback((command: FlattenedCommand) => command.name.toLowerCase().includes(searchValue.toLowerCase()), [
		searchValue
	]);

	const filteredCategory = commands.filter(command => command.category === categoryName).filter(filterCommands);

	if (!filteredCategory.length) return null;

	return (
		<Accordion defaultExpanded TransitionProps={{ unmountOnExit: true }} classes={{ root: classes.categoryAccordion }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="h2" component="h1" className={classes.categoryHeading}>
					{categoryName}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box display="flex" flexWrap="wrap" flex="1 1 30%" width="100%">
					{filteredCategory.map((command, idx) => (
						<Command key={idx} command={command} />
					))}
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default memo(Category);
