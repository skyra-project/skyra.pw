import type { FlattenedCommand } from '@config/types/ApiData';
import Tooltip from '@material/Tooltip';
import CachedIcon from '@mui/icons-material/Cached';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Zoom from '@mui/material/Zoom';
import { ExpirableLocalStorageStructure, LocalStorageKeys } from '@utils/constants';
import { Time } from '@utils/skyraUtils';
import { apiFetch, saveState } from '@utils/util';
import React, { FC, SetStateAction, useCallback, useMemo, useState } from 'react';

interface RefreshCommandsButtonProps {
	setCommands: (value: SetStateAction<FlattenedCommand[]>) => void;
}

const RefreshCommandsButton: FC<RefreshCommandsButtonProps> = ({ setCommands }) => {
	const [disabled, setDisabled] = useState(false);

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100
	});

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
			<div>
				<Tooltip
					title={
						<>
							Click to force refresh commands
							<br />
							<br />
							<strong>Note:</strong> If this button is not clickable (greyed out) then you've ran into a rate limit. You can try
							refreshing again at a later time. We do release on a weekly schedule so you only need to refresh once every 6 or 7 days.
						</>
					}
				>
					<Box
						position="fixed"
						sx={{
							bottom: (theme) => theme.spacing(2),
							zIndex: (theme) => theme.zIndex.drawer + 2,
							right: (theme) => theme.spacing(trigger ? 8 : 2)
						}}
					>
						<Fab onClick={handleClick} color="primary" size="small" aria-label="scroll back to top" disabled={disabled}>
							<CachedIcon />
						</Fab>
					</Box>
				</Tooltip>
			</div>
		),
		[disabled, handleClick, trigger]
	);

	return (
		<>
			<Zoom in={trigger}>{componentCode}</Zoom>
			<Zoom in={!trigger}>{componentCode}</Zoom>
		</>
	);
};

export default RefreshCommandsButton;
