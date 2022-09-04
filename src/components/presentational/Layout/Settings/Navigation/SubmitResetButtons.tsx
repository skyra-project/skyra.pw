import { useMobileContext } from '@contexts/MobileContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import SaveIconIcon from '@mui/icons-material/Save';
import { Button, Grid } from '@mui/material';
import { memo, type FC } from 'react';

interface SubmitResetButtonsProps {
	isLoading: boolean;
	submitChanges(): Promise<void>;
}

const SubmitResetButtons: FC<SubmitResetButtonsProps> = ({ isLoading, submitChanges }) => {
	const { isMobile } = useMobileContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<>
			<Grid item>
				<Button
					disabled={isLoading}
					onClick={() => setGuildSettingsChanges(undefined)}
					color="secondary"
					variant="contained"
					fullWidth={isMobile}
					sx={{
						bgcolor: 'error.main',
						'&:hover': {
							bgcolor: 'error.dark'
						}
					}}
					startIcon={<DeleteIcon />}
				>
					{isMobile ? 'Reset' : 'Reset changes'}
				</Button>
			</Grid>
			<Grid item>
				<Button
					disabled={isLoading}
					onClick={submitChanges}
					color="primary"
					variant="contained"
					startIcon={<SaveIconIcon />}
					fullWidth={isMobile}
				>
					{isMobile ? 'Save' : 'Save changes'}
				</Button>
			</Grid>
		</>
	);
};

export default memo(SubmitResetButtons);
