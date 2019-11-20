import { keyframes, css } from 'styled-components';

const SpinAnimation = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

export const SpinUpAnimation = css`
	animation: ${SpinAnimation} 2s infinite cubic-bezier(0.65, 0.05, 0.36, 1);
`;
