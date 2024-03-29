import { styled } from '@mui/material';
import NextImage from 'next/image';
import { forwardRef, type DetailedHTMLProps, type ImgHTMLAttributes } from 'react';
import type { WithReactMarkdownChildren } from './types';

const StyledNextImage = styled(NextImage)(() => ({
	pr: 0.5,
	pl: 1
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
