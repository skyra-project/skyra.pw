import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#7289DA',
			light: '#A4B9FF',
			dark: '#3D5CA8',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#2C2F33',
			light: '#36393F',
			dark: '#23272A',
			contrastText: '#ffffff'
		},
		background: {
			default: '#202225'
		}
	}
});

export default theme;
