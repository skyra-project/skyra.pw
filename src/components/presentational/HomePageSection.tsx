import type features from '@assets/features';
import { useAuthenticated } from '@contexts/AuthenticationContext';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const HomePageSection = ({ name, text }: typeof features extends Array<infer U> ? U : never) => {
	const authenticated = useAuthenticated();

	return (
		<Box
			p={5}
			display="flex"
			justifyContent="space-around"
			alignItems="center"
			alignContent="center"
			flexWrap="wrap"
			flexDirection="row"
			minHeight="min-content"
			sx={{
				...(authenticated
					? {
							'&:nth-of-type(even)': {
								flexDirection: 'row-reverse'
							}
					  }
					: {
							'&:nth-of-type(odd)': {
								flexDirection: 'row-reverse'
							}
					  })
			}}
		>
			<Box
				component="div"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: {
						lg: '100%',
						xs: '47%'
					}
				}}
			>
				<Typography variant="h3" component="h1">
					{name}
				</Typography>
				<Divider
					sx={{
						my: 1.25
					}}
				/>
				<Typography>{text}</Typography>
			</Box>
		</Box>
	);
};

export default HomePageSection;
