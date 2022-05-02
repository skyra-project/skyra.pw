import type { TypographyProps } from '@mui/material/Typography';
import React, { FC, memo, ReactNode } from 'react';
import { Divider, Typography } from '@mui/material';

interface PageHeaderProps {
	/** The title of the page*/
	title: ReactNode;
	/** Optional subtitle for the page */
	subtitle?: ReactNode;
	/** props passed to the title Typography component */
	TitleTypographyProps?: TypographyProps;
	/** props passed to the subtitle Typography component */
	SubTitleTypographyProps?: TypographyProps;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, TitleTypographyProps, SubTitleTypographyProps }) => (
	<>
		<Typography variant="h5" color="textPrimary" {...TitleTypographyProps}>
			{title}
		</Typography>
		{subtitle && (
			<Typography variant="subtitle1" color="textSecondary" {...SubTitleTypographyProps}>
				{subtitle}
			</Typography>
		)}
		<Divider
			sx={{
				bgcolor: 'secondary.light',
				mb: 3,
				pb: 0.25
			}}
		/>
	</>
);

export default memo(PageHeader);
