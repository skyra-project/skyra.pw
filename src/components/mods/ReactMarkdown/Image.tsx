import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { cast } from '@utils/util';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import React, { forwardRef, memo } from 'react';
import type { NormalComponents } from 'react-markdown/src/ast-to-react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		emoji: {
			paddingRight: theme.spacing(0.5),
			paddingLeft: theme.spacing(1)
		}
	})
);

interface ImageProps {
	src: Exclude<NextImageProps['src'], string>;
}

const Image = forwardRef<HTMLSpanElement, Parameters<Exclude<NormalComponents['img'], 'img'>>[0]>((props, ref) => {
	const classes = useStyles();

	const { src } = cast<ImageProps>(props);
	return (
		<span ref={ref}>
			<NextImage className={classes.emoji} src={src} alt="Emoji" height={16} width={16} />
		</span>
	);
});

export default memo(Image);
