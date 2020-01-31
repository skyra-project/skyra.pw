import React, { FC } from 'react';
import { Typography, Box } from '@material-ui/core';

import scss from 'stylesheets/modules/Section.module.scss';

export interface SectionProps {
	title: string;
}

export const Section: FC<SectionProps> = ({ title, children }) => (
	<Box className={scss.root}>
		{title && (
			<Typography variant="h5" component="h1">
				{title}
			</Typography>
		)}
		{children}
	</Box>
);

export default Section;
