import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#3DD1EB',
			light: '#47D1F5',
			dark: '#33D1E1',
			contrastText: '#FFFFFF'
		},
		secondary: {
			main: '#2C2F33',
			light: '#36393F',
			dark: '#23272A',
			contrastText: '#ffffff'
		},
		background: {
			default: '#16171d'
		},
		common: {
			white: '#EEEEEE',
			black: '#16171d'
		},
		error: {
			main: '#C22E14'
		}
	}
});
