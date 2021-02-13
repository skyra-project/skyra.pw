/**
 * MIT License
 *
 * Copyright (c) 2018 Gary Meehan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
export interface SeoProps {
	title?: string;
	titleTemplate?: string;
	defaultTitle?: string;
	noindex?: boolean;
	nofollow?: boolean;
	robotsProps?: AdditionalRobotsProps;
	description?: string;
	canonical?: string;
	openGraph?: OpenGraph;
	twitter?: Twitter;
	additionalMetaTags?: ReadonlyArray<MetaTag>;
}

export interface BaseMetaTag {
	content: string;
}
export interface HTML5MetaTag extends BaseMetaTag {
	name: string;
	property?: undefined;
	httpEquiv?: undefined;
}
export interface RDFaMetaTag extends BaseMetaTag {
	property: string;
	name?: undefined;
	httpEquiv?: undefined;
}
export interface HTTPEquivMetaTag extends BaseMetaTag {
	httpEquiv: 'content-security-policy' | 'content-type' | 'default-style' | 'x-ua-compatible' | 'refresh';
	name?: undefined;
	property?: undefined;
}
export declare type MetaTag = HTML5MetaTag | RDFaMetaTag | HTTPEquivMetaTag;

export interface Twitter {
	handle?: string;
	site?: string;
	cardType?: string;
}

export interface OpenGraph {
	url?: string;
	type?: string;
	title?: string;
	description?: string;
	images?: ReadonlyArray<OpenGraphImages>;
	defaultImageHeight?: number;
	defaultImageWidth?: number;
	locale?: string;
	site_name?: string;
	profile?: OpenGraphProfile;
}

export interface OpenGraphImages {
	url: string;
	width?: number;
	height?: number;
	alt?: string;
}

export interface OpenGraphProfile {
	firstName?: string;
	lastName?: string;
	username?: string;
	gender?: string;
}

export interface AdditionalRobotsProps {
	nosnippet?: boolean;
	maxSnippet?: number;
	maxImagePreview?: ImagePrevSize;
	maxVideoPreview?: number;
	noarchive?: boolean;
	unavailableAfter?: string;
	noimageindex?: boolean;
	notranslate?: boolean;
}

export declare type ImagePrevSize = 'none' | 'standard' | 'large';
