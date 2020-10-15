import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { forwardRef } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		emoji: {
			height: 16,
			paddingRight: theme.spacing(1)
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

export default Image;
