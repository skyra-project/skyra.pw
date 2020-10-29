import { General } from '@config/types/ConfigurableData';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
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

const validationSchema = object<General.Form>({
	prefix: string()
		.required('Setting a prefix is required')
		.min(1, 'Prefix has a minimum length of 1')
		.max(11, 'Prefix has a maximum length of 10')
});

const GeneralSettings: FC = () => {
	const classes = useStyles();
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

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
				<AutoSavingForm<General.Form>
					validationSchema={validationSchema}
					initialValues={{ prefix: guildSettings.prefix }}
					onSubmit={(values, formikHelpers) => {
						formikHelpers.setSubmitting(true);
						setGuildSettingsChanges({ prefix: values.prefix });

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
					value={guildSettings.language}
					onChange={e => setGuildSettingsChanges({ language: e.target.value })}
					fullWidth
				>
					<MenuItem value="en-US">English</MenuItem>
					<MenuItem value="es-ES">Español</MenuItem>
				</Select>
			</SimpleGrid>
		</Section>
	);
};

export default memo(GeneralSettings);
