import type { FlattenedCommand } from '@config/types/ApiData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Command from '@presentational/CommandsPage/Command';
import React, { FC, memo, useCallback } from 'react';

const useStyles = makeStyles((theme) =>
	createStyles({
		categoryAccordion: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
			borderRadius: theme.spacing(0.5)
		},
		categoryHeading: {
			fontSize: theme.typography.pxToRem(20),
			fontWeight: 'bolder'
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

	const filterCommands = useCallback((command: FlattenedCommand) => command.name.toLowerCase().includes(searchValue.toLowerCase()), [searchValue]);

	const filteredCategory = commands.filter((command) => command.category === categoryName).filter(filterCommands);

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
