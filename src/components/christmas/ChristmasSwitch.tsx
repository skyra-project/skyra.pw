import { Switch, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { memo } from 'react';

const ChristmasSwitch = withStyles({
	switchBase: {
		color: green[600],
		'&$checked': {
			color: green[800]
		},
		'&$checked + $track': {
			backgroundColor: green[800]
		}
	},
	checked: {},
	track: {}
})(Switch);

export default memo(ChristmasSwitch);
