import type features from '@assets/features';
import { Hidden, Grid } from '@mui/material';
import React, { FC, memo } from 'react';

type HomePageFeaturePreviewProps = Pick<typeof features extends Array<infer U> ? U : never, 'previewContent'>;

const HomePageFeaturePreview: FC<HomePageFeaturePreviewProps> = ({ previewContent }) => (
	<Hidden smDown>
		<Grid item xs={12} md={5}>
			{previewContent}
		</Grid>
	</Hidden>
);

export default memo(HomePageFeaturePreview);
