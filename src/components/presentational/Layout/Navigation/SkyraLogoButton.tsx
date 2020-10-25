import SkyraLogo from '@assets/skyraLogo';
import { createStyles, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@mui/Tooltip';
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
							<Hidden smDown>
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
