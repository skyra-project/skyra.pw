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

export * from './B10';
export * from './HEX';
export * from './HSL';
export * from './RGB';

export interface ColorHandler {
	check(): void;
	toString(): string;
	readonly Hex: import('./HEX').HEX;
	readonly Rgb: import('./RGB').RGB;
	readonly Hsl: import('./HSL').HSL;
	readonly B10: import('./B10').B10;
}
