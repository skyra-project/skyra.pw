import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
	'@global': {
		'*::-webkit-scrollbar': {
			width: '0.3em'
		},
		'*::-webkit-scrollbar-track': {
			'backgroundColor': 'rgba(113, 137, 218, 0.0.5)',
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(113, 137, 218, 0.4)',
			borderRadius: 50
		}
	}
});

export default withStyles(styles, { name: 'MuiCssBaseline' })(CssBaseline);
