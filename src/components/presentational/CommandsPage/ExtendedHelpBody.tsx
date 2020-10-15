import Image from '@mods/ReactMarkdown/Image';
import InlineCode from '@mods/ReactMarkdown/InlineCode';
import Link from '@mods/ReactMarkdown/Link';
import List from '@mods/ReactMarkdown/List';
import ListItem from '@mods/ReactMarkdown/ListItem';
import Strong from '@mods/ReactMarkdown/Strong';
import { EmojiRegexExtractName } from '@utils/constants';
import React, { FC, memo } from 'react';
import ReactMarkdown from 'react-markdown/with-html';

interface ExtendedHelpBodyProps {
	body: string;
}

/** @see {@link https://www.fileformat.info/info/unicode/char/200b/index.htm Unicode Character 'ZERO WIDTH SPACE' (U+200B)} */
const ZeroWidthSpace = String.fromCharCode(8203);
/** RegEx that matches <required> arguments */
const RequiredArgRegex = /<([a-zA-Z])/g;

const ExtendedHelpBody: FC<ExtendedHelpBodyProps> = ({ body }) => {
	return (
		<ReactMarkdown
			source={body.replace(EmojiRegexExtractName, '$1').replace(RequiredArgRegex, `<${ZeroWidthSpace}$1`)}
			parserOptions={{ gfm: true }}
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
};

export default memo(ExtendedHelpBody);
