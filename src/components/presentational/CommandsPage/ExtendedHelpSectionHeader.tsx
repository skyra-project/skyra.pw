import Divider from '@mui/material/Divider';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
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
