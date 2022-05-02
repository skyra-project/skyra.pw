import NextImage from 'next/image';
import React, { DetailedHTMLProps, forwardRef, ImgHTMLAttributes } from 'react';
import type { WithReactMarkdownChildren } from './types';
import { styled } from '@mui/material';

const StyledNextImage = styled(NextImage)(({ theme }) => ({
	paddingRight: theme.spacing(0.5),
	paddingLeft: theme.spacing(1)
}));

type ImageProps = WithReactMarkdownChildren<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>;

const Image = forwardRef<HTMLSpanElement, ImageProps>(({ src }, ref) => {
	if (!src) {
		return null;
	}

	return (
		<span ref={ref}>
			<StyledNextImage src={src} alt="Emoji" height={16} width={16} />
		</span>
	);
});

export default Image;
