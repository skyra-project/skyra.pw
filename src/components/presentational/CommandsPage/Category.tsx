import type { FlattenedCommand } from '@config/types/ApiData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Command from '@presentational/CommandsPage/Command';
import React, { FC, memo, useCallback } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';

interface CategoryProps {
	categoryName: string;
	searchValue: string;
	commands: FlattenedCommand[];
}

const Category: FC<CategoryProps> = ({ categoryName, commands, searchValue }) => {
	const filterCommands = useCallback((command: FlattenedCommand) => command.name.toLowerCase().includes(searchValue.toLowerCase()), [searchValue]);

	const filteredCategory = commands.filter((command) => command.category === categoryName).filter(filterCommands);

	if (!filteredCategory.length) return null;

	return (
		<Accordion
			defaultExpanded
			TransitionProps={{ unmountOnExit: true }}
			sx={{
				my: 1,
				borderRadius: (theme) => theme.spacing(0.5)
			}}
		>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography
					variant="h2"
					component="h1"
					sx={{
						fontSize: (theme) => theme.typography.pxToRem(20),
						fontWeight: 'bolder'
					}}
				>
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
