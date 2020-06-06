import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import React, { PropsWithChildren, ReactNode } from 'react';

interface PageHeaderProps {
	/** The title of the page*/
	title: ReactNode;
	/** Optional subtitle for the page */
	subtitle?: ReactNode;
	/** props passed to the title Typography component */
	TitleTypographyProps?: TypographyProps;
	/** props passed to the subtitle Typography component */
	SubTitleTypographyProps?: TypographyProps;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		divider: {
			backgroundColor: theme.palette.secondary.light,
			marginBottom: theme.spacing(3),
			paddingBottom: theme.spacing(0.25)
		}
	})
);

export default ({ title, subtitle, TitleTypographyProps, SubTitleTypographyProps }: PropsWithChildren<PageHeaderProps>) => {
	const classes = useStyles();

	return (
		<>
			<Typography variant="h5" color="textPrimary" {...TitleTypographyProps}>
				{title}
			</Typography>
			{subtitle && (
				<Typography variant="subtitle1" color="textSecondary" {...SubTitleTypographyProps}>
					{subtitle}
				</Typography>
			)}
			<Divider classes={{ root: classes.divider }} />
		</>
	);
};
