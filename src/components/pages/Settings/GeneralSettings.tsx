import { useMobileContext } from '@contexts/MobileContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import SimpleGrid from '@material/SimpleGrid';
import AutoSavingForm from '@mods/Formik/AutoSaveForm';
import FormikTextField from '@mods/Formik/FormikTextField';
import { ListItemText, MenuItem } from '@mui/material';
import Select from '@selects/Select';
import React, { FC, memo } from 'react';
import { object, SchemaOf, string } from 'yup';

interface GeneralSettingsProps {
	languages: string[];
}

interface FormShape {
	prefix: string;
}

const validationSchema: SchemaOf<FormShape> = object({
	prefix: string().required('Setting a prefix is required').min(1, 'Prefix has a minimum length of 1').max(11, 'Prefix has a maximum length of 10')
});

const GeneralSettings: FC<GeneralSettingsProps> = ({ languages }) => {
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();
	const { isMobile } = useMobileContext();

	const mapLanguageKeysToNames = (langKey: string): [string] | [string, string] => {
		const supportedLanguagesMap: Record<string, [string] | [string, string]> = {
			'ckb-IR': ['Kurdiya Navîn (Iranran)', 'Kurdish'],
			'de-DE': ['Deutsch', 'German'],
			'en-GB': ['British English', 'English, United Kingdom'],
			'en-US': ['American English', 'English, United States'],
			'es-ES': ['Español', 'Spanish'],
			'fr-FR': ['Français', 'French'],
			'hi-IN': ['हिंदी', 'Hindi'],
			'hi-Latn-IN': ['Hinglish', 'Hindi (Latin Alphabet)'],
			'nl-NL': ['Nederlands', 'Dutch'],
			'ro-RO': ['Română', 'Romanian'],
			'ru-RU': ['Pусский', 'Russian'],
			'sl-SI': ['Slovenščina', 'Slovenian'],
			'tr-TR': ['Türkçe', 'Turkish']
		};

		return supportedLanguagesMap[langKey] ?? [langKey];
	};

	return (
		<Section title="General Settings">
			<SimpleGrid
				direction="row"
				justifyContent="flex-start"
				gridItemProps={{
					xs: 12,
					sm: 12,
					md: 12,
					lg: 12,
					xl: 12
				}}
			>
				<AutoSavingForm
					validationSchema={validationSchema}
					initialValues={{ prefix: guildSettings.prefix }}
					onSubmit={(values, formikHelpers) => {
						formikHelpers.setSubmitting(true);
						setGuildSettingsChanges({ prefix: values.prefix });

						formikHelpers.setSubmitting(false);
					}}
				>
					<FormikTextField<FormShape>
						name="prefix"
						label="Prefix"
						TextFieldProps={{
							placeholder: "This is your server's prefix, use it to trigger Skyra commands."
						}}
					/>
				</AutoSavingForm>
				<Select
					title="Language"
					FormControlProps={{ sx: { mt: 5 } }}
					helperText="Select the language you want for this guild"
					value={guildSettings.language}
					onChange={(e) => setGuildSettingsChanges({ language: e.target.value })}
					fullWidth
					autoWidth={isMobile}
					MenuProps={{
						...(isMobile && {
							anchorOrigin: {
								vertical: 'top',
								horizontal: 'right'
							}
						})
					}}
				>
					{languages.map((langKey) => {
						const [commonName, englishName] = mapLanguageKeysToNames(langKey);

						return (
							<MenuItem key={langKey} value={langKey} dense>
								<ListItemText primary={commonName} secondary={englishName} />
							</MenuItem>
						);
					})}
				</Select>
			</SimpleGrid>
		</Section>
	);
};

export default memo(GeneralSettings);
