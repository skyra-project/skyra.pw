import { useMobileContext } from '@contexts/MobileContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import SaveIconIcon from '@mui/icons-material/Save';
import React, { FC, memo } from 'react';

interface SubmitResetButtonsProps {
	isLoading: boolean;
	isOnMobile: boolean;
	submitChanges(): Promise<void>;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		fabContainer: {
			position: 'fixed',
			bottom: 30,
			right: 30,
			'& button': {
				marginLeft: 30
			}
		},
		saveIcon: {
			marginRight: theme.spacing(2)
		},
		errorButton: {
			backgroundColor: theme.palette.error.main,
			'&:hover': {
				backgroundColor: theme.palette.error.dark
			}
		}
	})
);

const SubmitResetButtons: FC<SubmitResetButtonsProps> = ({ isLoading, isOnMobile, submitChanges }) => {
	const classes = useStyles();
	const { isMobile } = useMobileContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<Box component="div" className={classes.fabContainer}>
			<Button
				disabled={isLoading}
				onClick={() => setGuildSettingsChanges(undefined)}
				color="secondary"
				classes={{ root: classes.errorButton }}
				variant="contained"
				size={isOnMobile ? 'small' : 'large'}
			>
				<DeleteIcon className={classes.saveIcon} />
				{isMobile ? 'Reset' : 'Reset changes'}
			</Button>
			<Button disabled={isLoading} onClick={submitChanges} color="primary" variant="contained" size={isOnMobile ? 'small' : 'large'}>
				<SaveIconIcon className={classes.saveIcon} />
				{isMobile ? 'Save' : 'Save changes'}
			</Button>
		</Box>
	);
};

export default memo(SubmitResetButtons);
