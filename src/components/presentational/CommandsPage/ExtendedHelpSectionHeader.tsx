import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { FC, memo, ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textFlexBox: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			alignContent: 'flex-start',
			justifyContent: 'flex-start'
		},
		divider: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1)
		}
	})
);

interface ExtendedHelpSectionHeaderProps {
	icon: ReactElement;
	header: string;
}

const ExtendedHelpSectionHeader: FC<ExtendedHelpSectionHeaderProps> = ({ icon, header }) => {
	const classes = useStyles();

	return (
		<Typography variant="h5" classes={{ root: classes.textFlexBox }}>
			{icon}
			<Divider classes={{ root: classes.divider }} orientation="vertical" flexItem light />
			{header}
		</Typography>
	);
};

export default memo(ExtendedHelpSectionHeader);
