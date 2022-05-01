import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import NextImage from 'next/image';
import React, { DetailedHTMLProps, forwardRef, ImgHTMLAttributes } from 'react';
import type { WithReactMarkdownChildren } from './types';

const useStyles = makeStyles((theme) =>
	createStyles({
		emoji: {
			paddingRight: theme.spacing(0.5),
			paddingLeft: theme.spacing(1)
		}
	})
);

type ImageProps = WithReactMarkdownChildren<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>;

const Image = forwardRef<HTMLSpanElement, ImageProps>(({ src }, ref) => {
	const classes = useStyles();

	if (!src) {
		return null;
	}

	return (
		<span ref={ref}>
			<NextImage className={classes.emoji} src={src} alt="Emoji" height={16} width={16} />
		</span>
	);
});

export default Image;
