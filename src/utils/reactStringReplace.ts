/**
 * The MIT License (MIT)
 *
 * Copyright (c) Ian Sinnott <ian@iansinnott.com> (github.com/iansinnott)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import escapeRegExp from 'lodash/escapeRegExp';
import flatten from 'lodash/flatten';
import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';
import { ReactNode, ReactNodeArray } from 'react';

type replaceCb = (match: string, index: number, offset: number) => ReactNode;

/**
 * Given a string, replace every substring that is matched by the `match` regex
 * with the result of calling `fn` on matched substring. The result will be an
 * array with all odd indexed elements containing the replacements. The primary
 * use case is similar to using String.prototype.replace except for React.
 *
 * React will happily render an array as children of a react element, which
 * makes this approach very useful for tasks like surrounding certain text
 * within a string with react elements.
 *
 * @example
 * ```ts
 * matchReplace(
 *   'Emphasize all phone numbers like 884-555-4443.',
 *   /([\d|-]+)/g,
 *   (number, i) => <strong key={i}>{number}</strong>
 * );
 * // => ['Emphasize all phone numbers like ', <strong>884-555-4443</strong>, '.'
 * ```
 *
 * @param str The string to replace in
 * @param match Must contain a matching group
 * @param fn
 */
function replaceString(str: string | ReactNodeArray, match: RegExp | string, fn: replaceCb): ReactNodeArray | string {
	let curCharStart = 0;
	let curCharLen = 0;

	if (str === '') {
		return str;
	} else if (!str || !isString(str)) {
		throw new TypeError('First argument to reactStringReplace#replaceString must be a string');
	}

	let re = match;

	if (!isRegExp(re)) {
		re = new RegExp(`(${escapeRegExp(re)})`, 'gi');
	}

	const result: any[] = str.split(re);

	// Apply fn to all odd elements
	for (let i = 1, length = result.length; i < length; i += 2) {
		curCharLen = result[i].length;
		curCharStart += result[i - 1].length;
		result[i] = fn(result[i], i, curCharStart);
		curCharStart += curCharLen;
	}

	return result;
}

export function reactStringReplace(source: string | string[], match: RegExp | string, fn: replaceCb): ReactNodeArray {
	if (!Array.isArray(source)) source = [source];

	return flatten(
		source.map(function (x) {
			return isString(x) ? replaceString(x, match, fn) : x;
		})
	);
}
