import React, { FC, memo, ReactElement } from 'react';

import { Divider, Typography } from '@mui/material';

interface ExtendedHelpSectionHeaderProps {
	icon: ReactElement;
	header: string;
}

const ExtendedHelpSectionHeader: FC<ExtendedHelpSectionHeaderProps> = ({ icon, header }) => {
	return (
		<Typography
			variant="h5"
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				alignContent: 'flex-start',
				justifyContent: 'flex-start'
			}}
		>
			{icon}
			<Divider
				sx={{
					mx: 1
				}}
				orientation="vertical"
				flexItem
				light
			/>
			{header}
		</Typography>
	);
};

export default memo(ExtendedHelpSectionHeader);
