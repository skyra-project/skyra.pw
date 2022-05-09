import type features from '@assets/features';
import { Box, Divider, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

interface HomePageSectionProps {
	feature: typeof features extends Array<infer U> ? U : never;
	isOdd: boolean;
}

const HomePageFeaturePreview = dynamic(() => import('@presentational/HomePageFeaturePreview'), { ssr: false });

const HomePageSection: FC<HomePageSectionProps> = ({ feature, isOdd }) => {
	const FeatureGridItem = (
		<Grid item xs={12} md={7}>
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
					{feature.name}
				</Typography>
				<Divider
					sx={{
						my: 1.25
					}}
				/>
				<Typography>{feature.text}</Typography>
			</Box>
		</Grid>
	);

	return (
		<Grid container spacing={6} alignContent="space-between" justifyContent="space-between" alignItems="center">
			{isOdd ? (
				<>
					{FeatureGridItem}
					<HomePageFeaturePreview previewContent={feature.previewContent} />
				</>
			) : (
				<>
					<HomePageFeaturePreview previewContent={feature.previewContent} />
					{FeatureGridItem}
				</>
			)}
		</Grid>
	);
};

export default HomePageSection;
