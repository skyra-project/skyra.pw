import { styled } from '@mui/material/styles';
import React, { FC, memo } from 'react';

import { keyframes } from '@mui/material';

const spin = keyframes`
0% {
	transform: rotate(0deg);
}
100% {
	transform: rotate(-360deg);
}
`;

const StyledSvg = styled('svg')({
	'&:hover': {
		animation: `${spin} 2s infinite cubic-bezier(0.65, 0.05, 0.36, 1)`
	}
});

const SkyraLogo: FC = (props) => (
	<StyledSvg viewBox="0 0 259.05 518.05" {...props} height="32">
		<g>
			<g>
				<path
					d="M204.85 258.65h4.55l-26.4-26.4h-26.15l102.2 102.2v-21.6l-54.2-54.2m-128.8 27.1h26.15L0 183.55v21.6l54.2 54.2h-4.55l26.4 26.4m183 70.85l-16-16V399l-2.65 2.8 2.65 2.65 16-15.95v-31.9m-70.4-6.55l-59.1 168 113.55-177.4L70.35 168 129.5 0 16 177.4l75.4 75.4 97.25 97.25M18.6 116.2l-2.6-2.65L0 129.5v31.95l16 16V119z"
					fill="#fff"
				/>
				<path
					d="M240.45 401.85l2.65-2.8V379.1L129.55 518.05l110.9-116.2m2.65-29.25v-32L129.55 518.05 243.1 372.6M16 145.45v32L129.5 0 16 145.45m2.6-29.25L16 119v20L129.5 0z"
					fill="#4e5d94"
				/>
			</g>
		</g>
	</StyledSvg>
);

export default memo(SkyraLogo);
