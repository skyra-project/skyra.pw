import { GeneralSettings } from '@config/types/ConfigurableData';
import { SettingsPageProps } from '@config/types/GuildSettings';
import Section from '@layout/Settings/Section';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AutoSavingForm from '@mods/Formik/AutoSaveForm';
import TextField from '@mods/Formik/TextField';
import SimpleGrid from '@mui/SimpleGrid';
import Select from '@selects/Select';
import { FastField } from 'formik';
import React, { FC, memo } from 'react';
import { object, string } from 'yup';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		languageOffset: {
			marginTop: theme.spacing(5)
		}
	})
);

const General: FC<SettingsPageProps> = props => {
	const classes = useStyles();
	const validationSchema = object<GeneralSettings.Form>({
		prefix: string()
			.required('Setting a prefix is required')
			.min(1, 'Prefix has a minimum length of 1')
			.max(11, 'Prefix has a maximum length of 10')
	});

	return (
		<Section title="General Settings">
			<SimpleGrid
				direction="row"
				justify="flex-start"
				gridItemProps={{
					xs: 12,
					sm: 12,
					md: 12,
					lg: 12,
					xl: 12
				}}
			>
				<AutoSavingForm<GeneralSettings.Form>
					validationSchema={validationSchema}
					initialValues={{ prefix: props.guildSettings.prefix }}
					onSubmit={(values, formikHelpers) => {
						formikHelpers.setSubmitting(true);
						props.patchGuildData({ prefix: values.prefix });

						formikHelpers.setSubmitting(false);
					}}
				>
					<FastField
						component={TextField}
						name="prefix"
						type="text"
						label="Prefix"
						placeholder="This is your server's prefix, use it to trigger Skyra commands."
					/>
				</AutoSavingForm>
				<Select
					title="Language"
					FormControlProps={{ classes: { root: classes.languageOffset } }}
					helperText="Select the language you want for this guild"
					value={props.guildSettings.language}
					onChange={e => props.patchGuildData({ language: e.target.value })}
					fullWidth
				>
					<MenuItem value="en-US">English</MenuItem>
					<MenuItem value="es-ES">Español</MenuItem>
				</Select>
			</SimpleGrid>
		</Section>
	);
};

export default memo(General);
