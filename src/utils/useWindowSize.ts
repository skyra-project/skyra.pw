/**
 * Copyright 2020 Rijkswaterstaat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useRef, useState } from 'react';
import isBrowser from './isBrowser';

/**
 * React hook to get the current window size
 * Triggers on window resize.
 *
 * Use with {@link https://github.com/xnimorz/use-debounce | use-debounce} to ensure it is not triggered instantly!!
 *
 * @example
 * ```typescript
 * import { useDebounce } from 'use-debounce';
 *
 * const [ width, height ] = useDebounce(useWindowSize(), 1000);
 *
 * useEffect(() => {
 *   // Do something here
 * }, [ width, height ]);
 * ```
 */
export function useWindowSize() {
	const handleResize = useRef<anyCb>();

	const getSize = (): [number, number] => {
		if (isBrowser) {
			return [window.innerWidth, window.innerHeight];
		}
		return [0, 0];
	};

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (isBrowser) {
			handleResize.current = () => {
				setWindowSize(getSize());
			};

			window.addEventListener('resize', handleResize.current);
		}
		return () => {
			if (isBrowser && handleResize.current) {
				return window.removeEventListener('resize', handleResize.current);
			}
		};
	}, []);

	return windowSize;
}

type anyCb = () => void;
