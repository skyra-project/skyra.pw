import Image from '@mods/ReactMarkdown/Image';
import InlineCode from '@mods/ReactMarkdown/InlineCode';
import Link from '@mods/ReactMarkdown/Link';
import ListItem from '@mods/ReactMarkdown/ListItem';
import OrderedList from '@mods/ReactMarkdown/OrderedList';
import Strong from '@mods/ReactMarkdown/Strong';
import UnorderedList from '@mods/ReactMarkdown/UnorderedList';
import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

interface GfmReactMarkdownProps {
	source: string;
}

const GfmReactMarkdown: FC<GfmReactMarkdownProps> = ({ source }) => (
	<ReactMarkdown
		remarkPlugins={[remarkGfm]}
		rehypePlugins={[rehypeRaw, rehypeSanitize]}
		components={{
			a: Link,
			img: Image,
			strong: Strong,
			ol: OrderedList,
			ul: UnorderedList,
			li: ListItem,
			code: InlineCode
		}}
	>
		{source}
	</ReactMarkdown>
);

export default GfmReactMarkdown;
