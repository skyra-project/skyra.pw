import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			light: '#a4b9ff',
			main: '#7189da',
			dark: '#3d5ca8',
			contrastText: '#fff'
		},
		secondary: {
			main: '#1d1f21',
			light: '#444648',
			dark: '#000000',
			contrastText: '#fff'
		},
		background: {
			default: '#7189da'
		}
	}
});

export default theme;
