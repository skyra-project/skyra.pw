import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

/**
 *
 * Demos:
 *
 * - [Slider](https://material-ui.com/components/slider/)
 *
 * API:
 *
 * - [Slider API](https://material-ui.com/api/slider/)
 */
export default withStyles(theme => ({
	root: {
		color: theme.palette.secondary.light,
		height: 8
	},
	thumb: {
		backgroundColor: theme.palette.primary.contrastText,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#DCDDDE',
		borderStyle: 'solid',
		boxShadow: theme.shadows[1],
		cursor: 'ew-resize',
		height: theme.spacing(3),
		left: theme.spacing(2),
		marginLeft: theme.spacing(-0.625),
		marginTop: theme.spacing(-1.625),
		top: '50%',
		width: theme.spacing(1.25)
	},
	track: {
		backgroundColor: '#FBB848',
		height: theme.spacing(1),
		borderRadius: theme.spacing(0.75)
	},
	rail: {
		backgroundColor: '#69C49A',
		opacity: 1,
		height: theme.spacing(1),
		borderRadius: theme.spacing(0.75)
	},
	valueLabel: {
		left: 'calc(-50% - 0.5rem)'
	}
}))(Slider);
