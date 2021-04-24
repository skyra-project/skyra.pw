import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
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
		plugins={[gfm]}
		rehypePlugins={[rehypeRaw, rehypeSanitize]}
		components={{
			a: Link,
			img: Image,
			strong: Strong,
			ol: List,
			ul: List,
			li: ListItem,
			code: InlineCode
		}}
	>
		{source}
	</ReactMarkdown>
);

export default GfmReactMarkdown;
