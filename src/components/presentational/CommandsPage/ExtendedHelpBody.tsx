import GfmReactMarkdown from '#mods/ReactMarkdown/GfmReactMarkdown';
import { EmojiRegexExtractName } from '#utils/constants';
import React, { FC, memo } from 'react';

interface ExtendedHelpBodyProps {
	body: string;
}

/** @see {@link https://www.fileformat.info/info/unicode/char/200b/index.htm Unicode Character 'ZERO WIDTH SPACE' (U+200B)} */
const ZeroWidthSpace = String.fromCharCode(8203);
/** RegEx that matches <required> arguments */
const RequiredArgRegex = /<([a-zA-Z])/g;

const ExtendedHelpBody: FC<ExtendedHelpBodyProps> = ({ body }) => {
	return <GfmReactMarkdown source={body.replace(EmojiRegexExtractName, '$1').replace(RequiredArgRegex, `<${ZeroWidthSpace}$1`)} />;
};

export default memo(ExtendedHelpBody);
