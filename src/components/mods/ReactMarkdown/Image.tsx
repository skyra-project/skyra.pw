import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { forwardRef, memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		emoji: {
			height: 16,
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
	return <img className={classes.emoji} src={src} ref={ref} alt="Emoji" loading="lazy" />;
});

export default memo(Image);
