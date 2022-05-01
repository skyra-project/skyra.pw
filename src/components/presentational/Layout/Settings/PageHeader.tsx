import Divider from '@mui/material/Divider';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React, { FC, memo, ReactNode } from 'react';

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

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, TitleTypographyProps, SubTitleTypographyProps }) => {
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

export default memo(PageHeader);
