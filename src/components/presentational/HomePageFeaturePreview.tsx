import type features from '@assets/features';
import { Grid, Hidden } from '@mui/material';
import { memo, type FC } from 'react';

type HomePageFeaturePreviewProps = Pick<typeof features extends Array<infer U> ? U : never, 'previewContent'>;

const HomePageFeaturePreview: FC<HomePageFeaturePreviewProps> = ({ previewContent }) => (
	<Hidden smDown>
		<Grid item xs={12} md={5}>
			{previewContent}
		</Grid>
	</Hidden>
);

export default memo(HomePageFeaturePreview);
