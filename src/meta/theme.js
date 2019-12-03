import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#7189da',
			contrastText: '#fff'
		},
		secondary: {
			main: '#1d1f21',
			light: 'rgb(54, 57, 63)',
			dark: '#000000',
			contrastText: '#fff'
		},
		background: {
			default: '#1d1f21'
		}
	}
});

export default theme;
