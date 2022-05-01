import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import MuiTextField from '@mui/material/TextField';
import clsx from 'clsx';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import React, { FC, memo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		errorLabel: {
			position: 'absolute',
			top: theme.spacing(6.5)
		},
		autoHeight: {
			height: 'auto'
		}
	})
);

const TextField: FC<TextFieldProps> = ({ form, field, meta, ...props }) => {
	const classes = useStyles();

	return (
		<MuiTextField
			autoComplete="on"
			autoCorrect="off"
			autoCapitalize="off"
			spellCheck={false}
			required
			fullWidth
			variant="standard"
			{...fieldToTextField({ form, field, meta })}
			{...props}
			classes={{ root: clsx(props.classes?.root, classes.autoHeight) }}
			FormHelperTextProps={{
				classes: {
					error: clsx(classes.errorLabel, props.FormHelperTextProps?.classes?.error)
				}
			}}
		/>
	);
};

export default memo(TextField);
