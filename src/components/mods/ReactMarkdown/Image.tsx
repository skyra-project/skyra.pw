import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { cast } from '@utils/util';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import React, { forwardRef, memo } from 'react';
import type { NormalComponent } from 'react-markdown/src/ast-to-react';

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

const Image = forwardRef<HTMLImageElement, Parameters<NormalComponent>[0]>((props, ref) => {
	const classes = useStyles();

	const { src } = cast<ImageProps>(props);
	return (
		<span ref={ref}>
			<NextImage className={classes.emoji} src={src} alt="Emoji" height={16} width={16} />
		</span>
	);
});

export default memo(Image);
