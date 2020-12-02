import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: red[600],
			light: red[400],
			dark: red[800],
			contrastText: '#FFFFFF'
		},
		secondary: {
			main: '#2D2D2D',
			light: '#36393F',
			dark: '#212121',
			contrastText: '#FFFFFF'
		},
		background: {
			default: '#16171D'
		},
		common: {
			white: '#EEEEEE',
			black: '#16171D'
		},
		error: {
			main: '#C62828',
			dark: '#8E0000',
			light: '#FF5F52'
		}
	}
});
