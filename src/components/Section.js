import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import theme from 'meta/theme';

const SectionContainer = styled.div`
	margin-right: ${theme.spacing(4)}px;
	margin-bottom: ${theme.spacing(2)}px;

	& > h1 {
		border-bottom: 2px solid ${theme.palette.primary.main};
		margin-bottom: 25px;
		padding-bottom: 10px;
	}

	${theme.breakpoints.down('sm')} {
		flex-basis: 100%;
		width: 100%;
		margin-right: 0;
		&:not(:first-child) {
			margin-top: ${theme.spacing(3)}px;
		}
	}
`;

export default ({ title, children }) => (
	<SectionContainer>
		{title && (
			<Typography variant="h5" component="h1">
				{title}
			</Typography>
		)}
		{children}
	</SectionContainer>
);
