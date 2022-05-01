import SkyraLogo from '@assets/skyraLogo';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import Typography from '@mui/material/Typography';
import Tooltip from '@material/Tooltip';
import { navigate } from '@utils/util';
import React, { FC, memo } from 'react';

const useStyles = makeStyles(() =>
	createStyles({
		svg: {
			minWidth: 120,
			display: 'flex',
			justifyContent: 'space-around',
			alignContent: 'center',
			alignItems: 'center'
		},
		skyraButton: {
			textAlign: 'left',
			textTransform: 'unset'
		}
	})
);

const SkyraLogoButton: FC = () => {
	const classes = useStyles();

	return (
		<Box flexGrow={1}>
			<Tooltip title="Click to go home" placement="bottom">
				<Button onClick={navigate('/')} classes={{ root: classes.skyraButton }}>
					<Box className={classes.svg}>
						<SkyraLogo />
						<Box display="flex" flexDirection="column" ml={3}>
							<Typography variant="h5" component="h1">
								Skyra
							</Typography>
							<Hidden mdDown>
								<Typography variant="caption" component="h1">
									The most advanced moderation bot
								</Typography>
							</Hidden>
						</Box>
					</Box>
				</Button>
			</Tooltip>
		</Box>
	);
};

export default memo(SkyraLogoButton);
