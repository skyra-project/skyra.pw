import GfmReactMarkdown from '@mods/ReactMarkdown/GfmReactMarkdown';
import { EmojiRegexExtractName } from '@utils/constants';
import React, { FC, memo } from 'react';

interface ExtendedHelpBodyProps {
	body: string;
}

const ExtendedHelpBody: FC<ExtendedHelpBodyProps> = ({ body }) => {
	return <GfmReactMarkdown source={body.replace(EmojiRegexExtractName, '$1')} />;
};

export default memo(ExtendedHelpBody);
