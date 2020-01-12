import styled from 'styled-components';
import { Dialog as MuiDialog } from '@material-ui/core';
import theme from 'meta/theme';

const Dialog = styled(MuiDialog)`
	.close {
		position: absolute;
		right: ${theme.spacing(1)}px;
		top: ${theme.spacing(1)}px;
		color: ${theme.palette.grey[500]};
	}

	.MuiDialogContent-root {
		padding: ${theme.spacing(2)}px;
	}

	.MuiDialogActions-root {
		margin: 0px;
		padding: ${theme.spacing(1)}px;
	}
`;

export default Dialog;
