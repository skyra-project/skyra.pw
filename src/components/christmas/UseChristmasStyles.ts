import { green } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useChristmasStyles = makeStyles(() =>
	createStyles({
		backgroundColor: {
			backgroundColor: green[800]
		},
		backgroundColorHover: {
			'&:hover': {
				backgroundColor: green[600]
			}
		},
		color: {
			color: green[800]
		}
	})
);

export default useChristmasStyles;
