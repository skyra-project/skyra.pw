import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import React, { FC } from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		errorLabel: {
			position: 'absolute',
			top: theme.spacing(6.5)
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
			FormHelperTextProps={{
				classes: {
					error: clsx(classes.errorLabel, props.FormHelperTextProps?.classes?.error)
				}
			}}
		/>
	);
};

export default TextField;
