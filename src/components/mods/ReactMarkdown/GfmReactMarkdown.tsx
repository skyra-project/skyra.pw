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
			a: Link as any,
			img: Image as any,
			strong: Strong as any,
			ol: List as any,
			ul: List as any,
			li: ListItem as any,
			code: InlineCode as any
		}}
	>
		{source}
	</ReactMarkdown>
);

export default GfmReactMarkdown;
