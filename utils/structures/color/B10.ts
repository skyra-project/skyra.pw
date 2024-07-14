/**
 * Copyright 2019-2020 Aura Román
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

import type { ColorHandler } from './index';

export class B10 implements ColorHandler {
	public value: number;

	/**
	 * B10 Parser.
	 * @param value Base10 (0 - 0xFFFFFF)
	 */
	public constructor(value: string | number) {
		this.value = Number(value);
		this.check();
	}

	public check() {
		if (this.value < 0 || this.value > 0xffffff) throw 'Color must be within the range 0 - 16777215 (0xFFFFFF).';
	}

	public get Hex() {
		const hex = this.value.toString(16).padStart(6, '0');
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		return new HEX(hex.substring(0, 2), hex.substring(2, 4), hex.substring(4, 6));
	}

	public get Rgb() {
		return this.Hex.Rgb;
	}

	public get Hsl() {
		return this.Hex.Hsl;
	}

	public get B10() {
		return this;
	}

	public toString() {
		return String(this.value);
	}
}

import { HEX } from './HEX';
