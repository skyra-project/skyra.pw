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
import React, { ReactNodeArray } from 'react';
import type { SeoProps } from './Seo';

const defaults: Partial<SeoProps> & { templateTitle: string } = {
	templateTitle: '',
	noindex: false,
	nofollow: false
};

const BuildSeoTags = (config: SeoProps): ReactNodeArray => {
	const tagsToRender: ReactNodeArray = [];

	if (config.titleTemplate) {
		defaults.templateTitle = config.titleTemplate;
	}

	let updatedTitle = '';
	if (config.title) {
		updatedTitle = config.title;
		if (defaults.templateTitle) {
			updatedTitle = defaults.templateTitle.replace(/%s/g, () => updatedTitle);
		}
	} else if (config.defaultTitle) {
		updatedTitle = config.defaultTitle;
	}

	if (updatedTitle) {
		tagsToRender.push(<title key="title">{updatedTitle}</title>);
	}

	const noindex = config.noindex || defaults.noindex;
	const nofollow = config.nofollow || defaults.nofollow;

	let robotsParams = '';
	if (config.robotsProps) {
		const {
			nosnippet,
			maxSnippet,
			maxImagePreview,
			maxVideoPreview,
			noarchive,
			noimageindex,
			notranslate,
			unavailableAfter
		} = config.robotsProps;

		robotsParams = `${nosnippet ? ',nosnippet' : ''}${maxSnippet ? `,max-snippet:${maxSnippet}` : ''}${
			maxImagePreview ? `,max-image-preview:${maxImagePreview}` : ''
		}${noarchive ? ',noarchive' : ''}${unavailableAfter ? `,unavailable_after:${unavailableAfter}` : ''}${noimageindex ? ',noimageindex' : ''}${
			maxVideoPreview ? `,max-video-preview:${maxVideoPreview}` : ''
		}${notranslate ? ',notranslate' : ''}`;
	}

	if (noindex || nofollow) {
		tagsToRender.push(
			<meta key="robots" name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}${robotsParams}`} />
		);
		tagsToRender.push(
			<meta key="googlebot" name="googlebot" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}${robotsParams}`} />
		);
	} else {
		tagsToRender.push(<meta key="robots" name="robots" content={`index,follow${robotsParams}`} />);
		tagsToRender.push(<meta key="googlebot" name="googlebot" content={`index,follow${robotsParams}`} />);
	}

	if (config.description) {
		tagsToRender.push(<meta key="description" name="description" content={config.description} />);
	}

	if (config.twitter) {
		if (config.twitter.cardType) {
			tagsToRender.push(<meta key="twitter:card" name="twitter:card" content={config.twitter.cardType} />);
		}

		if (config.twitter.site) {
			tagsToRender.push(<meta key="twitter:site" name="twitter:site" content={config.twitter.site} />);
		}

		if (config.twitter.handle) {
			tagsToRender.push(<meta key="twitter:creator" name="twitter:creator" content={config.twitter.handle} />);
		}
	}

	if (config.openGraph) {
		if (config.openGraph.url || config.canonical) {
			tagsToRender.push(<meta key="og:url" property="og:url" content={config.openGraph.url || config.canonical} />);
		}

		if (config.openGraph.type) {
			const type = config.openGraph.type.toLowerCase();

			tagsToRender.push(<meta key="og:type" property="og:type" content={type} />);

			if (type === 'profile' && config.openGraph.profile) {
				if (config.openGraph.profile.firstName) {
					tagsToRender.push(<meta key="profile:first_name" property="profile:first_name" content={config.openGraph.profile.firstName} />);
				}

				if (config.openGraph.profile.lastName) {
					tagsToRender.push(<meta key="profile:last_name" property="profile:last_name" content={config.openGraph.profile.lastName} />);
				}

				if (config.openGraph.profile.username) {
					tagsToRender.push(<meta key="profile:username" property="profile:username" content={config.openGraph.profile.username} />);
				}

				if (config.openGraph.profile.gender) {
					tagsToRender.push(<meta key="profile:gender" property="profile:gender" content={config.openGraph.profile.gender} />);
				}
			}
		}

		if (config.openGraph.title || config.title) {
			tagsToRender.push(<meta key="og:title" property="og:title" content={config.openGraph.title || updatedTitle} />);
		}

		if (config.openGraph.description || config.description) {
			tagsToRender.push(<meta key="og:description" property="og:description" content={config.openGraph.description || config.description} />);
		}

		if (config.openGraph.images && config.openGraph.images.length) {
			config.openGraph.images.forEach((image, index) => {
				tagsToRender.push(<meta key={`og:image:0${index}`} property="og:image" content={image.url} />);

				if (image.alt) {
					tagsToRender.push(<meta key={`og:image:alt0${index}`} property="og:image:alt" content={image.alt} />);
				}

				if (image.width) {
					tagsToRender.push(<meta key={`og:image:width0${index}`} property="og:image:width" content={image.width.toString()} />);
				}

				if (image.height) {
					tagsToRender.push(<meta key={`og:image:height${index}`} property="og:image:height" content={image.height.toString()} />);
				}
			});
		}

		if (config.openGraph.locale) {
			tagsToRender.push(<meta key="og:locale" property="og:locale" content={config.openGraph.locale} />);
		}

		if (config.openGraph.site_name) {
			tagsToRender.push(<meta key="og:site_name" property="og:site_name" content={config.openGraph.site_name} />);
		}
	}

	if (config.canonical) {
		tagsToRender.push(<link rel="canonical" href={config.canonical} key="canonical" />);
	}

	if (config.additionalMetaTags && config.additionalMetaTags.length > 0) {
		config.additionalMetaTags.forEach((tag) => {
			tagsToRender.push(<meta key={tag.name || tag.property || tag.httpEquiv} {...tag} />);
		});
	}

	return tagsToRender;
};

export default BuildSeoTags;
