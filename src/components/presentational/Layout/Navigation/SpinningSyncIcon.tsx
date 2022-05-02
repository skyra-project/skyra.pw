import SyncIcon from '@mui/icons-material/Sync';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const spin = keyframes`
0% {
	transform: rotate(0deg);
}
100% {
	transform: rotate(-360deg);
}
`;

const SpinningSyncIcon = styled(SyncIcon)({
	'&:hover': {
		animation: `${spin} 2s infinite cubic-bezier(0.65, 0.05, 0.36, 1)`
	}
});

export default SpinningSyncIcon;
