import { useMobileContext } from '@contexts/MobileContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import SaveIconIcon from '@mui/icons-material/Save';
import React, { FC, memo } from 'react';

import { Box, Button } from '@mui/material';

interface SubmitResetButtonsProps {
	isLoading: boolean;
	isOnMobile: boolean;
	submitChanges(): Promise<void>;
}

const SubmitResetButtons: FC<SubmitResetButtonsProps> = ({ isLoading, isOnMobile, submitChanges }) => {
	const { isMobile } = useMobileContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Box
			component="div"
			sx={{
				position: 'fixed',
				bottom: 30,
				right: 30,
				'& button': {
					marginLeft: 30
				}
			}}
		>
			<Button
				disabled={isLoading}
				onClick={() => setGuildSettingsChanges(undefined)}
				color="secondary"
				variant="contained"
				size={isOnMobile ? 'small' : 'large'}
				sx={{
					mr: 3.75,
					bgcolor: 'error.main',
					'&:hover': {
						bgcolor: 'error.dark'
					}
				}}
			>
				<DeleteIcon
					sx={{
						mr: 2
					}}
				/>
				{isMobile ? 'Reset' : 'Reset changes'}
			</Button>
			<Button disabled={isLoading} onClick={submitChanges} color="primary" variant="contained" size={isOnMobile ? 'small' : 'large'}>
				<SaveIconIcon
					sx={{
						mr: 2
					}}
				/>
				{isMobile ? 'Save' : 'Save changes'}
			</Button>
		</Box>
	);
};

export default memo(SubmitResetButtons);
