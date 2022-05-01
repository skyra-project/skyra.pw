import { blue } from '@mui/material/colors';
import { createTheme, adaptV4Theme } from '@mui/material/styles';

export default createTheme(
	adaptV4Theme({
		palette: {
			mode: 'dark',
			primary: {
				main: blue[600],
				light: blue[400],
				dark: blue[800],
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
	})
);
