<script setup lang="ts">
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';
import { useGuildSettings } from '~/composables/settings/useGuildSettings';

const props = defineProps<{
	languages: string[];
}>();

const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const validationSchema = {
	prefix: [['required'], ['min', 1], ['max', 11]]
};

const initialValues = {
	prefix: guildSettings.value.prefix
};

const onSubmit = (values: any) => {
	setGuildSettingsChanges({ prefix: values.prefix });
};

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
</script>
<template>
	<PresentationalLayoutsSettingsSection title="General Settings">
		<ModsFormikAutoSaveForm :initial-values="initialValues" :validation-schema="validationSchema" :on-submit="onSubmit">
			<ModsFormikFormTextField
				label="Prefix"
				name="prefix"
				placeholder="This is your server's prefix, use it to trigger Skyra commands."
				:validation="[['required'], ['min', 1], ['max', 11]]"
			/>
			Copy
			<div class="form-control">
				<label class="label" for="language">
					<span class="label-text">Language</span>
				</label>
				<select
					id="language"
					v-model="guildSettings.language"
					class="select select-bordered w-full"
					@change="(e: Event) => setGuildSettingsChanges({ language: (e.target as HTMLSelectElement).value })"
				>
					<option v-for="langKey in languages" :key="langKey" :value="langKey">
						{{ mapLanguageKeysToNames(langKey).join(' - ') }}
					</option>
				</select>
				<label class="label">
					<span class="label-text-alt">Select the language you want for this guild</span>
				</label>
			</div>

			<button type="submit" class="btn btn-primary">Save Prefix</button>
		</ModsFormikAutoSaveForm>
	</PresentationalLayoutsSettingsSection>
</template>
