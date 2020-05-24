import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		errorLabel: {
			position: 'absolute',
			top: theme.spacing(6.5)
		}
	})
);

export default ({ form, field, meta, ...props }: TextFieldProps) => {
	const classes = useStyles();

	return (
		<TextField
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
