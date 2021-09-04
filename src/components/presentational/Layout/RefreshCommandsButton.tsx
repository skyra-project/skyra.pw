import type { FlattenedCommand } from '@config/types/ApiData';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import CachedIcon from '@material-ui/icons/Cached';
import Tooltip from '@mui/Tooltip';
import { ExpirableLocalStorageStructure, LocalStorageKeys } from '@utils/constants';
import { Time } from '@utils/skyraUtils';
import { apiFetch, saveState } from '@utils/util';
import React, { FC, memo, PropsWithChildren, SetStateAction, useCallback, useMemo, useState } from 'react';

interface RefreshCommandsButtonProps {
	setCommands: (value: SetStateAction<FlattenedCommand[]>) => void;
}

const useStyles = makeStyles<Theme, { scrollTrigger: boolean }>((theme) =>
	createStyles({
		refreshCommandsButton: {
			position: 'fixed',
			bottom: theme.spacing(2),
			right: ({ scrollTrigger }) => (scrollTrigger ? theme.spacing(8) : theme.spacing(2)),
			zIndex: theme.zIndex.drawer + 2
		}
	})
);

const RefreshCommandsButton: FC<RefreshCommandsButtonProps> = ({ setCommands }) => {
	const [disabled, setDisabled] = useState(false);

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100
	});

	const classes = useStyles({ scrollTrigger: trigger });

	const handleClick = useCallback(async () => {
		try {
			setDisabled(true);

			const commandsData = await apiFetch<FlattenedCommand[]>('/commands');
			setCommands(commandsData);
			saveState<ExpirableLocalStorageStructure<FlattenedCommand[]>>(LocalStorageKeys.Commands, {
				expire: Date.now() + Time.Day * 6,
				data: commandsData
			});

			setDisabled(false);
		} catch (err) {
			if ((err as any).status >= 400) {
				setDisabled(true);
			}
		}
	}, [setCommands]);

	const componentCode = useMemo(
		() => (
			<Tooltip
				title={
					<>
						Click to force refresh commands
						<br />
						<br />
						<strong>Note:</strong> If this button is not clickable (greyed out) then you've ran into a rate limit. You can try refreshing
						again at a later time. We do release on a weekly schedule so you only need to refresh once every 6 or 7 days.
					</>
				}
			>
				<Box className={classes.refreshCommandsButton}>
					<Fab onClick={handleClick} color="primary" size="small" aria-label="scroll back to top" disabled={disabled}>
						<CachedIcon />
					</Fab>
				</Box>
			</Tooltip>
		),
		[classes.refreshCommandsButton, disabled, handleClick]
	);

	return (
		<>
			<Zoom in={trigger}>{componentCode}</Zoom>
			<Zoom in={!trigger}>{componentCode}</Zoom>
		</>
	);
};

export default memo<PropsWithChildren<RefreshCommandsButtonProps>>(RefreshCommandsButton);
