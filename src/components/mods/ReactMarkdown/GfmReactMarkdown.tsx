import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import Image from './Image';
import InlineCode from './InlineCode';
import Link from './Link';
import List from './List';
import ListItem from './ListItem';
import Strong from './Strong';

interface GfmReactMarkdownProps {
	source: string;
}

const GfmReactMarkdown: FC<GfmReactMarkdownProps> = ({ source }) => (
	<ReactMarkdown
		source={source}
		plugins={[gfm]}
		renderers={{
			link: Link,
			linkReference: Link,
			image: Image,
			strong: Strong,
			list: List,
			listItem: ListItem,
			inlineCode: InlineCode
		}}
		escapeHtml={false}
	/>
);

export default GfmReactMarkdown;
