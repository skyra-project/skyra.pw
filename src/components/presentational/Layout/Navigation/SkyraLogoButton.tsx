import SkyraLogo from '@assets/skyraLogo';
import Tooltip from '@material/Tooltip';
import { navigate } from '@utils/util';
import { memo, type FC } from 'react';

import { Box, Button, Hidden, Typography } from '@mui/material';

const SkyraLogoButton: FC = () => (
	<Box flexGrow={1}>
		<Tooltip title="Click to go home" placement="bottom">
			<Button onClick={navigate('/')} sx={{ textAlign: 'left', textTransform: 'unset' }}>
				<Box sx={{ minWidth: 120, display: 'flex', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center' }}>
					<SkyraLogo />
					<Box display="flex" flexDirection="column" ml={3}>
						<Typography variant="h5" component="h1" color="textPrimary">
							Skyra
						</Typography>
						<Hidden mdDown>
							<Typography variant="caption" component="h1" color="textPrimary">
								The most advanced moderation bot
							</Typography>
						</Hidden>
					</Box>
				</Box>
			</Button>
		</Tooltip>
	</Box>
);

export default memo(SkyraLogoButton);
