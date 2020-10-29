import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NextImage from 'next/image';
import React, { forwardRef, memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		emoji: {
			paddingRight: theme.spacing(0.5),
			paddingLeft: theme.spacing(1)
		}
	})
);

interface ImageProps {
	src: string;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(({ src }, ref) => {
	const classes = useStyles();
	return (
		<span ref={ref}>
			<NextImage className={classes.emoji} src={src} alt="Emoji" height={16} width={16} />
		</span>
	);
});

export default memo(Image);
