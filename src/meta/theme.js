import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			light: '#5df2d6',
			main: '#00bfa5',
			dark: '#008e76',
			contrastText: '#fff'
		},
		secondary: {
			main: '#1d1f21',
			light: '#444648',
			dark: '#000000',
			contrastText: '#fff'
		},
		background: {
			default: '#00796b'
		}
	}
});

export default theme;
