<template>
	<layout-settings-section title="General Settings">
		<UFormAutoSave :model-value="formData" :schema="validationSchema" @submit="onSubmit">
			<UField label="Prefix" name="prefix" help="This is your server's prefix, use it to trigger WolfStar commands.">
				<UInput v-model="formData.prefix" />
			</UField>

			<UField label="Language" name="language" help="Select the language you want for this guild">
				<USelect v-model="formData.language" :options="languageOptions" option-attribute="label" />
			</UField>
		</UFormAutoSave>
	</layout-settings-section>
</template>

<script setup lang="ts">
import { z } from 'zod';

const guildSettingsSchema = z.object({
	prefix: z.string().min(1, 'Prefix must be at least 1 character').max(11, 'Prefix cannot be longer than 11 characters'),
	language: z.string()
});

type FormData = z.infer<typeof guildSettingsSchema>;

const props = defineProps<{
	languages: string[];
}>();

const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const formData = ref<FormData>({
	prefix: guildSettings.value.prefix,
	language: guildSettings.value.language
});

const validationSchema = guildSettingsSchema;

const mapLanguageKeysToNames = (langKey: string): [string] | [string, string] => {
	const supportedLanguagesMap: Record<string, [string] | [string, string]> = {
		'ckb-IR': ['Kurdiya Navîn (Iranran)', 'Kurdish'],
		'de-DE': ['Deutsch', 'German'],
		'en-GB': ['British English', 'English, United Kingdom'],
		'en-US': ['American English', 'English, United States'],
		'es-ES': ['Español', 'Spanish'],
		'fa-IR': ['فارسی', 'Persian'],
		'fr-FR': ['Français', 'French'],
		'hi-IN': ['हिंदी', 'Hindi'],
		'hi-Latn-IN': ['Hinglish', 'Hindi (Latin Alphabet)'],
		'it-IT': ['Italiano', 'Italian'],
		'ja-JP': ['日本語', 'Japanese'],
		'nb-NO': ['Bokmål', 'Norwegian Bokmal'],
		'nl-NL': ['Nederlands', 'Dutch'],
		'pt-BR': ['Português Brasileiro', 'Portuguese, Brazilian'],
		'ro-RO': ['Română', 'Romanian'],
		'ru-RU': ['Pусский', 'Russian'],
		'sl-SI': ['Slovenščina', 'Slovenian'],
		'tr-TR': ['Türkçe', 'Turkish']
	};
	return supportedLanguagesMap[langKey] ?? [langKey];
};

const languageOptions = computed(() =>
	props.languages.map((langKey) => ({
		value: langKey,
		label: mapLanguageKeysToNames(langKey).join(' - ')
	}))
);

const onSubmit = (data: FormData) => {
	setGuildSettingsChanges({
		prefix: data.prefix,
		language: data.language
	});
};
</script>
