/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Fernando Pasik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

const hasChildren = (element: ReactNode): element is ReactElement<{ children: ReactNode[] }> =>
	isValidElement<{ children?: ReactNode[] }>(element) && Boolean(element.props.children);

// eslint-disable-next-line @typescript-eslint/ban-types
const childToString = (child?: string | number | boolean | {} | null): string => {
	if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
		return '';
	}

	if (JSON.stringify(child) === '{}') {
		return '';
	}

	return (child as string | number).toString();
};

export const onlyText = (children: ReactNode): string => {
	if (!(children instanceof Array) && !isValidElement(children)) {
		return childToString(children);
	}

	return Children.toArray(children).reduce((text: string, child: ReactNode) => {
		let newText = '';

		if (isValidElement(child) && hasChildren(child)) {
			newText = onlyText(child.props.children);
		} else if (isValidElement(child) && !hasChildren(child)) {
			newText = '' as string;
		} else {
			newText = childToString(child);
		}

		return text.concat(newText);
	}, '');
};
