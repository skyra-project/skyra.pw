import styled from 'styled-components';

import SkyraLogo from 'assets/skyraLogo';

export default styled(SkyraLogo)`
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	animation-name: spin;
	animation-duration: 2s;
	animation-iteration-count: infinite;
	animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
`;
